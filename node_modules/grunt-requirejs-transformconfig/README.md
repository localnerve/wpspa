# grunt-requirejs-transformconfig

> Grunt plugin for transforming existing requirejs configuration file.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-requirejs-transformconfig --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-requirejs-transformconfig');
```

## The "requirejs_config" task

### Overview
In your project's Gruntfile, add a section named `requirejs-transformconfig` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  "requirejs-transformconfig": {
    options: {
      transform: function(config){
        config.baseUrl = "/dist";
        return config;
      }
    },

    your_target: {
      // Your RequireJS config file.
      src: 'main.js',
      // Transformed output file.
      dest: 'dist/main.js'
    },
  },
})
```

### Options

#### options.transform
Type: `Function`
Default value:
` function(config){ return config; } `

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Garry Yao. Licensed under the MIT license.
