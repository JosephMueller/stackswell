# Stackswell

Setup

    npm i
    
To add the plugin to Sketch's plugin directory

    npm run postinstall
    
During development to update the plugin if code is changed

    npm run watch
    
## To publish an update

Make sure the version number is updated in `package.json` first.

    gulp publish
    
This will tag the source code repo with the version number and push files in `build` to the distribution repo. Bitbucket uses caching, so it will take 15 minutes for the [distribution repo files](https://stackswell.bitbucket.io/stackswell/appcast.xml) to be updated for the public.