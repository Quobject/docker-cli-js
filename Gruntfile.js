var fs = require('fs');

module.exports = function (grunt) {  
  var config = require('./my_config.json');//use config.json as example
  grunt.log.writeln('config = ',config);

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
      }
    },  

  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['jshint', 'mochaTest']);
};
