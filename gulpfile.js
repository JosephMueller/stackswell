const fs = require('fs');
const packageConfig = require('./package.json');
const config = packageConfig.gulp;
const gulp = require('gulp');
const shell = require('gulp-shell');
const template = require('gulp-template');

const updateUrl = `https://${config.bitbucketUsername}.bitbucket.io/${config.pluginId}/${config.updateFilename}`;
const distRepo = `${config.bitbucketUsername}.bitbucket.io.git`;

gulp.task('init', function() {
    if (!fs.existsSync(`${config.buildPath}/.git`)) {
        return gulp.src('gulpfile.js', {read: false})
                .pipe(shell([
                    `git clone git@bitbucket.org:${config.bitbucketUsername}/${distRepo} ${config.buildPath}`
                ]));
    }
});

gulp.task('plugin', ['init'], shell.task([
    'NODE_ENV=production npm run build'
]));

gulp.task('appcast', ['plugin'], function() {
   return gulp.src('appcast.xml')
           .pipe(template({
                name: packageConfig.name,
                appcastUrl: packageConfig.skpm.appcast,
                description: packageConfig.description,
                version: packageConfig.version,
                updateUrl: updateUrl
           }))
           .pipe(gulp.dest(`${config.buildPath}/stackswell`));
});

gulp.task('compress', ['appcast'], shell.task([
    `zip -rq ${config.buildPath}/${config.pluginId}/${config.updateFilename} ${packageConfig.skpm.main}`
]));

gulp.task('addToDistRepo', ['compress'], shell.task([
        `git add ${config.pluginId}/${config.appcastFilename} ${config.pluginId}/${config.updateFilename}`,
        `git commit -m "v${packageConfig.version}"`,
        `git push`
    ], {cwd: config.buildPath}));

gulp.task('publish', ['addToDistRepo'], shell.task([
    `git tag -f v${packageConfig.version}`
]));