module.exports = function(config, isPluginCommand) {
    if (isPluginCommand && process.env.NODE_ENV === 'production') {
        config.plugins.some(section => {
            if (section.options !== undefined && section.options.uglifyOptions !== undefined) {
                const uglifyOptions = section.options.uglifyOptions;
                uglifyOptions.compress = {
                    drop_console: true
                };
                uglifyOptions.output = {
                    comments: false
                };
                return true;
            }
        });
    }
};