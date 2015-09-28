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
  var exec_command = 'docker ';

  return Promise.resolve().then(function () {
    if (self.machinename) {
      return dockermachine.config(self.machinename).then(function (data) {
        self.machineconfig = data;
      });
    }
  }).then(function (data) {
   
    if (self.machineconfig) {
      exec_command += self.machineconfig.raw + ' ';
    }
    exec_command += command + ' ';

    var exec_options = {};
    if (self.cwd) {
      exec_options.cwd = self.cwd;
    }
    console.log('exec options =', exec_options);

    return exec(exec_command, exec_options);

  }).then(function (data) {

    var result = {
      command: exec_command,
      raw: JSON.stringify(data)
    };
    return extractResult(result);

  }).nodeify(callback);
};

module.exports = Docker;

var extractResult = function (result) {
  result.test = 'done';

  var extracterArray = [
    {
      re: / build /,
      run: function (resultp) {
        var obj = JSON.parse(resultp.raw);
        var lines = obj[0].split(os.EOL);

        lines.forEach(function (line) {
          var re = /Successfully built (.*)$/; 
          var str = line;
          var m;
 
          if ((m = re.exec(str)) !== null) {
            if (m.index === re.lastIndex) {
              re.lastIndex++;
            }
            // View your result using the m-variable.
            // eg m[0] etc.
            resultp.success = true;
            resultp.imageId = m[1];
          }
        });

        return (resultp.response = lines);
      }
    }
  ];

  extracterArray.forEach(function (extracter) {
    var re = extracter.re;
    var str = result.command;
    var m;

    if ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-variable.
      // eg m[0] etc.
      return extracter.run(result);
    }
  });

  return result;
};

