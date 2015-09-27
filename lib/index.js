/**
* Copyright 2015 Matthias Ludwig
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/
'use strict';

var Promise = require("bluebird");
var exec = Promise.promisify(require('child_process').exec);
var os = require("os");
var _ = require('lodash');
var dockermachine = require('dockermachineconfig');


var Docker = function (opts) {
  if (!(this instanceof Docker)) {
    return new Docker(opts);
  }

  _.merge(this, opts);
 
};

Docker.prototype.command = function(command, callback) {
  var self = this;


  return Promise.resolve().then(function () {
    if (self.machinename) {
      return dockermachine.config(self.machinename).then(function (data) {
        console.log('data =', data);
        self.machineconfig = data;
        console.log('self =', self);
      });
    }
  }).then(function (data) {
    return exec('docker info');

  }).then(function (data) {
    //console.log('data = ', data);
    return data;
  }).nodeify(callback);
  
    
};


module.exports = Docker;

