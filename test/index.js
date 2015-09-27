/*global describe, it, before */
var Docker = require('../lib/index.js');
//var fs = require('fs');
//var path = require('path');
var should = require('chai').should();
var machine = new require('./dockermachineconfig.js')();

var config = require('../my_config.json');





var options = {

};

describe('machine_config', function () {
  before(function (done) {
    // runs before all tests in this block
    machine.config(config.DockerMachineName).then(
       function (output) {
         console.log('index.js machine_config output =',output);
         done();
       });
  });

  //before(function (done) {
  //  // runs before all tests in this block
  //  machine.ls().then(
  //    function (output) {
  //      console.log(output);
  //      done();
  //    });
  //});


  it('should be valid json', function () {
    config.DockerMachineName.should.be.a('string');
    //should.exist(config.DockerMachineName);
    console.log('DockerMachineStorePath', config.DockerMachineName);
  });
});



//describe('info', function () {
//  it('should return valid json', function (done) {
//    //assert.equal(false, fmvalidate.printMsg()); s
//    var docker = new Docker({ t: 't' });
//    docker.info().then(function (data) {
//      //console.log('test index.js result = ' + result);
//      should.exist(data);
//      done();
//      //var obj = JSON.parse(result);
//    });
//  });
//});

//describe('info', function () {
//  it('should call callback', function (done) {
//    //assert.equal(false, fmvalidate.printMsg()); s
//    var docker = new Docker({ t: 't' });
//    docker.info(function (err, data) {
//      should.exist(data);
//      done();
//    });
//  });
//});