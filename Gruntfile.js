// helper function to spawn a child grunt task
function runTask(grunt, task) {
  var child = grunt.util.spawn({
    grunt: true,
    args: [task]
  }, function() {});
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
}

// helper function to get an array of node dependencies
function nodeDeps(pkg) {
  var prefix = "node_modules/", suffix = "/**", result = [];
  for (var dep in pkg.dependencies) {
    result.push(prefix+dep+suffix);
  }
  return result;
}

// middleware to mock /api for test
var mockApi = require("./test/fixtures/mockApi");

// Grunt callback
module.exports = function(grunt) {

  // load all grunt tasks
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // load the server configurations
  var Config = require("./server/config");
  var configTest = new Config("test");
  var configDebug = new Config("debug");
  var configRelease = new Config("release");
  var configDev = new Config("development");

  // project configuration
  var projectConfig = {
    dist: {
      debug: "dist/debug",
      release: "dist/release"
    },
    app: "app",
    report: "report",
    images: "images",
    fonts: "fonts",
    server: "server",
    serverMain: "app.js",
    test: "test/mocha",
    vendor: "vendor",
    mock: {
      host: configTest.proxy.host,
      port: configTest.proxy.port
    },
    port: {
      test: configTest.appPort,
      dev: configDev.appPort,
      debug: configDebug.appPort,
      release: configRelease.appPort
    },
    pkg: grunt.file.readJSON("package.json")
  };

  // Grunt config
  grunt.initConfig({

    project: projectConfig,

    // atfUpdate custom internal task
    // Updates targetFile with remote atf content
    atfUpdate: {
      index: {
        dest: "index.html"
      },
      test: {
        dest: "<%= project.test %>/index.html"
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
            "chai", "underscore", "mocha", "sinon", "webshim", "almond", "requirejs",
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
        "<%= project.dist.debug %>/require.js"
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
          debugInfo: true//,
          //force: true
        }
      },
      debug: {
        options: {
          environment: "development",
          debugInfo: true//,
          //force: true
        }
      },
      release: {
        environment: "production",
        force: true
      }
    },

    // Task provided by grunt-contrib-concat.
    // Builds the un-optimized application distribution js.
    // Outputs to dist/debug/require.js.
    // The concatenate task is used here to merge the almond require/define
    // shim and the templates into the application code.  It's named
    // dist/debug/require.js, because we want to only load one script file in
    // index.html.
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
          "<%= project.dist.debug %>/templates.js",
          "<%= project.dist.debug %>/require.js"
        ],
        dest: "<%= project.dist.debug %>/require.js"
      }
    },

    // connect webserver provided by grunt-contrib-connect
    connect: {
      options: {
        hostname: "<%= project.mock.host %>",
        port: "<%= project.mock.port %>",
        middleware: function(connect) {
          return [
            mockApi
            //, TODO: throw an error here
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
      // this server is for demo use without a backend
      demo: {
        options: {
          node_env: "development",
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
    // This task will copy assets into your build directory,
    // automatically.  This makes an entirely encapsulated build into
    // each directory.
    copy: {
      debug: {
        files: [
          // this is handled by cssmin for release
          {
            src: "<%= project.app %>/styles/index.css",
            dest: "<%= project.dist.debug %>/index.css"
          },
          // the main dist copy
          {
            src: [
              // files in root besides index.html
              "package.json", "app.js", "Procfile", "404.html", "favicon.ico", "robots.txt", "sitemap.xml", "google24e9e21ce1f6df19.html",
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
              "package.json", "app.js", "Procfile", "404.html", "favicon.ico", "robots.txt", "sitemap.xml", "google24e9e21ce1f6df19.html",
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

    // html_snapshots provided by grunt-html-snapshots.
    // This task will create the html snapshots for indexing.
    html_snapshots: {
      options: {
        selector: {
          "/": "#content .multiple-posts",
          "__default": "#content .grid-row"
        },
        source: "robots.txt"
      },
      debug: {
        options: {
          port: "<%= project.port.debug %>",
          outputDir: "<%= project.dist.debug %>/snapshots"
        }
      },
      release: {
        options: {
          port: "<%= project.port.release %>",
          outputDir: "<%= project.dist.release %>/snapshots"
        }
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
          dest: "<%= project.dist.debug %>/templates.js"
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
    plato: {
      client: {
        options: {
          exclude: /config\.js/
        },
        files: [{
          dest: "<%= project.report %>",
          src: [
            "<%= project.app %>/**/*.js",
            "<%= project.server %>/**/*.js",
            "<%= project.serverMain %>"
          ]
        }]
      }
    },

    // regex replace task provided by grunt-regex-replace
    // Ensures that usemin replacements are preceeded by a /
    "regex-replace": {
      debug: {
        src: ["<%= project.dist.debug %>/index.html"],
        actions: [{
          name: "require",
          search: "(\"){1,1}([0-9a-fA-F]+\\.require.js)",
          replace: "$1/$2"
        }]
      },
      release: {
        src: ["<%= project.dist.release %>/index.html"],
        actions: [{
          name: "require",
          search: "(\"){1,1}([0-9a-fA-F]+\\.require.js)",
          replace: "$1/$2"
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
          out: "<%= project.dist.debug %>/require.js",

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
            "<%= project.dist.debug %>/require.js"
          ]
        }
      },
      release: {
        files: {
          src: [
            "<%= project.dist.release %>/require.js"
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
          src: ["<%= project.dist.debug %>/require.js"],
          dest: "<%= project.dist.release %>/require.js"
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

  // custom internal task to update files with atf content
  grunt.registerMultiTask("atfUpdate", "update atf content in targets", function() {
    var atf = require("./server/workers/atf/lib");
    var count = 0, fileCount = this.files.length;
    var done = this.async();
    this.files.forEach(function(file) {
      atf.update(file.dest, function() {
        count++;
        if (count === fileCount) done();
      });
    });
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
  grunt.registerTask("test", ["atfUpdate:test", "compass:test", "connect:test", "express:test", "mocha"]);

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
  grunt.registerTask("dev", "development task", function() {
    grunt.util.async.parallel([
      function() {
        runTask(grunt, "watch");
      },
      function() {
        runTask(grunt, "atfUpdate:index");
      },
      function() {
        runTask(grunt, "express:dev");
      }
    ], this.async());
  });

  // the test development task, run watch, mock api, and the development webserver in parallel
  // use this for interactive test suite development
  grunt.registerTask("devTest", "develop the test suite", function() {
    grunt.util.async.parallel([
      function() {
        runTask(grunt, "watch");
      },
      function() {
        runTask(grunt, "atfUpdate:test");
      },
      function() {
        runTask(grunt, "connect:devTest");
      },
      function() {
        runTask(grunt, "express:devTest");
      }
    ], this.async());
  });

  // the test development task, run watch, mock api, and the development webserver in parallel
  // use this for interactive test suite development
  grunt.registerTask("demo", "run the demo webserver and backend", function() {
    grunt.util.async.parallel([
      function() {
        runTask(grunt, "connect:demo");
      },
      function() {
        runTask(grunt, "atfUpdate:index");
      },
      function() {
        runTask(grunt, "express:demo");
      }
    ], this.async());
  });

  // build tasks: debug, release

  // tasks common to any build
  var commonTasks = ["bower", "jshint", "jst", "requirejs", "concat", "atfUpdate:index"];

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
    "regex-replace:debug",
    "express:debug",
    "html_snapshots:debug"
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
    "regex-replace:release",
    "express:release",
    "html_snapshots:release",
    "clean:release-post"
  );
  grunt.registerTask("release", releaseTasks);

};