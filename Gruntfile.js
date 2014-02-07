// helper function to spawn a child grunt task
function runTask(grunt, task, stdoutData) {
  var child = grunt.util.spawn({
    grunt: true,
    args: [task]
  }, function() {});
  if (stdoutData) {
    child.stdout.on("data", stdoutData);
  }
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
}

// helper function to get an array of node dependencies
function nodeDeps(pkg) {
  var prefix = "node_modules/", suffix = "/**", result = [];
  // exclude any deps with binaries, these install w/package.json
  var exclude = {
    "html-snapshots": true,
    "phantomjs": true,
    "hiredis": true,
    "node-phantom": true
  };
  for (var dep in pkg.dependencies) {
    if (!exclude[dep]) {
      result.push(prefix+dep+suffix);
    }
  }
  return result;
}

// async helper
var async = require("async");

// middleware to mock /api for test
var mockApi = require("./test/fixtures/mockApi");

// path helper
var path = require("path");

// Grunt callback
module.exports = function(grunt) {

  // load all grunt tasks
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // load the server configurations
  var serverDir = "server";
  var configLib = require("./"+serverDir+"/config");
  var config = {
    all: configLib.create("all"),
    test: configLib.create("test"),
    debug: configLib.create("debug"),
    release: configLib.create("release"),
    dev: configLib.create("development")
  };

  // project configuration
  var projectConfig = {
    dist: {
      debug: config.debug.staticBase,
      release: config.release.staticBase
    },
    app: "app",
    report: "report",
    images: config.all.imagesDir,
    fonts: config.all.fontsDir,
    scripts: config.all.scriptsDir,
    atfKey: config.all.atfKey,
    server: serverDir,
    serverMain: "app.js",
    test: "test/mocha",
    vendor: "vendor",
    mock: {
      host: config.test.proxy.hostname,
      port: config.test.proxy.port
    },
    port: {
      test: config.test.app.port,
      dev: config.dev.app.port,
      debug: config.debug.app.port,
      release: config.release.app.port
    },
    pkg: grunt.file.readJSON("package.json")
  };

  // Grunt config
  grunt.initConfig({

    project: projectConfig,

    // atfUpdate custom internal task
    // Updates targetFile with remote atf content
    atfUpdate: {
      dev: {
        options: {
          environment: "development",
          update: "<%= project.atfKey %>"
        }
      },
      test: {
        options: {
          update: "file",
          environment: "test"
        },
        src: ["<%= project.test %>/index.html"]
      },
      demo: {
        options: {
          update: "file",
          environment: "test"
        },
        src: ["<%= project.dist.release %>/index.html"]
      },
      debug: {
        options: {
          environment: "debug",
          update: "<%= project.atfKey %>"
        }
      },
      release: {
        options: {
          environment: "release",
          update: "<%= project.atfKey %>"
        }
      }
    },

    // atfRemove custom internal task
    // Removes the bootstrapped atf content from the html source
    atfRemove: {
      options: {
        update: "file"
      },
      test: {
        src: [
          "<%= project.test %>/index.html"
        ]
      }
    },

    // bower task provided by grunt-bower-requirejs
    // This automatically updates our requirejs config with our bower dependencies
    bower: {
      all: {
        rjsConfig: "<%= project.app %>/config.js",
        options: {
          exclude: [
            // these are not compiled/referenced
            "chai", "underscore", "mocha", "sinon", "almond", "requirejs",
            // these are custom (deviate from package main)
            "lodash", "backbone.marionette"
          ]
        }
      }
    },

    // clean task provided by grunt-contrib-clean.
    // The clean task ensures all files are removed from the appropriate dist/ directory so
    // that no files linger from previous builds.
    clean: {
      debug: ["<%= project.dist.debug %>"],
      debugAfterInline: [
        "<%= project.dist.debug %>/index.css",
        "<%= project.dist.debug %>/vendor"
      ],
      release: [
        "<%= project.dist.release %>",
        "<%= project.app %>/styles"
      ],
      "release-post": [
        "<%= project.dist.debug %>/<%= project.scripts %>/require.js"
      ],
      releaseAfterInline: [
        "<%= project.dist.release %>/index.css",
        "<%= project.dist.release %>/vendor"
      ]
    },

    // Compass compile task provided by grunt-contrib-compass.
    compass: {
      options: {
        sassDir: "<%= project.app %>/sass",
        cssDir: "<%= project.app %>/styles",
        javascriptsDir: "<%= project.vendor %>/gem/foundation",
        imagesDir: "<%= project.images %>",
        fontsDir: "<%= project.fonts %>",
        importPath: [
          "<%= project.vendor %>/bower/foundation/scss",
          "<%= project.app %>"
        ]
      },
      test: {
        options: {
          environment: "development"
        }
      },
      dev: {
        options: {
          environment: "development",
          debugInfo: true
        }
      },
      debug: {
        options: {
          environment: "development",
          debugInfo: true
        }
      },
      release: {
        options: {
          environment: "production"
        }
      }
    },

    // Task provided by grunt-contrib-concat.
    // Builds the un-optimized application distribution js.
    // The concatenate task is used here to merge the almond require/define
    // shim and the templates into the application code.
    concat: {
      options: {
        separator: ";"
      },
      dist: {
        src: [
          // use require if you have dynamically loaded stuff
          //"<%= project.vendor %>/bower/requirejs/require.js",
          // use almond if you don't
          "<%= project.vendor %>/bower/almond/almond.js",
          "<%= project.dist.debug %>/<%= project.scripts %>/templates.js",
          "<%= project.dist.debug %>/<%= project.scripts %>/require.js"
        ],
        dest: "<%= project.dist.debug %>/<%= project.scripts %>/require.js"
      }
    },

    // connect webserver provided by grunt-contrib-connect
    connect: {
      options: {
        hostname: "<%= project.mock.hostname %>",
        port: "<%= project.mock.port %>",
        middleware: function(connect) {
          return [
            mockApi
            //, TODO: add better error here
          ];
        }
      },
      // the server to mock the api to run the test suites against
      test: {
        options: {
          keepalive: false
        }
      },
      // the server to mock the api to run the test suites against, interactive
      // corresponds to express:devTest
      devTest: {
        options: {
          keepalive: true
        }
      },
      // the server to mock the api to run an interactive demo against
      // corresponds to express:demo
      demo: {
        options: {
          keepalive: true
        }
      }
    },

    // express task provided by grunt-express-server
    express: {
      options: {
        script: "<%= project.serverMain %>"
      },
      // this server is for interactive development
      dev: {
        options: {
          node_env: "development",
          background: false
        }
      },
      // this server is for automated tests
      test: {
        options: {
          node_env: "test",
          background: true
        }
      },
      // this server is for interactive test development
      devTest: {
        options: {
          node_env: "test",
          background: false
        }
      },
      // this server is for demo use without a live backend
      demo: {
        options: {
          script: "<%= project.dist.release %>/<%= project.serverMain %>",
          node_env: "demo",
          background: false
        }
      },
      // this server is for the automated debug build
      debug: {
        options: {
          script: "<%= project.dist.debug %>/<%= project.serverMain %>",
          node_env: "debug",
          background: true
        }
      },
      // this server is for interactively testing the debug distribution
      devDebug: {
        options: {
          script: "<%= project.dist.debug %>/<%= project.serverMain %>",
          node_env: "debug",
          background: false
        }
      },
      // this server is for the automated release build
      release: {
        options: {
          script: "<%= project.dist.release %>/<%= project.serverMain %>",
          node_env: "release",
          background: true
        }
      },
      // this server is for interactively testing the release distribution
      devRelease: {
        options: {
          script: "<%= project.dist.release %>/<%= project.serverMain %>",
          node_env: "release",
          background: false
        }
      }
    },

    // Copy task provided by grunt-contrib-copy.
    // This task will copy assets into your build directory.
    // This makes an entirely encapsulated build into
    // each directory.
    copy: {
      options: {
        mode: true
      },
      debug: {
        files: [
          // this is handled by cssmin for release
          {
            src: "<%= project.app %>/styles/index.css",
            dest: "<%= project.dist.debug %>/index.css"
          },
          // the rest
          {
            src: [
              // files in root besides index.html
              "package.json", "app.js", "Procfile", "404.html", "favicon.ico", "robots.txt", "google24e9e21ce1f6df19.html",
              // other directories
              "<%= project.server %>/**", "<%= project.images %>/*.png", "<%= project.fonts %>/**",
              // vendor stuff
              "<%= project.vendor %>/js/modernizr/modernizr.js"
              //"<%= project.vendor %>/bower/foundation/js/foundation/**"
            ].concat(nodeDeps(projectConfig.pkg)),
            dest: "<%= project.dist.debug %>/"
          }
        ]
      },
      release: {
        files: [
          // the main dist copy
          {
            src: [
              // static files in root besides index.html
              "package.json", "app.js", "Procfile", "404.html", "favicon.ico", "robots.txt", "google24e9e21ce1f6df19.html",
              // other directories
              "<%= project.server %>/**",
              // this is covered by imagemin for release builds
              //"<%= project.images %>/*.png",
              "<%= project.fonts %>/**",
              // vendor stuff
              "<%= project.vendor %>/js/modernizr/modernizr.js"
              //"<%= project.vendor %>/bower/foundation/js/foundation/**"
            ].concat(nodeDeps(projectConfig.pkg)),
            dest: "<%= project.dist.release %>/"
          }
        ]
      }
    },

    // CSS Minification and concatenation is provided by grunt-contrib-cssmin.
    // This output is named index.css, because we only want to
    // load one stylesheet in index.html.
    cssmin: {
      options: {
        report: "gzip"
      },
      release: {
        files: [{
          src: ["<%= project.app %>/styles/index.css"],
          dest: "<%= project.dist.release %>/index.css"
        }]
      }
    },

    // image minification provided by grunt-contrib-imagemin task
    // takes sprited pngs from images and places them in release/images
    imagemin: {
      release: {
        files: [{
          expand: true,
          cwd: "<%= project.images %>",
          src: ["*.png"],
          dest: "<%= project.dist.release %>/<%= project.images %>"
        }]
      }
    },

    // inline task provided by grunt-inline.
    // This inlines the ATF blocking css and js.
    inline: {
      debug: {
        src: ["<%= project.dist.debug %>/index.html"]
      },
      release: {
        src: ["<%= project.dist.release %>/index.html"]
      }
    },

    // js Formatting task provided by grunt-jsbeautifier
    jsbeautifier: {
      files: ["<%= jshint.files %>", "<%= jshint.test.src %>"],
      options: {
        indent_size: 2,
        indent_char: " ",
        indent_level: 0,
        indent_with_tabs: false,
        preserve_newlines: true,
        max_preserve_newlines: 2,
        jslint_happy: false,
        brace_style: "collapse",
        keep_array_indentation: false,
        keep_function_indentation: false,
        space_before_conditional: true,
        break_chained_methods: false,
        eval_code: false,
        wrap_line_length: 0,
        unescape_strings: false
      }
    },

    // Task provided by grunt-contrib-jshint.
    jshint: {
      client: {
        // The jshint option for scripturl is set to lax, because the anchor
        // override inside anchor.js needs to test for them so as to not accidentally
        // route.
        options: {
          scripturl: true,

          // Allows the use of expressions in assignments. 
          // "Expected an assignment or function call and instead saw an expression."
          "-W093": false
        },
        src: [
          "Gruntfile.js", "<%= project.app %>/**/*.js"
        ]
      },
      server: {
        src: [
          "<%= project.serverMain %>",
          "<%= project.server %>/**/*.js"
        ]
      },
      test: {
        options: {
          "-W030": false,
          "-W024": false
        },
        src: ["<%= project.test %>/**/*.js"]
      }
    },

    // Task provided by grunt-contrib-jst.
    // The jst task compiles all application templates into JavaScript
    // functions with the underscore.js template function from 1.2.4.
    //
    // The concat task depends on this file to exist, so if you decide to
    // remove this, ensure concat is updated accordingly.
    jst: {
      compile: {
        files: [{
          src: ["<%= project.app %>/**/*.html"],
          dest: "<%= project.dist.debug %>/<%= project.scripts %>/templates.js"
        }]
      }
    },

    // Testing task provided by grunt-mocha.
    // Runs the tests
    mocha: {
      all: {
        options: {
          run: false,
          log: true,
          bail: false,
          urls: [
            "http://localhost:<%= project.port.test %>/<%= project.test %>/index.html"
          ]
        }
      }
    },

    // plato task provided by grunt-plato
    // This runs introspection reports. 
    // path is used so that this can be run from a reporting repo and tracked there.
    plato: {
      client: {
        options: {
          exclude: /config\.js/
        },
        files: [{
          dest: "<%= project.report %>",
          src: [
            path.join(__dirname, "<%= project.app %>")+"/**/*.js",
            path.join(__dirname, "<%= project.server %>")+"/**/*.js",
            path.join(__dirname, "<%= project.serverMain %>")
          ]
        }]
      }
    },

    // Task provided by grunt-contrib-requirejs.
    // This task uses James Burke's excellent r.js AMD build tool.  In the
    // future other builders may be contributed as drop-in alternatives.
    requirejs: {
      compile: {
        options: {
          // We do this in the uglify step so we can debug
          optimize: "none",

          // Ensure modules are inserted
          skipModuleInsertion: false,

          // Include the main configuration file.
          mainConfigFile: "<%= project.app %>/config.js",

          // Output file.
          out: "<%= project.dist.debug %>/<%= project.scripts %>/require.js",

          // Root application module.
          name: "config",

          // Do not wrap everything in an IIFE.
          wrap: false,

          done: function(done, output) {

            var duplicates = require('rjs-build-analysis').duplicates(output);

            if (duplicates.length > 0) {
              grunt.log.subhead('Duplicates found in requirejs build:');
              grunt.log.warn(duplicates);
              done(new Error('r.js built duplicate modules, please check the excludes option.'));
            }

            done();
          }
        }
      }
    },

    // revision task provided by grunt-rev
    // makes hash revisions for select files
    rev: {
      options: {
        encoding: "utf8",
        algorithm: "md5",
        length: 8
      },
      debug: {
        files: {
          src: [
            "<%= project.dist.debug %>/<%= project.scripts %>/require.js"
          ]
        }
      },
      release: {
        files: {
          src: [
            "<%= project.dist.release %>/<%= project.scripts %>/require.js"
          ]
        }
      }
    },

    // targethtml task provided by grunt-targethtml.
    // If you want to generate targeted `index.html` builds into the `dist/`
    // folders, use the following configuration block and set 
    // conditionals inside `index.html`.
    targethtml: {
      debug: {
        src: "index.html",
        dest: "<%= project.dist.debug %>/index.html"
      },

      release: {
        src: "index.html",
        dest: "<%= project.dist.release %>/index.html"
      }
    },

    // Minification and js compilation is provided by grunt-contrib-uglify.
    // Takes the built require.js file and minifies it for filesize benefits.
    // This produces the release version of the application from the debug version,
    // output by the concat task.
    uglify: {
      options: {
        /*report: "gzip"*/
        report: "min"
      },
      release: {
        files: [{
          src: ["<%= project.dist.debug %>/<%= project.scripts %>/require.js"],
          dest: "<%= project.dist.release %>/<%= project.scripts %>/require.js"
        }]
      }
    },

    // useminOptions custom internal task
    // usemin provided by grunt-usemin
    useminOptions: {
      debug: {
        usemin: {
          html: ["<%= project.dist.debug %>/index.html"],
          options: {
            dirs: ["<%= project.dist.debug %>"],
            basedir: "<%= project.dist.debug %>"
          }
        }
      },
      release: {
        usemin: {
          html: ["<%= project.dist.release %>/index.html"],
          options: {
            dirs: ["<%= project.dist.release %>"],
            basedir: "<%= project.dist.release %>"
          }
        }
      }
    },

    // Watch task provided by grunt-contrib-watch
    // We are watching changes to all js, css, and markup.
    // When a change is detected, we run any associated tasks and signal livereload.
    // This task relies on jshint src settings for js file detection.
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: [
        "<%= jshint.client.src %>",
        "<%= jshint.test.src %>",
        "<%= jshint.server.src %>"
        ],
        tasks: ["jshint"]
      },
      css: {
        files: ["<%= project.app %>/**/*.scss"],
        tasks: ["compass:dev"]
      },
      html: {
        files: ["<%= project.app %>/**/*.html"]
      }
    }
  });

  // Get usemin to support multiple targets
  grunt.registerMultiTask("useminOptions", "prepareOptions for usemin", function() {
    grunt.config.set("usemin", this.data.usemin);
  });

  // custom internal task to update files or redis with atf content
  grunt.registerMultiTask("atfUpdate", "update atf content in targets", function() {
    var atf = require("./server/workers/atf/lib");
    var options = this.options(),
        done = this.async();
    if (options.update === "file") {
      var count = 0,
          files = this.filesSrc;
      files.forEach(function(file) {
        atf.run(atf.file.update(file, function(err, target) {
          if (err) {
            grunt.fail.fatal(err);
          }
          grunt.log.writeln("updated "+target+" with atf content");
          count++;
          if (count === files.length) {
            grunt.log.ok(files.length + " files updated");
            done();
          }
        }), options.environment);
      });
    } else {
      atf.run(atf.redis.update(options.update, function(err, key) {
        if (err) {
          grunt.fail.fatal(err);
        } else {
          grunt.log.ok("updated atf content in redis '"+key+"'");
        }
        done();
      }), options.environment);
    }
  });

  // custom internal task to remove atf content from files
  grunt.registerMultiTask("atfRemove", "remove atf content from target files", function() {
    var atf = require("./server/workers/atf/lib");
    var options = this.options(),
        done = this.async();
    if (options.update === "file") {
      var count = 0,
          files = this.filesSrc;
      files.forEach(function(file) {
        atf.file.remove(file, function(err, target) {
          if (err) {
            grunt.fail.fatal(err);
          }
          grunt.log.writeln("removed atf content from "+target);
          count++;
          if (count === files.length) {
            grunt.log.ok(files.length + " files updated");
            done();
          }
        });
      });
    } else {
      atf.redis.remove(options.update, function(err, key) {
        if (err) {
          grunt.fail.fatal(err);
        } else {
          grunt.log.ok("removed atf content from Redis '"+key+"'");
        }
        done();
      });
    }
  });

  grunt.registerTask("default", "workflow menu", function() {
    grunt.log.writeln("Workflow menu:");
    grunt.log.writeln("\tgrunt test - Run the test suites");
    grunt.log.writeln("\tgrunt lint - Run the linter");
    grunt.log.writeln("\tgrunt ccss - Run compass");
    grunt.log.writeln("\tgrunt watch - Run the watch process");
    grunt.log.writeln("\tgrunt push - Prepare to push to remote");
    grunt.log.writeln("\tgrunt format - Run the js formatter");
    grunt.log.writeln("\tgrunt dev - Run the development watch and webserver");
    grunt.log.writeln("\tgrunt devTest - Run the development watch and webserver for the test suite");
    grunt.log.writeln("\tgrunt demo - Run the demo development webserver against the mockapi");
    grunt.log.writeln("\tgrunt plato - Run the static analysis report");
    grunt.log.writeln("\tgrunt debug - Build the debug version of the app");
    grunt.log.writeln("\tgrunt release - Build the release version of the app");
  });

  // the standalone test task
  grunt.registerTask("test", ["compass:test", "connect:test", "atfUpdate:test", "express:test", "mocha", "atfRemove:test"]);

  // the standalone lint task
  grunt.registerTask("lint", ["jshint"]);

  // the standalone push task
  grunt.registerTask("push", ["lint", "test", "plato"]);

  // the standalone css compile task
  grunt.registerTask("ccss", ["compass:dev"]);

  // the standalone formatter
  grunt.registerTask("format", ["jsbeautifier"]);

  // the standard development task, run watch and the development webserver in parallel
  // use this for interactive front-end development
  grunt.registerTask("devTasks", "parallel development tasks", function() {
    async.parallel([
      function() {
        runTask(grunt, "watch");
      },
      function() {
        runTask(grunt, "atfUpdate:dev");
      },
      function() {
        runTask(grunt, "express:dev");
      }
    ], this.async());
  });
  grunt.registerTask("dev", ["ccss", "devTasks"]);

  // the test development task, run watch, mock api, and the development webserver in parallel
  // use this for interactive test suite development
  grunt.registerTask("devTest", "develop the test suite", function() {
    async.parallel([
      function() {
        runTask(grunt, "watch");
      },
      function() {
        runTask(grunt, "connect:devTest", function(chunk) {
          if (/Started connect/ig.test(chunk)) {
            runTask(grunt, "atfUpdate:test");
          }
        });
      },
      function() {
        runTask(grunt, "express:devTest");
      }
    ], this.async());
  });

  // the demo development task, run watch, mock api, and the development webserver in parallel
  grunt.registerTask("demoTasks", "parallel demo tasks", function() {
    async.parallel([
      function() {
        runTask(grunt, "connect:demo", function(chunk) {
          if (/Started connect/ig.test(chunk)) {
            runTask(grunt, "atfUpdate:demo");
          }
        });
      },
      function() {
        runTask(grunt, "express:demo");
      }
    ], this.async());
  });
  grunt.registerTask("demo", ["release", "demoTasks"]);

  // build tasks: debug, release

  // tasks common to any build
  var commonTasks = ["bower", "jshint", "jst", "requirejs", "concat"];

  // The debug task will remove all contents inside the dist/ folder, lint
  // all your code, precompile all the underscore templates into
  // dist/debug/templates.js, compile all the application code into
  // dist/debug/require.js, and then concatenate the require/define shim
  // almond.js and dist/debug/templates.js into the require.js file.
  var debugTasks = ["clean:debug"].concat(commonTasks);
  debugTasks.push(
    "compass:debug",
    "targethtml:debug",
    "copy:debug",
    "inline:debug",
    "clean:debugAfterInline",
    "rev:debug",
    "useminOptions:debug",
    "usemin",
    "atfUpdate:debug"
  );
  grunt.registerTask("debug", debugTasks);

  // The release task will run the debug tasks and then minify the
  // dist/debug/require.js file and CSS files.
  var releaseTasks = ["clean:release"].concat(commonTasks);
  releaseTasks.push(
    "compass:release",
    "uglify:release",
    "cssmin:release",
    "imagemin:release",
    "targethtml:release",
    "copy:release",
    "inline:release",
    "clean:releaseAfterInline",
    "rev:release",
    "useminOptions:release",
    "usemin",
    "atfUpdate:release",
    "clean:release-post"
  );
  grunt.registerTask("release", releaseTasks);

};