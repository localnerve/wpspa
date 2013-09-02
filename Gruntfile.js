// middleware for static content.
var mountFolder = function(connect, dir) {
  return connect.static(require("path").resolve(dir));
};

// middleware to mock /api for test
var mockApi = require("./test/fixtures/mockApi");

// middleware to route /api requests to the backend.
var proxy = require("./server/node/lib/proxy");

// middleware for rewrites
var rewrite = require("connect-modrewrite");

// middleware for notfound
var notfound = require("./server/node/lib/notfound");

// helper for rewrites
var rewriteHelper = require("./app/helpers/rewrites");

// Grunt callback
module.exports = function(grunt) {

  // load all grunt tasks
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // project configuration
  var projectConfig = {
    dist: {
      debug: "dist/debug",
      release: "dist/release"
    },
    api: {
      host: "jsonapi.local",
      port: 80
    },
    app: "app",
    report: "report",
    images: "images",
    fonts: "fonts",
    test: "test/mocha",
    vendor: "vendor",
    port: {
      test: 9000,
      dev: 9001,
      debug: 9002,
      release: 9003
    }
  };

  // Grunt config
  grunt.initConfig({

    project: projectConfig,

    bower: {
      all: {
        rjsConfig: "<%= project.app %>/config.js",
        options: {
          exclude: [
            // these are not compiled
            "chai", "foundation", "mocha", "sinon", "webshim",
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
      release: ["<%= project.dist.release %>"],
      "release-post": ["<%= project.dist.debug %>/require.js"]
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
          environment: "development",
          debugInfo: false,
          force: false
        }
      },
      dev: {
        options: {
          environment: "development",
          debugInfo: true,
          force: true
        }
      },
      debug: {
        options: {
          environment: "development",
          debugInfo: true,
          force: true
        }
      },
      release: {
        environment: "production",
        debugInfo: false,
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
          // had to go with require because of dynamically loaded stuff
          "<%= project.vendor %>/bower/requirejs/require.js",
          "<%= project.dist.debug %>/templates.js",
          "<%= project.dist.debug %>/require.js"
        ],
        dest: "<%= project.dist.debug %>/require.js"
      }
    },

    // connect webserver provided by grunt-contrib-connect
    connect: {
      options: {
        // change this to '0.0.0.0' to access the server from outside
        hostname: "localhost"
      },
      test: {
        testdir: "<%= project.test %>",
        options: {
          port: "<%= project.port.test %>",
          middleware: function(connect) {
            return [
              mockApi,
              mountFolder(connect, "."),
              notfound.four04
            ];
          }
        }
      },
      testTest: {
        testdir: "<%= project.test %>",
        options: {
          port: "<%= project.port.test %>",
          keepalive: true,
          middleware: function(connect) {
            return [
              mockApi,
              mountFolder(connect, "."),
              notfound.four04
            ];
          }
        }
      },
      dev: {
        options: {
          port: "<%= project.port.dev %>",
          keepalive: true,
          middleware: function(connect) {
            return [
              // handle api
              proxy.api(
                grunt.config.process("<%= project.api.host %>"),
                grunt.config.process("<%= project.api.port %>")
              ),
              // rewrite filter
              rewrite([
                // if application marked notfound, exit here
                "^" + rewriteHelper.notfound('(.+)', {
                  regex: true
                }) + "$ /404.html [NC] [L]",
                // if a static resource is not being requested, its an in-app route
                '!(\\.(css$|js$|png$|ico$|txt$|xml$|html$)) /index.html [NC] [L]'
              ]),
              // static files
              mountFolder(connect, "."),
              // if we're here, its a 404
              notfound.four04
            ];
          }
        }
      },
      debugTest: {
        options: {
          keepalive: true,
          port: "<%= project.port.debug %>",
          middleware: function(connect) {
            return [
              // handle api
              proxy.api(
                grunt.config.process("<%= project.api.host %>"),
                grunt.config.process("<%= project.api.port %>")
              ),
              // rewrite filter
              rewrite([
                // if application marked notfound, exit here
                "^" + rewriteHelper.notfound('(.+)', {
                  regex: true
                }) + "$ /404.html [NC] [L]",
                // if a static resource is not being requested, its an in-app route
                '!(\\.(css$|js$|png$|ico$|txt$|xml$|html$)) /index.html [NC] [L]'
              ]),
              // static files
              mountFolder(connect, grunt.config.process("<%= project.dist.debug %>")),
              // if we're here, its a 404
              notfound.four04
            ];
          }
        }
      },
      debug: {
        options: {
          port: "<%= project.port.debug %>",
          middleware: function(connect) {
            return [
              proxy.api(
                grunt.config.process("<%= project.api.host %>"),
                grunt.config.process("<%= project.api.port %>")
              ),
              mountFolder(connect, grunt.config.process("<%= project.dist.debug %>"))
            ];
          }
        }
      },
      release: {
        options: {
          port: "<%= project.port.release %>",
          middleware: function(connect) {
            return [
              proxy.api(
                grunt.config.process("<%= project.api.host %>"),
                grunt.config.process("<%= project.api.port %>")
              ),
              mountFolder(connect, grunt.config.process("<%= project.dist.release %>"))
            ];
          }
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
          // this is covered by cssmin for release
          {
            src: "<%= project.app %>/styles/index.css",
            dest: "<%= project.dist.debug %>/index.css"
          },
          // the main dist copy
          {
            src: [
              // files in root besides index.html
              "404.html", ".htaccess", "favicon.ico", "robots.txt", "sitemap.xml", "google24e9e21ce1f6df19.html",
              // other directories
              "<%= project.images %>/**", "<%= project.fonts %>/**",
              // vendor stuff
              "<%= project.vendor %>/bower/webshim/demos/js-webshim/minified/**",
              "<%= project.vendor %>/js/modernizr/modernizr.js"
            ],
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
              "404.html", ".htaccess", "favicon.ico", "robots.txt", "sitemap.xml", "google24e9e21ce1f6df19.html",
              // other directories
              "<%= project.images %>/**", "<%= project.fonts %>/**",
              // vendor stuff
              "<%= project.vendor %>/bower/webshim/demos/js-webshim/minified/**",
              "<%= project.vendor %>/js/modernizr/modernizr.js"
            ],
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
        //selector: "#dynamic-content",
        input: "robots",
        source: "robots.txt",
        timeout: 5000
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
    // The jshint option for scripturl is set to lax, because the anchor
    // override inside anchor.js needs to test for them so as to not accidentally
    // route.
    jshint: {
      options: {
        scripturl: true,

        // Allows the use of expressions in assignments. 
        // "Expected an assignment or function call and instead saw an expression."
        "-W093": false
      },
      files: [
        "Gruntfile.js", "<%= project.app %>/**/*.js"
      ],
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
            "http://localhost:<%= connect.test.options.port %>/<%= connect.test.testdir %>/index.html"
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
          src: "<%= project.app %>/**/*.js"
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
        }, {
          name: "css",
          search: "(\"){1,1}([0-9a-fA-F]+\\.index.css)",
          replace: "$1/$2"
        }]
      },
      release: {
        src: ["<%= project.dist.release %>/index.html"],
        actions: [{
          name: "require",
          search: "(\"){1,1}([0-9a-fA-F]+\\.require.js)",
          replace: "$1/$2"
        }, {
          name: "css",
          search: "(\"){1,1}([0-9a-fA-F]+\\.index.css)",
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
            "<%= project.dist.debug %>/require.js",
            "<%= project.dist.debug %>/index.css",
            "<%= project.dist.debug %>/<%= project.vendor %>/js/modernizr/modernizr.js"
          ]
        }
      },
      release: {
        files: {
          src: [
            "<%= project.dist.release %>/require.js",
            "<%= project.dist.release %>/index.css",
            "<%= project.dist.release %>/<%= project.vendor %>/js/modernizr/modernizr.js"
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

    // useminOptions custom task
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
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ["<%= jshint.files %>", "<%= jshint.test.src %>"],
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

  grunt.registerTask("default", "workflow menu", function() {
    grunt.log.writeln("Workflow menu:");
    grunt.log.writeln("\tgrunt test - Run the test suites");
    grunt.log.writeln("\tgrunt lint - Run the linter");
    grunt.log.writeln("\tgrunt ccss - Run compass");
    grunt.log.writeln("\tgrunt watch - Run the watch process");
    grunt.log.writeln("\tgrunt format - Run the js formatter");
    grunt.log.writeln("\tgrunt dev - Run the development watch and webserver");
    grunt.log.writeln("\tgrunt plato - Run the static analysis report");
    grunt.log.writeln("\tgrunt debug - Build the debug version of the app");
    grunt.log.writeln("\tgrunt release - Build the release version of the app");
  });

  // the standalone test task
  grunt.registerTask("test", ["compass:test", "connect:test", "mocha"]);

  // the standalone lint task
  grunt.registerTask("lint", ["jshint"]);

  // the standalone css compile task
  grunt.registerTask("ccss", ["compass:dev"]);

  // the standalone watch task (implied)
  // grunt watch

  // the standalone formatter
  grunt.registerTask("format", ["jsbeautifier"]);

  // the development task, run watch and the development webserver in parallel
  grunt.registerTask("dev", "development task", function() {
    function runTask(task) {
      var child = grunt.util.spawn({
        grunt: true,
        args: [task]
      }, function() {});
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    }
    grunt.util.async.parallel([
      function() {
        runTask("watch");
      },
      function() {
        runTask("connect:dev");
      }
    ], this.async());
  });

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
    "rev:debug",
    "useminOptions:debug",
    "usemin",
    "regex-replace:debug",
    "connect:debug",
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
    "targethtml:release",
    "copy:release",
    "rev:release",
    "useminOptions:release",
    "usemin",
    "regex-replace:release",
    "connect:release",
    "html_snapshots:release",
    "clean:release-post"
  );
  grunt.registerTask("release", releaseTasks);

};
