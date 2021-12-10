import * as child_process from "child_process";
import { cliTable2Json } from "cli-table-2-json";
import { DockerMachine } from "dockermachine-cli-js";
//import * as _ from "lodash";
const snakeCase = require("lodash.snakecase");
import nodeify from "nodeify-ts";
const exec = child_process.exec;

const splitLines = function(input: string): string[] {
  return input.replace(/\r/g, "").split("\n");
};

const array2Oject = function(lines: string[]): any {
  return lines.reduce(function(object: any, linep) {
    const line = linep.trim();
    if (line.length === 0) {
      return object;
    }

    const parts = line.split(":");
    let key = parts[0];
    const value = parts.slice(1).join(":");
    key = snakeCase(key);
    object[key] = value.trim();
    return object;
  }, {});
};

const extractResult = function(result: any) {
  const extracterArray = [
    {
      re: / build /,
      run(resultp: any) {
        const lines = splitLines(resultp.raw);

        lines.forEach(function(line: any) {
          const re = /Successfully built (.*)$/;
          const str = line;
          const m = re.exec(str);

          if (m !== null) {
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
      run(resultp: any) {
        resultp.containerId = resultp.raw.trim();

        return resultp;
      },
    },
    {
      re: / ps /,
      run(resultp: any) {
        const lines = splitLines(resultp.raw);

        resultp.containerList = cliTable2Json(lines);

        return resultp;
      },
    },
    {
      re: / images /,
      run(resultp: any) {
        const lines = splitLines(resultp.raw);

        //const debug = require('debug')('docker-cli-js:lib/index.js extractResult images');
        //debug(lines);
        resultp.images = cliTable2Json(lines);

        return resultp;
      },
    },
    {
      re: / network ls /,
      run(resultp: any) {
        const lines = splitLines(resultp.raw);

        //const debug = require('debug')('docker-cli-js:lib/index.js extractResult images');
        //debug(lines);
        resultp.network = cliTable2Json(lines);

        return resultp;
      },
    },
    {
      re: / inspect /,
      run(resultp: any) {
        const object = JSON.parse(resultp.raw);

        resultp.object = object;

        return resultp;
      },
    },
    {
      re: / info /,
      run(resultp: any) {
        const lines = splitLines(resultp.raw);
        resultp.object = array2Oject(lines);

        return resultp;
      },
    },
    {
      re: / search /,
      run(resultp: any) {
        const lines = splitLines(resultp.raw);

        resultp.images = cliTable2Json(lines);

        return resultp;
      },
    },
    {
      re: / login /,
      run(resultp: any) {
        resultp.login = resultp.raw.trim();

        return resultp;
      },
    },
    {
      re: / pull /,
      run(resultp: any) {
        resultp.login = resultp.raw.trim();

        return resultp;
      },
    },
    {
      re: / push /,
      run(resultp: any) {
        resultp.login = resultp.raw.trim();

        return resultp;
      },
    },
  ];

  extracterArray.forEach(function(extracter) {
    const re = extracter.re;
    const str = result.command;
    const m = re.exec(str + " ");

    if (m !== null) {
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

export const dockerCommand = async (
  command: string,
  options: IOptions = {
    currentWorkingDirectory: undefined,
    echo: true,
    env: undefined,
    machineName: undefined,
    stdin: undefined
  },
) => {
  let machineconfig = "";

  if (options.machineName) {
    machineconfig = await new DockerMachine()
      .command(`config ${options.machineName}`)
      .then((data) => data.machine.config);
  }

  const execCommand = `docker ${machineconfig} ${command}`;
  const execOptions = {
    cwd: options.currentWorkingDirectory,
    env: {
      DEBUG: "",
      HOME: process.env.HOME,
      PATH: process.env.PATH,
      ...options.env,
    },
    maxBuffer: 200 * 1024 * 1024,
  };

  const raw = await new Promise((resolve, reject) => {
    const childProcess = exec(
      execCommand,
      execOptions,
      (error, stdout, stderr) => {
        if (error) {
          return reject(
            Object.assign(
              new Error(`Error: stdout ${stdout}, stderr ${stderr}`),
              { ...error, stdout, stderr, innerError: error },
            ),
          );
        }

        resolve(stdout);
      },
    );

    if (options.stdin) {
      childProcess.stdin.write(options.stdin);
      childProcess.stdin.end();
    }

    if (options.echo) {
      childProcess.stdout.on("data", (chunk) => {
        process.stdout.write(chunk.toString());
      });

      childProcess.stderr.on("data", (chunk) => {
        process.stderr.write(chunk.toString());
      });
    }
  });

  return extractResult({
    command: execCommand,
    raw,
  });
};

export class Docker {
  constructor(
    private options: IOptions = {
      currentWorkingDirectory: undefined,
      echo: true,
      env: undefined,
      machineName: undefined,
      stdin: undefined
    },
  ) {}

  public command(command: string, callback?: (err: any, data: any) => void) {
    return nodeify(dockerCommand(command, this.options), callback);
  }
}

export interface IOptions {
  machineName?: string;
  currentWorkingDirectory?: string;
  echo?: boolean;
  env?: NodeJS.ProcessEnv;
  stdin?: string;
}

export class Options implements IOptions {
  public constructor(
    public machineName?: string,
    public currentWorkingDirectory?: string,
    public echo: boolean = true,
    public env?: NodeJS.ProcessEnv,
    public stdin?: string,
  ) {}
}
