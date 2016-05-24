import * as _ from 'lodash';
import * as Promise from 'bluebird';
import * as child_process from 'child_process';
import * as os from 'os';
import { cliTable2Json } from 'cli-table-2-json';
import { DockerMachine } from 'dockermachine-cli-js';
const exec = child_process.exec;

const array2Oject = function (lines: Array<string>): Object {
  return lines.reduce(function (object, linep) {
    const line = linep.trim();
    if (line.length === 0) {
      return object;
    }

    const parts = line.split(':');
    let key = parts[0];
    let value = parts.slice(1).join(':');
    key = _.snakeCase(key);
    object[key] = value.trim();
    return object;
  }, {});
};


const extractResult = function (result) {

  const extracterArray = [
    {
      re: / build /,
      run: function (resultp) {
        const lines = resultp.raw.split(os.EOL);

        lines.forEach(function (line) {
          const re = /Successfully built (.*)$/;
          const str = line;
          let m;

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

        resultp.response = lines;

        return resultp;
      },
    },
    {
      re: / run /,
      run: function (resultp) {
        resultp.containerId = resultp.raw.trim();


        return resultp;
      },
    },
    {
      re: / ps /,
      run: function (resultp) {
        const lines = resultp.raw.split(os.EOL);

        resultp.containerList = cliTable2Json(lines);

        return resultp;
      },
    },
    {
      re: / images /,
      run: function (resultp) {
        const lines = resultp.raw.split(os.EOL);

        //const debug = require('debug')('docker-cli-js:lib/index.js extractResult images');
        //debug(lines);
        resultp.images = cliTable2Json(lines);

        return resultp;
      },
    },
    {
      re: / network ls /,
      run: function (resultp) {
        const lines = resultp.raw.split(os.EOL);

        //const debug = require('debug')('docker-cli-js:lib/index.js extractResult images');
        //debug(lines);
        resultp.network = cliTable2Json(lines);

        return resultp;
      },
    },
    {
      re: / inspect /,
      run: function (resultp) {
        const object = JSON.parse(resultp.raw);

        resultp.object = object;

        return resultp;
      },
    },
    {
      re: / info /,
      run: function (resultp) {
        const lines = resultp.raw.split(os.EOL);
        resultp.object = array2Oject(lines);

        return resultp;
      },
    },



  ];

  extracterArray.forEach(function (extracter) {
    const re = extracter.re;
    const str = result.command;
    let m;

    if ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-constiable.
      // eg m[0] etc.
      return extracter.run(result);
    }
  });

  return result;
};

export class Docker {

  constructor(private options: IOptions = {
    currentWorkingDirectory: null,
    machineName: null,
    }) { }

  public command(command: string, callback?: (err, data) => void) {
    let docker = this;
    let execCommand = 'docker ';
    let machineconfig = '';

    return Promise.resolve().then(function () {
      if (docker.options.machineName) {

        const dockerMachine = new DockerMachine();

        return dockerMachine.command('config ' + docker.options.machineName).then(function (data) {
          //console.log('data = ', data);
          machineconfig = data.machine.config;
        });
      }
    }).then(function () {
      execCommand += ' ' + machineconfig + ' ' + command + ' ';

      let execOptions = {
        cwd: docker.options.currentWorkingDirectory,
        env: {
          DEBUG: '',
          HOME: process.env.HOME,
          PATH: process.env.PATH,
        },
        maxBuffer: 200 * 1024 * 1024,
      };

      return new Promise(function (resolve, reject) {
        //console.log('execCommand =', execCommand);
        //console.log('exec options =', execOptions);

        exec(execCommand, execOptions, function(error, stdout, stderr) {
          if (error) {
            //console.error(`exec error: ${error}`);
            return reject(stderr);
          }
          //need to wrap stdout in object
          //doesn't work otherwise for 'build - t nginximg1 .'
          resolve({ result: stdout});
        });
      });
    }).then(function (data: { result: string }) {
      //console.log('data:', data);
      let result = {
        command: execCommand,
        raw: data.result,
      };
      return extractResult(result);

    }).nodeify(callback);
  }
}

export interface IOptions {
  machineName?: string;
  currentWorkingDirectory?: string;
}

export class Options implements IOptions {
  public constructor(public machineName?: string, public currentWorkingDirectory?: string) { }
}

