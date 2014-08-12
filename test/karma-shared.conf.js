module.exports = function(config) {
  config.set({
    frameworks: ["mocha"],
    autoWatch: false,
    logLevel: config.LOG_INFO,
    logColors: true,
    browsers: ["Chrome"],
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 20000

/*
    // SauceLabs config for local development.
    sauceLabs: {
      testName: "WPSPA",
      startConnect: true,
      options: {
        "selenium-version": "2.41.0"
      }
    },

    // For more browsers on Sauce Labs see:
    // https://saucelabs.com/docs/platforms/webdriver
    customLaunchers: {
      "SL_Chrome": {
        base: "SauceLabs",
        browserName: "chrome",
        version: "34"
      },
      "SL_Firefox": {
        base: "SauceLabs",
        browserName: "firefox",
        version: "26"
      },
      "SL_Safari": {
        base: "SauceLabs",
        browserName: "safari",
        platform: "OS X 10.9",
        version: "7"
      },
      "SL_IE_9": {
        base: "SauceLabs",
        browserName: "internet explorer",
        platform: "Windows 2008",
        version: "9"
      },
      "SL_IE_10": {
        base: "SauceLabs",
        browserName: "internet explorer",
        platform: "Windows 2012",
        version: "10"
      },
      "SL_IE_11": {
        base: "SauceLabs",
        browserName: "internet explorer",
        platform: "Windows 8.1",
        version: "11"
      }
    }
*/
  });

/*  
  if (process.env.TRAVIS) {
    var buildLabel = "TRAVIS #" + process.env.TRAVIS_BUILD_NUMBER + " (" + process.env.TRAVIS_BUILD_ID + ")";

    config.logLevel = config.LOG_DEBUG;
    config.transports = ["websocket", "xhr-polling"];
    config.captureTimeout = 0; // rely on SL timeout

    config.browserStack.build = buildLabel;
    config.browserStack.startTunnel = false;

    config.sauceLabs.build = buildLabel;
    config.sauceLabs.startConnect = false;
    config.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;

    // TODO: remove once SauceLabs supports websockets.
    // This speeds up the capturing a bit, as browsers don't even try to use websocket.
    config.transports = ["xhr-polling"];

    // Debug logging into a file, that we print out at the end of the build.
    config.loggers.push({
      type: "file",
      filename: process.env.LOGS_DIR + "/" + (specificOptions.logFile || "karma.log")
    });
  }
*/

};