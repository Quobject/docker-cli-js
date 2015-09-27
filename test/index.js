/*global describe, it, before */
var Docker = require('../lib/index.js');
//var fs = require('fs');
//var path = require('path');
var should = require('chai').should();
var assert = require('chai').assert;

var dockermachine = require('dockermachineconfig');

var config = require('../my_config.json');


describe('docker', function () {

  //before(function (done) {
  //  // runs before all tests in this block
  //  dockermachine.config(config.DockerMachineName).then(
  //     function (output) {
  //       console.log('index.js machine_config output =',output);
  //       done();
  //     });
  //});

  it('should merge opts', function () {
    var docker = new Docker({ a: 'a' });
    assert.isNotNull(docker);
    assert.equal(docker.a, 'a');
    console.log('docker', docker);
  });



  it('should merge opts', function (done) {
    var docker = new Docker({ machinename: config.DockerMachineName });
    console.log('docker', docker);
    assert.isNotNull(docker);
    docker.command('test').then(function (data) {
      console.log('data2', data);
      console.log('docker2', docker);
      done();
    });
  });

});


