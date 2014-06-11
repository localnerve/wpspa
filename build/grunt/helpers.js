/**
 * A collection of helpers for grunt tasks
 *
 */
var _ = require("underscore");
var config = require("./config");

// Helper function to spawn a child grunt task
// Optional stdoutData gets 'data' once started
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

// Helper function to get an array of node dependencies
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

// Helper function to extend requirejs config with 
//   environment specific configuration. Also, any common config
//   is mixed in here as well.
// NOTE: function closed on _, configLib
function mixinEnvConfig(env, requirejsConfig) {
  var envConfig = config.configLib.create(env);
  var moduleConfig = {
    "helpers/content": {
      backendHostname: envConfig.proxy.hostname
    },
    "helpers/params": {
      customFieldsParam: envConfig.common.customFieldsParam
    },
    "components/layout/header/navigation/entities": {
      endpoint: envConfig.atf.navigation
    },
    "components/layout/header/banner/entities": {
      endpoint: envConfig.atf.siteInfo
    },
    "components/layout/footer/sidebarContainer/entities": {
      endpoint: envConfig.atf.footer
    },
    "components/content/entities/specializations/recent": {
      endpoint: envConfig.atf.recent
    }
  };
  _.extend(requirejsConfig.config, moduleConfig);
  return requirejsConfig;
}

// Map tasks from taskList, substituting tasks found in subst along the way.
// subst is an object like { existingTask: substituteTask }
//  where existingTasks in taskList are substituted for substituteTask
// If substituteTask is falsy, it is removed from the resulting list.
function mapTasks(taskList, subst) {
  // Make array of the existing tasks to substitute for in taskList
  var tasksToSubst = _.keys(subst);

  // Return taskList tasks with their substitutions
  return _.compact(
    _.map(taskList, function(task) {
      if (_.contains(tasksToSubst, task)) {
        return subst[task];
      } else {
        return task;
      }
    })
  );
}

module.exports = {
  runTask: runTask,
  nodeDeps: nodeDeps,
  mixinEnvConfig: mixinEnvConfig,
  mapTasks: mapTasks
};