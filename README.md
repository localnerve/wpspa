# [WPSPA](http://github.com/localnerve/wpspa)

[![Build Status](https://secure.travis-ci.org/localnerve/wpspa.png?branch=master)](http://travis-ci.org/localnerve/wpspa)

> An example single page application that takes Wordpress optimization to a whole new level.

The purpose of this project is to demonstrate a faster, mobile friendly Wordpress site. Not only is it a responsive UI, but mobile performance is dramatically increased. Over a 3G network, the first load is much faster than any optimized Wordpress site. This design features data-driven, asynchronous prefetching of non-priority content, so deeper content is likely to have arrived before the user requests it.

> latest [free-tier performance results](http://www.webpagetest.org/result/131212_KF_TGB/) over a 3G network.

By adding an SPA front-end to an existing Wordpress site, you achieve major performance improvement while still enjoying your content in Wordpress. This example application features the WP 2013 theme.

The only changes required on your Wordpress site are that you install the [jsonapi](http://wordpress.org/plugins/json-api/) plugin and the WPSPA plugin. The WPSPA plugin simply extends an existing WP menu to add custom fields for SPA routes. The WPSPA plugin is not public yet.

## Featured Technologies
+ Client-side
  * MarionetteJS
  * Foundation 4
  * RequireJS
  * Compass/Sass

+ Server-side
  * ExpressJS

## Demo
To run the demo, you first must have Node installed (to run the front-end and back-end servers). The demo can be executed by cloning this project, exectuing "grunt demo", and navigating to localhost:9001. The demo task runs the front-end server and mocks the back-end api locally. For now, the demo only runs the development website, so it does not demonstrate the performance aspect.

## Development Notes

[static analysis report](http://htmlpreview.github.io/?https://github.com/localnerve/wpspa-report/blob/master/report/index.html "Plato Report")

> You first have to run npm install on this project first if you want to run the test suite or builds.

Development workflow is controlled by Grunt. See the Gruntfile for full task list. Some of the workflow tasks:
+ grunt test - Runs the test suite in "batch" mode. This is what "npm test" runs.
+ grunt devTest - Runs the test suite in "interactive" mode. This starts the normal test suite servers and allows you to view the results in a web browser. If you use LiveReload, you can connect to the LiveReload server and use this to interactively develop and debug tests.
+ grunt dev - The main development task. Runs the development servers, and allows you to connect LiveReload for interactive development. This also automtically lints the Javascript and compiles the Sass when the files change. Runs the servers in the development environment, which is currently configured to use jsonapi.local endpoint as the back-end. If you want to run with a mock back-end, you can use "grunt demo", but it doesn't include the js and scss watch.
+ grunt debug - Runs the debug build task. This produces a debuggable build in dist/debug.
+ grunt release - Runs the release build task. This produces a release build in dist/release.
+ grunt express:devRelease - Once you run "grunt release", the release website can be viewed running this task. It starts the front-end server on localhost:9003 and uses the remote backend.

### More Notes
#### Multi-Device Wordpress (Performance)
+ Demonstrates WP structures that play well with an SPA architecture
  * WPSPA Wordpress plugin extends menu admin interface for SPA route mapping
+ Targeting one second response for Mobile user (ATF 1st response).

#### Performance prior to Zepto
+ Here is the old 3G [performance](http://www.webpagetest.org/result/131021_6S_45Z/) prior to converting to Zepto (~20% network performance improvement)
+ Note there was a 64K size difference in the app bundle, which equates to a parse time savings of ~64ms at 1k=1ms.

#### Demonstrated Learning
+ Demonstrate optimized build procedure for development and SEO
  * Portable environments make testing, integration, and development easier.

+ Model a scalable, extensible application architecture
  * Separate layout (structure) from content
  * SRP, Modular 
  * Composite Application Archtiecture
+ Separate, portable backend and frontend 
  * Total javascript front end implementation (one language)

#### External Dependencies
##### Responsive CSS
+ Ruby
+ Compass & Sass gems

##### Build and Package Management Dependencies
+ Git
+ Node
+ Npm
+ Grunt-cli
+ Bower

#### Unmanaged Vendor packages
+ Modernizr, still manually building it with their website. Waiting on grunt-modernizr/Moderizr 3

#### Dynamically loaded modules
##### Dynamic and Conditionally loaded modules
+ (none)
