var mkdirp = require('mkdirp');
var fs = require('fs');

module.exports = function (grunt) {  
  var config = require('./my_config.json');//use config.json as example
  grunt.log.writeln('config = ',config);

  //grunt.loadTasks('./tasks');

  grunt.initConfig({
    shell: {
      exec: {
        options: {
          stdout: true,
          stderr: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: true,
      },
      target1: [
        'Gruntfile.js',
        './lib/**/*.js',
        './test/**/*.js'
      ]
    },
    //clean: {
    //  keys: ['test/keys/'],
    //  options: { force: true }
    //},
    //copy: {
    //  keys: {
    //    expand: true,
    //    src: config.docker_machine_key_path + '*',
    //    dest: 'test/keys/',
    //    flatten: true,
    //    filter: 'isFile',
    //  },
    //},
    mochaTest: {
      config: config,
      test: {
        options: {
          reporter: 'spec',
          bail: true,
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['./test/**/*.js']
        //src: [baseDir + '/test/fleetmakefileReplace_test.js']
        //src: [baseDir + '/test/objectToArray_test.js']
      }
    },  

  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-clean');
  //grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['jshint', 'mochaTest']);
};
