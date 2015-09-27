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


var DockerMachine = function (opts) {
  if (!(this instanceof DockerMachine)) {
    return new DockerMachine(opts);
  }
};

DockerMachine.prototype.config = function (name, callback) {

  return Promise.resolve().then(function () {
    return exec('docker-machine config ' + name);
  }).then(function (data) {
    var str = data[0];
    //var str = '';
    //console.log('str = ', str);

    var extractValue = function (strp, name) {
      var re = new RegExp("--" + name +"=\"([\\S]*)\"",'i');
      var m;

      if ((m = re.exec(strp)) !== null) {
        if (m.index === re.lastIndex) {
          re.lastIndex++;
        }
      }
     
      return (m && m[1]) ? m[1] : null;
    };

    var result = {
      tlsverify: function (strp) {
        var re = /--tlsverify/;
        var m;

        if ((m = re.exec(strp)) !== null) {
          if (m.index === re.lastIndex) {
            re.lastIndex++;
          }
          // View your result using the m-variable.
          // eg m[0] etc.
        }
        //if (m && m[0] && m[0] === '--tlsverify') {
        //  console.log('--tlsverify m[0] = ', m[0]);
        //}
        return (m && m[0] && m[0] === '--tlsverify') || false;
      }(str),
      tlscacert: extractValue(str, 'tlscacert'),
      tlscert: extractValue(str, 'tlscert'),
      tlskey: extractValue(str,'tlskey')
    };

    return result;
  }).nodeify(callback);


};


module.exports = DockerMachine;

