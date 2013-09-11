# [WPSPA (Work-In-Progress)](http://github.com/localnerve/wpspa)
[![Build Status](https://secure.travis-ci.org/localnerve/wpspa.png?branch=master)](http://travis-ci.org/localnerve/wpspa)

[static analysis report](http://htmlpreview.github.io/?https://github.com/localnerve/wpspa/blob/master/report/index.html "Plato Report")

> An example single page application that demonstrates using wordpress as an api

The purpose of this project is to demonstrate a faster, mobile friendly Wordpress site. Also, to learn new stuff and keep growing.

## Development Notes

### Multi-Device Wordpress (Performance)
+ Demonstrates WP structures that play well with an SPA architecture
  * WPSPA Wordpress plugin extends menu admin interface for SPA route mapping
+ One second response for Mobile user (ATF 1st response)

### Learning - New Work:
+ Demonstrate foundation 4
+ Demonstrate Marionette w/AMD
+ Demonstrate optimal build procedure for development and SEO
+ Model a scalable, extensible application architecture
  * Separate structure from layout
  * SRP, Modular 
  * Composite Application Archtiecture
+ Separate, portable backend and frontend 
  * Total javascript front end implementation (one language)

### External Dependencies
#### Responsive CSS
+ Ruby
+ Compass
+ Sass

#### Build and Package Management Dependencies
+ Git
+ Node
+ Npm
+ Grunt-cli
+ Bower (manages runtime requirejs, webshim)

### Unmanaged Vendor packages
+ modernizr, still waiting on grunt-modernizr/Moderizr 3

### Dynamically loaded modules
#### Dynamic and Conditionally loaded modules
+ (none)
