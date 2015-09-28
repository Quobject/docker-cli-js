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
    //console.log('exec options =', exec_options);

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
    },
   {
     re: / run /,
     run: function (resultp) {
       var obj = JSON.parse(resultp.raw);
       resultp.containerId = obj[0].trim();

       //data = {
       //  command: 'docker run --name nginxcont -d -p 80:80 nginximg1 ',
       //  raw: '["c0df7ad377630bd3bd05fba217e295434fa2d5da03c5216e531a9421530360dc\\n",""]',
       //  containerId: 'c0df7ad377630bd3bd05fba217e295434fa2d5da03c5216e531a9421530360dc'
       //}

       return resultp;
     }
   },
   {
     re: / ps /,
     run: function (resultp) {
       var obj = JSON.parse(resultp.raw);
       var lines = obj[0].split(os.EOL);
       var i, line, columns, container, lineObj;
       resultp.containerList = [];

       for (i = 1; i < lines.length; i++) {
         line = lines[i].trim();
         if (line.length === 0) {
           continue;
         }
         columns = line.split(/ [ ]+/);
         lineObj = {};
         resultp.containerList.push(lineObj);
         lineObj.containerId = columns[0];
         lineObj.image = columns[1];
         lineObj.command = columns[2];
         lineObj.created = columns[3];
         lineObj.status = columns[4];
         lineObj.ports = columns[5];
         lineObj.name = columns[6];
       }

       //data =  { command: 'docker ps ',
       //  raw: '["CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS
       //                  NAMES\\nc0df7ad37763        nginximg1           \\"nginx -g \'daemon off\\"   33 minutes ago      Up 33 minutes       0.0.0.0:80->80/tcp, 443/tcp   nginxcont\\n",""]',
       //containerList:
       //[ { containerId: 'c0df7ad37763',
       //  image: 'nginximg1',
       //  command: '"nginx -g \'daemon off"',
       //  created: '33 minutes ago',
       //  status: 'Up 33 minutes',
       //  ports: '0.0.0.0:80->80/tcp, 443/tcp',
       //  name: 'nginxcont' } ] }

       return resultp;
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

