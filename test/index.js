/*global describe, it, before */
var Docker = require('../lib/index.js');
//var fs = require('fs');
var path = require('path');
var should = require('chai').should();
var assert = require('chai').assert;
var util = require('util');
var dockermachine = require('dockermachineconfig');

var config = require('../my_config.json');


describe('docker', function () {

  //it('should merge opts', function () {
  //  var docker = new Docker({ a: 'a' });
  //  assert.isNotNull(docker);
  //  assert.equal(docker.a, 'a');
  //  //console.log('docker', docker);
  //});



  //it('command info2 should fail', function (done) {
  //  var docker = new Docker({ machinename: config.DockerMachineName });
  //  //console.log('docker', docker);
  //  assert.isNotNull(docker);
  //  var failed = false;
  //  var err = null;
  //  docker.command('info2').then(function (data) {
  //    //console.log('data = ', data);
  //    assert.isNotNull(data);
  //  }).catch(function (error) {
  //    assert.isNotNull(error);
  //    err = error;
  //    failed = true;
  //    //console.log('error = ', error);
  //  }).finally(function () {
  //    //console.log('finally ');
  //    assert.isTrue(failed);
  //    assert.isNotNull(err);
  //    done();
  //  });
  //});

  //it('command info should pass', function (done) {
  //  var docker = new Docker({
  //    //machinename: config.DockerMachineName
  //  });
  //  //console.log('docker', docker);
  //  assert.isNotNull(docker);
  //  var failed = false;
  //  var err = null;
  //  docker.command('info').then(function (data) {
  //    //console.log('data = ', data);
  //    assert.isNotNull(data);
  //  //}).catch(function (error) {
  //  //  assert.isNotNull(error);
  //  //  err = error;
  //  //  failed = true;
  //  //  console.log('error = ', error);
  //  }).finally(function () {
  //    //console.log('finally ');
  //    assert.isFalse(failed);
  //    assert.isNull(err);
  //    done();
  //  });
  //});


  //it('command build should pass', function (done) {
  //  this.timeout(15000);
  //  var docker = new Docker({
  //    machinename: config.DockerMachineName,
  //    cwd: path.join(__dirname, 'nginx')
  //  });
  //  //console.log('docker', docker);
  //  assert.isNotNull(docker);
  //  var failed = false;
  //  var err = null;
  //  docker.command('build -t nginximg1 .').then(function (data) {
  //    //console.log('data = ', data);
  //    assert.isNotNull(data);
  //  }).catch(function (error) {
  //    assert.isNotNull(error);
  //    err = error;
  //    failed = true;
  //    //console.log('error = ', error);
  //  }).finally(function () {
  //    //console.log('finally ');
  //    assert.isFalse(failed);
  //    assert.isNull(err);
  //    done();
  //  });
  //});


  //it('command build with callback', function (done) {
  //  this.timeout(15000);
  //  var docker = new Docker({
  //    cwd: path.join(__dirname, 'nginx')
  //  });
  //  //console.log('docker', docker);
  //  assert.isNotNull(docker);

  //  docker.command('build -t nginximg1 .', function (err, data) {
  //    console.log('data = ', data);
  //    assert.isNotNull(data);
  //    done();
  //  });
  //});

  //it('command run', function (done) {
  //  this.timeout(15000);
  //  var docker = new Docker({
  //    machinename: config.DockerMachineName,
  //  });
  //  //console.log('docker', docker);
  //  assert.isNotNull(docker);
  //  var failed = false;
  //  var err = null;
  //  docker.command('run --name nginxcont -d -p 80:80 nginximg1').then(function (data) {
  //    console.log('data = ', data);
  //    assert.isNotNull(data);
  //  }).catch(function (error) {
  //    assert.isNotNull(error);
  //    err = error;
  //    failed = true;
  //    console.log('error = ', error);
  //  }).finally(function () {
  //    console.log('finally ');
  //    assert.isFalse(failed);
  //    assert.isNull(err);
  //    done();
  //  });
  //});

  //it('command ps', function (done) {
  //  this.timeout(15000);
  //  var docker = new Docker({
  //    machinename: config.DockerMachineName,
  //  });
  //  console.log('docker', docker);
  //  assert.isNotNull(docker);
  //  var failed = false;
  //  var err = null;
  //  docker.command('ps').then(function (data) {
  //    console.log('data = ', data);
  //    assert.isNotNull(data);
  //  }).catch(function (error) {
  //    assert.isNotNull(error);
  //    err = error;
  //    failed = true;
  //    console.log('error = ', error);
  //  }).finally(function () {
  //    console.log('finally ');
  //    assert.isFalse(failed);
  //    assert.isNull(err);
  //    done();
  //  });
  //});


  //it('command images', function (done) {
  //  this.timeout(15000);
  //  var docker = new Docker({
  //    //machinename: config.DockerMachineName,
  //  });
  //  //console.log('docker', docker);
  //  assert.isNotNull(docker);
  //  var failed = false;
  //  var err = null;
  //  docker.command('images').then(function (data) {
  //    console.log('data = ', data);
  //    assert.isNotNull(data);
  //  }).catch(function (error) {
  //    assert.isNotNull(error);
  //    err = error;
  //    failed = true;
  //    console.log('error = ', error);
  //  }).finally(function () {
  //    console.log('finally ');
  //    assert.isFalse(failed);
  //    assert.isNull(err);
  //    done();
  //  });
  //});

  //it('command network ls', function (done) {
  //  this.timeout(15000);
  //  var docker = new Docker({});
  //  assert.isNotNull(docker);
  //  var failed = false;
  //  var err = null;
  //  docker.command('--tlsverify --tlscacert="/home/apollo/.docker/machine/certs/ca.pem" --tlscert="/home/apollo/.docker/machine/certs/cert.pem" --tlskey="/home/apollo/.docker/machine/certs/key.pem" -H=tcp://52.62.82.61:3376 network ls').then(function (data) {
  //    console.log('data = ', data);
  //    assert.isNotNull(data);
  //  }).catch(function (error) {
  //    assert.isNotNull(error);
  //    err = error;
  //    failed = true;
  //    console.log('error = ', error);
  //  }).finally(function () {
  //    console.log('finally ');
  //    assert.isFalse(failed);
  //    assert.isNull(err);
  //    done();
  //  });
  //});

  it('command inspect consul', function (done) {
    this.timeout(15000);
    var docker = new Docker({});
    assert.isNotNull(docker);
    var failed = false;
    var err = null;
    docker.command('inspect consul').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10}));
      assert.isNotNull(data);
    }).catch(function (error) {
      assert.isNotNull(error);
      err = error;
      failed = true;
      console.log('error = ', error);
    }).finally(function () {
      console.log('finally ');
      assert.isFalse(failed);
      assert.isNull(err);
      done();
    });
  });


});




