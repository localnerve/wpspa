# [WPSPA](http://github.com/localnerve/wpspa)

[![Greenkeeper badge](https://badges.greenkeeper.io/localnerve/wpspa.svg)](https://greenkeeper.io/)

[![Build Status](https://secure.travis-ci.org/localnerve/wpspa.png?branch=master)](http://travis-ci.org/localnerve/wpspa)

> An example single page application that takes Wordpress optimization to a whole new level.

**NOTICE**  
If you are looking for a reference project like this but supports older browsers more inclusively using standard jQuery, check out [wpspa-transitional](https://github.com/localnerve/wpspa-transitional)

## Introduction
The purpose of this project is to demonstrate a faster, mobile friendly Wordpress site. Not only is it a responsive UI, but performance is dramatically increased. Over any network, page loads are much faster than any fully optimized traditional Wordpress site. This SPA design features a dynamic routes and a data-driven architecture \(using Wordpress\). It also adds delivery prioritization options to Wordpress content for UX optimization \(assigned via the [WPSPA plugin](https://github.com/localnerve/wpspa-plugin)\).

## Results
Don't take my word for it, look at the results on a [Heroku App Instance](http://github.com/localnerve/wpspa/blob/master/docs/app-instance.md) for yourself:

> [performance results](http://www.webpagetest.org/result/140215_BN_5JK/) over a 150ms RTT 3G network.

> [performance results](http://www.webpagetest.org/result/131212_KF_TGB/) over a 300ms RTT 3G network.

> [pagespeed results](http://github.com/localnerve/wpspa/blob/master/docs/images/pagespeed.jpg)

> [yslow results](http://github.com/localnerve/wpspa/blob/master/docs/images/yslow.jpg)

## Performance *IS* User Experience
By adding an SPA front-end to an existing Wordpress site, you achieve major performance improvement while still enjoying your content in Wordpress. If you have a responsive UI that takes 5-10 seconds to do anything, mobile users won't be happy.

> [Visualize a Change from Wordpress to WPSPA](http://goo.gl/mHQmW5)

The only changes required on your Wordpress site are that you install the [jsonapi](http://wordpress.org/plugins/json-api/) plugin and the [WPSPA plugin](https://github.com/localnerve/wpspa-plugin). The [WPSPA plugin](https://github.com/localnerve/wpspa-plugin) simply extends the jsonapi plugin and various post types to further assist SPA request efficiency. The [WPSPA plugin](https://github.com/localnerve/wpspa-plugin) behavior is also extendable.

## Demo
To run the demo, you first must have Compass (to compile the scss) and Node installed (to run the front-end and back-end servers). The demo can be run with these steps:

1. Clone this project
2. Run "npm install" in the project directory
3. Execute "grunt demo" in the project directory (to build a release and start the servers)
4. Navigate to localhost:9000 to examine the results.

The demo task runs the front-end server and mocks the back-end api, so it is all self-contained locally. For now, the only working search is the term "page two", all others will demo the connectivity error page.

## Tech/Developer Stuff
### Featured Technologies
This is a NodeJS/ExpressJS powered application... In the spirit of a MEAN stack, but NERM stack instead ;-{}

+ Client-side
  * MarionetteJS
  * Foundation 4
  * RequireJS
  * Compass/Sass

+ Server-side
  * ExpressJS
  * Redis
  * NodeJS

### Development Notes

[static analysis report](http://htmlpreview.github.io/?https://raw.githubusercontent.com/localnerve/wpspa-report/master/report/index.html "Plato Report")

> You first have to run npm install on this project first if you want to run the test suite or builds.

Development workflow is controlled by Grunt. See the Gruntfile or type `grunt` for workflow task list. Some of the workflow tasks:

* `grunt test` - Runs the test suite in "batch" mode. This is what "npm test" runs.
* `grunt devTest` - Runs the test suite in "interactive" mode. This starts the normal test suite servers and allows you to view the results in a web browser. If you use LiveReload, you can connect to the LiveReload server and use this to interactively develop and debug tests.
* `grunt dev` - The main development task. Runs the development servers, and allows you to connect LiveReload for interactive development. This also automtically lints the Javascript and compiles the Sass when the files change. Runs the servers in the development environment, which is currently configured to use jsonapi.local endpoint as the back-end. The development back-end is configured in server/config/development.js, as the Config.prototype.proxy object.
* `grunt debug` - Runs the debug build task. This produces a debuggable build in dist/debug.
* `grunt release` - Runs the release build task. This produces a release build in dist/release. This is the build that is deployed to production.
* `grunt express:devRelease` - Once you run "grunt release", the release website can be viewed running this task. It starts the front-end server on localhost:9003 and uses the real remote back-end.

#### More Notes
##### Multi-Device Wordpress (Performance)
* Demonstrates WP structures that play well with an SPA architecture
  + [WPSPA Wordpress plugin](http://github.com/localnerve/wpspa-plugin) extends json-api and normal Wordpress features to offer advanced SPA features and content prioritization.
* On mobile networks, most responses are less than 1 second, however first response is ~2 seconds.

##### External Dependencies
###### Responsive CSS
* Ruby
* Compass & Sass gems

###### Development Runtime Dependencies
* Redis-server - Required if you want to use bootstrapped ATF content (immediately available content)

###### Build and Package Management Dependencies
* Git
* Node/Npm
* Grunt-cli
* Bower

##### Unmanaged Vendor packages
* Modernizr, still manually building it with their website. Waiting on grunt-modernizr/Moderizr 3

##### Performance prior to Zepto
* Here is the old 3G [performance](http://www.webpagetest.org/result/131021_6S_45Z/) prior to converting to Zepto (~20% network performance improvement)
* Note there was a 64K size difference in the app bundle, which equates to a parse-time savings of ~64ms at 1k=1ms.

##### Dynamically loaded modules
###### Dynamic and Conditionally loaded modules
* None. Currently configured to use [almond](https://github.com/jrburke/almond) for performance reasons.
* RequireJS could be a good way to deliver dynamic views for presenting custom WP content. WPSPA already handles [dynamic view components](https://github.com/localnerve/wpspa/blob/master/app/components/content/viewFactory.js), but a delivery implementation has not been decided on.

## Inspired By
* [High Performance Browser Networking](http://goo.gl/owGSre)
* The many incredible authors and contributors of the tools used in this project
