/* tslint:disable:no-shadowed-variable */
/* tslint:disable:no-unused-variable */
import test = require('blue-tape');
import * as path from 'path';
import { Docker, Options } from './index';

test('docker-cli-js', t => {


  t.test('info', t => {
    let docker = new Docker();

    return docker.command('info').then(function (data) {
      console.log(data);
      t.ok(data);
      t.ok(data.object.server_version);
    });

  });

  t.test('build', t => {

    const options = new Options(
      /* machineName */ undefined,
      /* currentWorkingDirectory */ path.join(__dirname, '..', 'test', 'nginx'),
    );

    let docker = new Docker(options);

    return docker.command('build -t nginximg .').then(function (data) {
      console.log('data = ', data);
      t.ok(data);
      t.ok(data.success);
    });
  });


  t.test('run', t => {

    let docker = new Docker();

    return docker.command('run --name nginxcont -d -p 80:80 nginximg').then(function (data) {
      console.log('data = ', data);
      t.ok(data.containerId);
    });
  });

  t.test('ps', t => {

    let docker = new Docker();

    return docker.command('ps').then(function (data) {
      console.log('data = ', data);
      t.ok(data.containerList);
    });
  });

  t.test('images', t => {

    let docker = new Docker();

    return docker.command('images').then(function (data) {
      console.log('data = ', data);
      t.ok(data.images);
    });
  });

  t.test('network ls', t => {

    let docker = new Docker();

    return docker.command('network ls').then(function (data) {
      console.log('data = ', data);
      t.ok(data.network);
    });
  });

  t.test('inspect', t => {

    let docker = new Docker();

    return docker.command('inspect nginxcont').then(function (data) {
      console.log('data = ', data);
      t.ok(data.object);
    });
  });

  t.test('search', t => {

    let docker = new Docker();

    return docker.command('search nginxcont').then(function (data) {
      console.log('data = ', data);
      t.ok(data.images);
    });
  });

  t.test('login success', t => {

    let docker = new Docker();

    // if this these credentials ever fail, they should be replaced with new valid ones.
    return docker.command('login -u myusername -p mypassword').then(function(data) {
      console.log('data = ', data);

      // if login succeeds, these tests should pass
      t.notOk(/error/.test(data));
      t.ok(data.login);
    }, function(data) {
      console.log('data = ', data);

      // if login is rejected, these tests should fail
      t.notOk(/error/.test(data));
      t.ok(data.login);
    });
  });

  t.test('login fail', t => {

    let docker = new Docker();

    return docker.command('login -u fakeUsername -p fakePassword').then(function (data) {
      console.log('data = ', data);

      // if login succeeds, these tests should fail
      t.ok(/error/.test(data));
      t.notOk(data.login);
    }, function (data) {
      console.log('data = ', data);

      // if login is rejected, these tests should pass
      t.ok(/error/.test(data));
      t.notOk(data.login);
    });
  });

});
