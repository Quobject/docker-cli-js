# docker-cli-js
A node.js wrapper for the docker command line tool

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

## Installation

### Warning

Code uses exec = child_process.exec; https://github.com/Quobject/docker-cli-js/issues/22

### Step 1: Prerequisites

The docker command line tool must be installed and accessible in the path

### Step 2: Installation
    
    npm install docker-cli-js
    
Then:

```js
var dockerCLI = require('docker-cli-js');
var DockerOptions = dockerCLI.Options;
var Docker = dockerCLI.Docker;
```

## Usage

### DockerCLI Options

| Option                    | Type                | Description                                                       |
| ------------------------- | ------------------- | ----------------------------------------------------------------- |
| `machineName`             | `string`            | The name of the Docker machine.                                   |
| `currentWorkingDirectory` | `string`            | The current working directory where Docker commands are executed. |
| `echo`                    | `boolean`           | If true, the Docker commands are echoed to the console.           |
| `env`                     | `NodeJS.ProcessEnv` | The environment variables for the Docker process.                 |
| `stdin`                   | `string`            | The standard input for the Docker process.                        |

### Modern JS - direct call

```js
// esm
const { dockerCommand } = require('docker-cli-js');

// default options
const options = {
  machineName: null, // uses local docker
  currentWorkingDirectory: null, // uses current working directory
  echo: true, // echo command output to stdout/stderr
  env: null, // environment variables
  stdin: null, // stdin used for the command (useful for passing passwords, etc)
};

const data = await dockerCommand('build -t nginximg .', options);
```

### With promise

```js
   var options = new DockerOptions(
    /* machinename */ 'aws_machine01',
    /* currentWorkingDirectory */ 'nginx',
    /* echo */ true,
   );    

   var docker = new Docker(options);

   docker.command('build -t nginximg .').then(function (data) {
    console.log('data = ', data);
   })


//data = {
//  command: 'docker --tlsverify --tlscacert="/home/ubuntu/.docker/machine/machines/aws_machine01/ca.pem" --tlscert="/home/ubuntu/.docker/machine/machines/aws_machine01/cert.pem" --tlskey="/home/ubuntu/.docker/machine/machines/aws_machine01/key.pem" -H=tcp://52.64.142.194:2376 build -t nginximg . ',
//  raw: 'Sending build context to Docker daemon 3.584 kB\\rSending build context to Docker daemon 3.584 kB\\r\\r\\nStep 0 : FROM nginx\\nlatest: Pulling from library/nginx\\n843e2bded498: Pulling fs layer\\n8c00acfb0175: Pulling fs layer\\n426ac73b867e: Pulling fs layer\\nd6c6bbd63f57: Pulling fs layer\\n4ac684e3f295: Pulling fs layer\\n91391bd3c4d3: Pulling fs layer\\nb4587525ed53: Pulling fs layer\\n0240288f5187: Pulling fs layer\\n28c109ec1572: Pulling fs layer\\n063d51552dac: Pulling fs layer\\nd8a70839d961: Pulling fs layer\\nceab60537ad2: Pulling fs layer\\nd8a70839d961: Verifying Checksum\\nd8a70839d961: Download complete\\n4ac684e3f295: Verifying Checksum\\n4ac684e3f295: Download complete\\n0240288f5187: Verifying Checksum\\n0240288f5187: Download complete\\nd6c6bbd63f57: Verifying Checksum\\nd6c6bbd63f57: Download complete\\n8c00acfb0175: Verifying Checksum\\n8c00acfb0175: Download complete\\nceab60537ad2: Verifying Checksum\\nceab60537ad2: Download complete\\n28c109ec1572: Verifying Checksum\\n28c109ec1572: Download complete\\n426ac73b867e: Verifying Checksum\\n426ac73b867e: Download complete\\n063d51552dac: Verifying Checksum\\n063d51552dac: Download complete\\n91391bd3c4d3: Verifying Checksum\\n91391bd3c4d3: Download complete\\nb4587525ed53: Verifying Checksum\\nb4587525ed53: Download complete\\n843e2bded498: Verifying Checksum\\n843e2bded498: Download complete\\n843e2bded498: Pull complete\\n8c00acfb0175: Pull complete\\n426ac73b867e: Pull complete\\nd6c6bbd63f57: Pull complete\\n4ac684e3f295: Pull complete\\n91391bd3c4d3: Pull complete\\nb4587525ed53: Pull complete\\n0240288f5187: Pull complete\\n28c109ec1572: Pull complete\\n063d51552dac: Pull complete\\nd8a70839d961: Pull complete\\nceab60537ad2: Pull complete\\nlibrary/nginx:latest: The image you are pulling has been verified. Important: image verification is a tech preview feature and should not be relied on to provide security.\\nDigest: sha256:302e0a331371acb77e434075d111ebe485a7f3605fdcf184185fcca73d65ac8b\\nStatus: Downloaded newer image for nginx:latest\\n ---> ceab60537ad2\\nStep 1 : COPY content /usr/share/nginx/html\\n ---> d57e3a01e674\\nRemoving intermediate container 84b42b1010a6\\nSuccessfully built d57e3a01e674\\n',
//  success: true,
//  imageId: 'd57e3a01e674',
//  response:
//   ['Sending build context to Docker daemon 3.584 kB\rSending build context to Docker daemon 3.584 kB\r\r',
//     'Step 0 : FROM nginx',
//     'latest: Pulling from library/nginx',
//     '843e2bded498: Pulling fs layer',
//     '8c00acfb0175: Pulling fs layer',
//     '426ac73b867e: Pulling fs layer',
//     'd6c6bbd63f57: Pulling fs layer',
//     '4ac684e3f295: Pulling fs layer',
//     '91391bd3c4d3: Pulling fs layer',
//     'b4587525ed53: Pulling fs layer',
//     '0240288f5187: Pulling fs layer',
//     '28c109ec1572: Pulling fs layer',
//     '063d51552dac: Pulling fs layer',
//     'd8a70839d961: Pulling fs layer',
//     'ceab60537ad2: Pulling fs layer',
//     'd8a70839d961: Verifying Checksum',
//     'd8a70839d961: Download complete',
//     '4ac684e3f295: Verifying Checksum',
//     '4ac684e3f295: Download complete',
//     '0240288f5187: Verifying Checksum',
//     '0240288f5187: Download complete',
//     'd6c6bbd63f57: Verifying Checksum',
//     'd6c6bbd63f57: Download complete',
//     '8c00acfb0175: Verifying Checksum',
//     '8c00acfb0175: Download complete',
//     'ceab60537ad2: Verifying Checksum',
//     'ceab60537ad2: Download complete',
//     '28c109ec1572: Verifying Checksum',
//     '28c109ec1572: Download complete',
//     '426ac73b867e: Verifying Checksum',
//     '426ac73b867e: Download complete',
//     '063d51552dac: Verifying Checksum',
//     '063d51552dac: Download complete',
//     '91391bd3c4d3: Verifying Checksum',
//     '91391bd3c4d3: Download complete',
//     'b4587525ed53: Verifying Checksum',
//     'b4587525ed53: Download complete',
//     '843e2bded498: Verifying Checksum',
//     '843e2bded498: Download complete',
//     '843e2bded498: Pull complete',
//     '8c00acfb0175: Pull complete',
//     '426ac73b867e: Pull complete',
//     'd6c6bbd63f57: Pull complete',
//     '4ac684e3f295: Pull complete',
//     '91391bd3c4d3: Pull complete',
//     'b4587525ed53: Pull complete',
//     '0240288f5187: Pull complete',
//     '28c109ec1572: Pull complete',
//     '063d51552dac: Pull complete',
//     'd8a70839d961: Pull complete',
//     'ceab60537ad2: Pull complete',
//     'library/nginx:latest: The image you are pulling has been verified. Important: image verification is a tech preview feature and should not be relied on to provide security.',
//     'Digest: sha256:302e0a331371acb77e434075d111ebe485a7f3605fdcf184185fcca73d65ac8b',
//     'Status: Downloaded newer image for nginx:latest',
//     ' ---> ceab60537ad2',
//     'Step 1 : COPY content /usr/share/nginx/html',
//     ' ---> d57e3a01e674',
//     'Removing intermediate container 84b42b1010a6',
//     'Successfully built d57e3a01e674',
//     '']
//}
```

### With callback:

```js
   var docker = new Docker();

  docker.command('info', function (err, data) {
    console.log('data = ', data);
  });


```

### Typescript

```ts
import { Docker, Options } from 'docker-cli-js';

const options = new Options(
  /* machineName */ null,
  /* currentWorkingDirectory */ path.join(__dirname, '..', 'test', 'nginx'),
  /* echo*/ true,
);

let docker = new Docker(options);

docker.command('build -t nginximg .').then(function (data) {
  console.log('data = ', data);
});
```


* docker run

```js

docker.command('run --name nginxcont -d -p 80:80 nginximg').then(function (data) {
  console.log('data = ', data);
});

//data = {
//  command: 'docker run --name nginxcont -d -p 80:80 nginximg ',
//  raw: 'c0df7ad377630bd3bd05fba217e295434fa2d5da03c5216e531a9421530360dc\\n',
//  containerId: 'c0df7ad377630bd3bd05fba217e295434fa2d5da03c5216e531a9421530360dc'
//}
```

* docker ps

```js

docker.command('ps').then(function (data) {
  console.log('data = ', data);
});


//data =  { command: 'docker ps ',
//  raw: 'CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS
//                  NAMES\\nc0df7ad37763        nginximg           \\"nginx -g \'daemon off\\"   33 minutes ago      Up 33 minutes       0.0.0.0:80->80/tcp, 443/tcp   nginxcont\\n',
//containerList:
//[ { containerId: 'c0df7ad37763',
//  image: 'nginximg',
//  command: '"nginx -g \'daemon off"',
//  created: '33 minutes ago',
//  status: 'Up 33 minutes',
//  ports: '0.0.0.0:80->80/tcp, 443/tcp',
//  name: 'nginxcont' } ] }
```

* docker images

```js

docker.command('images').then(function (data) {
  console.log('data = ', data);
});


//data =  { command: 'docker images ',
//  raw: 'REPOSITORY             TAG                  IMAGE ID            CREATED             VIRTUAL SIZE\\nquobjectio/consul
//     0.5.2                c2e8640282e5        5 days ago          37.17 MB\\nquobjectio/consul      0.5.2c               74ae12b3b517        5 days ago          35.92 MB\\n<none>                 <none>               35682216ba6f        6 days ago
//35.92 MB\\nquobjectio/mongodb     3.0.7                5ca1d18839fb        10 days ago         347 MB\\nquobjectio/mongodb
//3.0.7d               5ca1d18839fb        10 days ago         347 MB\\nquobjectio/zookeeper   3.4.6-ubuntu-14.04   92eedb07b809        2 weeks ago         369.9 MB\\nswarm                  latest               6b40fe7724bd        2 weeks ago         15.6 MB\\nalpine                 3.2                  8a648f689ddb        9 weeks ago         5.249 MB\\nalpine                 latest               8a648f689ddb        9 weeks ago         5.249 MB\\nubuntu                 latest               91e54dfb1179
//3 months ago        188.4 MB\\nubuntu                 14.04                8251da35e7a7        3 months ago        188.4 MB\\nubuntu                 15.04                23635bbeb7c5        3 months ago        131.3 MB\\ntutum/mongodb          latest               e27c5e60a8f1        5 months ago        502.6 MB\\n',
//images:
//[ { repository: 'quobjectio/consul',
//  tag: '0.5.2',
//  'image id': 'c2e8640282e5',
//  created: '5 days ago',
//  'virtual size': '37.17 MB' },
//  { repository: 'quobjectio/consul',
//    tag: '0.5.2c',
//    'image id': '74ae12b3b517',
//    created: '5 days ago',
//    'virtual size': '35.92 MB' },
//  { repository: '<none>',
//    tag: '<none>',
//    'image id': '35682216ba6f',
//    created: '6 days ago',
//    'virtual size': '35.92 MB' },
//  { repository: 'quobjectio/mongodb',
//    tag: '3.0.7',
//    'image id': '5ca1d18839fb',
//    created: '10 days ago',
//    'virtual size': '347 MB' },
//  { repository: 'quobjectio/mongodb',
//    tag: '3.0.7d',
//    'image id': '5ca1d18839fb',
//    created: '10 days ago',
//    'virtual size': '347 MB' },
//  { repository: 'quobjectio/zookeeper',
//    tag: '3.4.6-ubuntu-14.04',
//    'image id': '92eedb07b809',
//    created: '2 weeks ago',
//    'virtual size': '369.9 MB' },
//  { repository: 'swarm',
//    tag: 'latest',
//    'image id': '6b40fe7724bd',
//    created: '2 weeks ago',
//    'virtual size': '15.6 MB' },
//  { repository: 'alpine',
//    tag: '3.2',
//    'image id': '8a648f689ddb',
//    created: '9 weeks ago',
//    'virtual size': '5.249 MB' },
//  { repository: 'alpine',
//    tag: 'latest',
//    'image id': '8a648f689ddb',
//    created: '9 weeks ago',
//    'virtual size': '5.249 MB' },
//  { repository: 'ubuntu',
//    tag: 'latest',
//    'image id': '91e54dfb1179',
//    created: '3 months ago',
//    'virtual size': '188.4 MB' },
//  { repository: 'ubuntu',
//    tag: '14.04',
//    'image id': '8251da35e7a7',
//    created: '3 months ago',
//    'virtual size': '188.4 MB' },
//  { repository: 'ubuntu',
//    tag: '15.04',
//    'image id': '23635bbeb7c5',
//    created: '3 months ago',
//    'virtual size': '131.3 MB' },
//  { repository: 'tutum/mongodb',
//    tag: 'latest',
//    'image id': 'e27c5e60a8f1',
//    created: '5 months ago',
//    'virtual size': '502.6 MB' } ] }
```

* docker network ls

```js

docker.command('network ls').then(function (data) {
  console.log('data = ', data);
});


//data = {
//  command: 'docker network ls ',
//  raw: 'NETWORK ID          NAME                                      DRIVER\\n4d6a0a35e87f        machine.1.ap-southeast-2.1.0.0.5/none     null                \\n042642d752f4        machine.1.ap-southeast-2.1.0.0.5/host     host                \\n6cc7e229d7c3        machine.1.ap-southeast-2.2.0.0.5/none     null                \\n4a6e627fc1dc        machine.1.ap-southeast-2.2.0.0.5/host     host                \\ne1b70f5af1c8        machine.1.ap-southeast-2.2.0.0.5/bridge   bridge              \\n1f5d449aca44        machine.1.ap-southeast-2.1.0.0.5/bridge   bridge              \\n',
//  network:
//   [{
//     'network id': '4d6a0a35e87f',
//     name: 'machine.1.ap-southeast-2.1.0.0.5/none',
//     driver: 'null'
//   },
//     {
//       'network id': '042642d752f4',
//       name: 'machine.1.ap-southeast-2.1.0.0.5/host',
//       driver: 'host'
//     },
//     {
//       'network id': '6cc7e229d7c3',
//       name: 'machine.1.ap-southeast-2.2.0.0.5/none',
//       driver: 'null'
//     },
//     {
//       'network id': '4a6e627fc1dc',
//       name: 'machine.1.ap-southeast-2.2.0.0.5/host',
//       driver: 'host'
//     },
//     {
//       'network id': 'e1b70f5af1c8',
//       name: 'machine.1.ap-southeast-2.2.0.0.5/bridge',
//       driver: 'bridge'
//     },
//     {
//       'network id': '1f5d449aca44',
//       name: 'machine.1.ap-southeast-2.1.0.0.5/bridge',
//       driver: 'bridge'
//     }]
//}
```

* docker inspect 
```js

docker.command('inspect consul').then(function (data) {
  console.log('data = ', data);
});


//data =  { command: 'docker inspect consul ',
//  raw: '[\\n{\\n    \\"Id\\": \\"2e91854b5dd01a1bb9a8c67757264f32cd512385502f365321771bf669b0ff62\\",\\n    \\"Created\\": \\"2016-01-14T01:53:08.855624531Z\\",\\n    \\"Path\\": \\"/run.sh\\",\\n    \\"Args\\": [\\n        \\"agent\\",\\n        \\"-config-file\\",\\n        \\"/var/consul/config/config.json\\",\\n        \\"-bootstrap\\"\\n    ],\\n
//  \\"State\\": {\\n        \\"Status\\": \\"running\\",\\n        \\"Running\\": true,\\n        \\"Paused\\": false,\\n        \\"Restarting\\": false,\\n        \\"OOMKilled\\": false,\\n        \\"Dead\\": false,\\n        \\"Pid\\": 1913,\\n        \\"ExitCode\\": 0,\\n        \\"Error\\": \\"\\",\\n        \\"StartedAt\\": \\"2016-01-14T01:53:08.999561111Z\\",\\n        \\"FinishedAt\\": \\"0001-01-01T00:00:00Z\\"\\n    },\\n    \\"Image\\": \\"c2e8640282e5e8c0ed4efbffe661ebc9a3c6819fb3378f54eab6310a3754edc8\\",\\n    \\"ResolvConfPath\\": \\"/var/lib/docker/containers/2e91854b5dd01a1bb9a8c67757264f32cd512385502f365321771bf669b0ff62/resolv.conf\\",\\n    \\"HostnamePath\\": \\"/var/lib/docker/containers/2e91854b5dd01a1bb9a8c67757264f32cd512385502f365321771bf669b0ff62/hostname\\",\\n    \\"HostsPath\\": \\"/var/lib/docker/containers/2e91854b5dd01a1bb9a8c67757264f32cd512385502f365321771bf669b0ff62/hosts\\",\\n    \\"LogPath\\": \\"/var/lib/docker/containers/2e91854b5dd01a1bb9a8c67757264f32cd512385502f365321771bf669b0ff62/2e91854b5dd01a1bb9a8c67757264f32cd512385502f365321771bf669b0ff62-json.log\\",\\n    \\"Name\\": \\"/consul\\",\\n    \\"RestartCount\\": 0,\\n    \\"Driver\\": \\"aufs\\",\\n    \\"ExecDriver\\": \\"native-0.2\\",\\n    \\"MountLabel\\": \\"\\",\\n    \\"ProcessLabel\\": \\"\\",\\n    \\"AppArmorProfile\\": \\"\\",\\n    \\"ExecIDs\\": null,\\n    \\"HostConfig\\": {\\n        \\"Binds\\": [\\n            \\"/fleetmake/data/consul/log:/var/consul/log\\",\\n            \\"/fleetmake/data/consul/data:/var/consul/data\\",\\n            \\"/fleetmake/data/consul/conf:/var/consul/config\\"\\n        ],\\n        \\"ContainerIDFile\\": \\"\\",\\n        \\"LxcConf\\": [],\\n        \\"Memory\\": 0,\\n        \\"MemoryReservation\\": 0,\\n
//     \\"MemorySwap\\": 0,\\n        \\"KernelMemory\\": 0,\\n        \\"CpuShares\\": 0,\\n        \\"CpuPeriod\\": 0,\\n        \\"CpusetCpus\\": \\"\\",\\n        \\"CpusetMems\\": \\"\\",\\n        \\"CpuQuota\\": 0,\\n        \\"BlkioWeight\\": 0,\\n        \\"OomKillDisable\\": false,\\n        \\"MemorySwappiness\\": -1,\\n        \\"Privileged\\": false,\\n        \\"PortBindings\\": {\\n            \\"8300/tcp\\": [\\n                {\\n                    \\"HostIp\\": \\"\\",\\n                    \\"HostPort\\": \\"8300\\"\\n                }\\n            ],\\n            \\"8301/tcp\\": [\\n                {\\n                    \\"HostIp\\": \\"\\",\\n                    \\"HostPort\\": \\"8301\\"\\n                }\\n            ],\\n            \\"8301/udp\\": [\\n                {\\n
// \\"HostIp\\": \\"\\",\\n                    \\"HostPort\\": \\"8301\\"\\n                }\\n            ],\\n
//    \\"8302/tcp\\": [\\n                {\\n                    \\"HostIp\\": \\"\\",\\n                    \\"HostPort\\": \\"8302\\"\\n                }\\n            ],\\n            \\"8302/udp\\": [\\n                {\\n
//        \\"HostIp\\": \\"\\",\\n                    \\"HostPort\\": \\"8302\\"\\n                }\\n            ],\\n
//           \\"8400/tcp\\": [\\n                {\\n                    \\"HostIp\\": \\"\\",\\n                    \\"HostPort\\": \\"8400\\"\\n                }\\n            ],\\n            \\"8500/tcp\\": [\\n                {\\n
//               \\"HostIp\\": \\"\\",\\n                    \\"HostPort\\": \\"8500\\"\\n                }\\n
//],\\n            \\"8600/tcp\\": [\\n                {\\n                    \\"HostIp\\": \\"\\",\\n
//  \\"HostPort\\": \\"8600\\"\\n                }\\n            ],\\n            \\"8600/udp\\": [\\n                {\\n                    \\"HostIp\\": \\"\\",\\n                    \\"HostPort\\": \\"8600\\"\\n                }\\n
//]\\n        },\\n        \\"Links\\": null,\\n        \\"PublishAllPorts\\": false,\\n        \\"Dns\\": [],\\n
//\\"DnsOptions\\": [],\\n        \\"DnsSearch\\": [],\\n        \\"ExtraHosts\\": null,\\n        \\"VolumesFrom\\": null,\\n        \\"Devices\\": [],\\n        \\"NetworkMode\\": \\"host\\",\\n        \\"IpcMode\\": \\"\\",\\n
//\\"PidMode\\": \\"\\",\\n        \\"UTSMode\\": \\"\\",\\n        \\"CapAdd\\": null,\\n        \\"CapDrop\\": null,\\n        \\"GroupAdd\\": null,\\n        \\"RestartPolicy\\": {\\n            \\"Name\\": \\"no\\",\\n            \\"MaximumRetryCount\\": 0\\n        },\\n        \\"SecurityOpt\\": null,\\n        \\"ReadonlyRootfs\\": false,\\n
//\\"Ulimits\\": null,\\n        \\"LogConfig\\": {\\n            \\"Type\\": \\"json-file\\",\\n            \\"Config\\": {}\\n        },\\n        \\"CgroupParent\\": \\"\\",\\n        \\"ConsoleSize\\": [\\n            0,\\n
//   0\\n        ],\\n        \\"VolumeDriver\\": \\"\\"\\n    },\\n    \\"GraphDriver\\": {\\n        \\"Name\\": \\"aufs\\",\\n        \\"Data\\": null\\n    },\\n    \\"Mounts\\": [\\n        {\\n            \\"Source\\": \\"/fleetmake/data/consul/log\\",\\n            \\"Destination\\": \\"/var/consul/log\\",\\n            \\"Mode\\": \\"\\",\\n
//    \\"RW\\": true\\n        },\\n        {\\n            \\"Source\\": \\"/fleetmake/data/consul/data\\",\\n
//  \\"Destination\\": \\"/var/consul/data\\",\\n            \\"Mode\\": \\"\\",\\n            \\"RW\\": true\\n        },\\n        {\\n            \\"Source\\": \\"/fleetmake/data/consul/conf\\",\\n            \\"Destination\\": \\"/var/consul/config\\",\\n            \\"Mode\\": \\"\\",\\n            \\"RW\\": true\\n        }\\n    ],\\n    \\"Config\\": {\\n        \\"Hostname\\": \\"atomix\\",\\n        \\"Domainname\\": \\"\\",\\n        \\"User\\": \\"\\",\\n
// \\"AttachStdin\\": false,\\n        \\"AttachStdout\\": false,\\n        \\"AttachStderr\\": false,\\n        \\"ExposedPorts\\": {\\n            \\"8300/tcp\\": {},\\n            \\"8301/tcp\\": {},\\n            \\"8301/udp\\": {},\\n
//           \\"8302/tcp\\": {},\\n            \\"8302/udp\\": {},\\n            \\"8400/tcp\\": {},\\n            \\"8500/tcp\\": {},\\n            \\"8600/tcp\\": {},\\n            \\"8600/udp\\": {}\\n        },\\n        \\"Tty\\": false,\\n        \\"OpenStdin\\": false,\\n        \\"StdinOnce\\": false,\\n        \\"Env\\": [\\n            \\"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\\",\\n            \\"CONSUL_VERSION=0.5.2\\",\\n            \\"CONSUL_SHA256=171cf4074bfca3b1e46112105738985783f19c47f4408377241b868affa9d445\\"\\n        ],\\n        \\"Cmd\\": [\\n            \\"agent\\",\\n            \\"-config-file\\",\\n            \\"/var/consul/config/config.json\\",\\n
//         \\"-bootstrap\\"\\n        ],\\n        \\"Image\\": \\"quobjectio/consul:0.5.2\\",\\n        \\"Volumes\\": {\\n            \\"/var/consul/config\\": {},\\n            \\"/var/consul/data\\": {},\\n            \\"/var/consul/log\\": {}\\n        },\\n        \\"WorkingDir\\": \\"\\",\\n        \\"Entrypoint\\": [\\n            \\"/run.sh\\"\\n
//],\\n        \\"OnBuild\\": null,\\n        \\"Labels\\": {},\\n        \\"StopSignal\\": \\"SIGTERM\\"\\n    },\\n    \\"NetworkSettings\\": {\\n        \\"Bridge\\": \\"\\",\\n        \\"SandboxID\\": \\"bc04a89e70c29498c25a32472c62a01b8de7d12b31a856b539d66a344df079a2\\",\\n        \\"HairpinMode\\": false,\\n        \\"LinkLocalIPv6Address\\": \\"\\",\\n        \\"LinkLocalIPv6PrefixLen\\": 0,\\n        \\"Ports\\": {},\\n        \\"SandboxKey\\": \\"/var/run/docker/netns/default\\",\\n        \\"SecondaryIPAddresses\\": null,\\n        \\"SecondaryIPv6Addresses\\": null,\\n
//\\"EndpointID\\": \\"\\",\\n        \\"Gateway\\": \\"\\",\\n        \\"GlobalIPv6Address\\": \\"\\",\\n        \\"GlobalIPv6PrefixLen\\": 0,\\n        \\"IPAddress\\": \\"\\",\\n        \\"IPPrefixLen\\": 0,\\n        \\"IPv6Gateway\\": \\"\\",\\n        \\"MacAddress\\": \\"\\",\\n        \\"Networks\\": {\\n            \\"host\\": {\\n
//\\"EndpointID\\": \\"aeba20b34a47596646044493147fb1eafd5b4b76a3688f9b5c450b1dfe2bfdfb\\",\\n                \\"Gateway\\": \\"\\",\\n                \\"IPAddress\\": \\"\\",\\n                \\"IPPrefixLen\\": 0,\\n                \\"IPv6Gateway\\": \\"\\",\\n                \\"GlobalIPv6Address\\": \\"\\",\\n                \\"GlobalIPv6PrefixLen\\": 0,\\n                \\"MacAddress\\": \\"\\"\\n            }\\n        }\\n    }\\n}\\n]\\n',
//object:
//[ { Id: '2e91854b5dd01a1bb9a8c67757264f32cd512385502f365321771bf669b0ff62',
//  Created: '2016-01-14T01:53:08.855624531Z',
//  Path: '/run.sh',
//  Args:
//   [ 'agent',
//     '-config-file',
//     '/var/consul/config/config.json',
//     '-bootstrap' ],
//  State:
//   { Status: 'running',
//     Running: true,
//     Paused: false,
//     Restarting: false,
//     OOMKilled: false,
//     Dead: false,
//     Pid: 1913,
//     ExitCode: 0,
//     Error: '',
//     StartedAt: '2016-01-14T01:53:08.999561111Z',
//     FinishedAt: '0001-01-01T00:00:00Z' },
//  Image: 'c2e8640282e5e8c0ed4efbffe661ebc9a3c6819fb3378f54eab6310a3754edc8',
//  ResolvConfPath: '/var/lib/docker/containers/2e91854b5dd01a1bb9a8c67757264f32cd512385502f365321771bf669b0ff62/resolv.conf',
//  HostnamePath: '/var/lib/docker/containers/2e91854b5dd01a1bb9a8c67757264f32cd512385502f365321771bf669b0ff62/hostname',
//  HostsPath: '/var/lib/docker/containers/2e91854b5dd01a1bb9a8c67757264f32cd512385502f365321771bf669b0ff62/hosts',
//  LogPath: '/var/lib/docker/containers/2e91854b5dd01a1bb9a8c67757264f32cd512385502f365321771bf669b0ff62/2e91854b5dd01a1bb9a8c67757264f32cd512385502f365321771bf669b0ff62-json.log',
//  Name: '/consul',
//  RestartCount: 0,
//  Driver: 'aufs',
//  ExecDriver: 'native-0.2',
//  MountLabel: '',
//  ProcessLabel: '',
//  AppArmorProfile: '',
//  ExecIDs: null,
//  HostConfig:
//   { Binds:
//      [ '/fleetmake/data/consul/log:/var/consul/log',
//        '/fleetmake/data/consul/data:/var/consul/data',
//        '/fleetmake/data/consul/conf:/var/consul/config' ],
//     ContainerIDFile: '',
//     LxcConf: [],
//     Memory: 0,
//     MemoryReservation: 0,
//     MemorySwap: 0,
//     KernelMemory: 0,
//     CpuShares: 0,
//     CpuPeriod: 0,
//     CpusetCpus: '',
//     CpusetMems: '',
//     CpuQuota: 0,
//     BlkioWeight: 0,
//     OomKillDisable: false,
//     MemorySwappiness: -1,
//     Privileged: false,
//     PortBindings:
//      { '8300/tcp': [ { HostIp: '', HostPort: '8300' } ],
//        '8301/tcp': [ { HostIp: '', HostPort: '8301' } ],
//        '8301/udp': [ { HostIp: '', HostPort: '8301' } ],
//        '8302/tcp': [ { HostIp: '', HostPort: '8302' } ],
//        '8302/udp': [ { HostIp: '', HostPort: '8302' } ],
//        '8400/tcp': [ { HostIp: '', HostPort: '8400' } ],
//        '8500/tcp': [ { HostIp: '', HostPort: '8500' } ],
//        '8600/tcp': [ { HostIp: '', HostPort: '8600' } ],
//        '8600/udp': [ { HostIp: '', HostPort: '8600' } ] },
//     Links: null,
//     PublishAllPorts: false,
//     Dns: [],
//     DnsOptions: [],
//     DnsSearch: [],
//     ExtraHosts: null,
//     VolumesFrom: null,
//     Devices: [],
//     NetworkMode: 'host',
//     IpcMode: '',
//     PidMode: '',
//     UTSMode: '',
//     CapAdd: null,
//     CapDrop: null,
//     GroupAdd: null,
//     RestartPolicy: { Name: 'no', MaximumRetryCount: 0 },
//     SecurityOpt: null,
//     ReadonlyRootfs: false,
//     Ulimits: null,
//     LogConfig: { Type: 'json-file', Config: {} },
//     CgroupParent: '',
//     ConsoleSize: [ 0, 0 ],
//     VolumeDriver: '' },
//  GraphDriver: { Name: 'aufs', Data: null },
//  Mounts:
//   [ { Source: '/fleetmake/data/consul/log',
//     Destination: '/var/consul/log',
//     Mode: '',
//     RW: true },
//     { Source: '/fleetmake/data/consul/data',
//       Destination: '/var/consul/data',
//       Mode: '',
//       RW: true },
//     { Source: '/fleetmake/data/consul/conf',
//       Destination: '/var/consul/config',
//       Mode: '',
//       RW: true } ],
//  Config:
//   { Hostname: 'atomix',
//     Domainname: '',
//     User: '',
//     AttachStdin: false,
//     AttachStdout: false,
//     AttachStderr: false,
//     ExposedPorts:
//      { '8300/tcp': {},
//        '8301/tcp': {},
//        '8301/udp': {},
//        '8302/tcp': {},
//        '8302/udp': {},
//        '8400/tcp': {},
//        '8500/tcp': {},
//        '8600/tcp': {},
//        '8600/udp': {} },
//     Tty: false,
//     OpenStdin: false,
//     StdinOnce: false,
//     Env:
//      [ 'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
//        'CONSUL_VERSION=0.5.2',
//        'CONSUL_SHA256=171cf4074bfca3b1e46112105738985783f19c47f4408377241b868affa9d445' ],
//     Cmd:
//      [ 'agent',
//        '-config-file',
//        '/var/consul/config/config.json',
//        '-bootstrap' ],
//     Image: 'quobjectio/consul:0.5.2',
//     Volumes:
//      { '/var/consul/config': {},
//        '/var/consul/data': {},
//        '/var/consul/log': {} },
//     WorkingDir: '',
//     Entrypoint: [ '/run.sh' ],
//     OnBuild: null,
//     Labels: {},
//     StopSignal: 'SIGTERM' },
//  NetworkSettings:
//   { Bridge: '',
//     SandboxID: 'bc04a89e70c29498c25a32472c62a01b8de7d12b31a856b539d66a344df079a2',
//     HairpinMode: false,
//     LinkLocalIPv6Address: '',
//     LinkLocalIPv6PrefixLen: 0,
//     Ports: {},
//     SandboxKey: '/var/run/docker/netns/default',
//     SecondaryIPAddresses: null,
//     SecondaryIPv6Addresses: null,
//     EndpointID: '',
//     Gateway: '',
//     GlobalIPv6Address: '',
//     GlobalIPv6PrefixLen: 0,
//     IPAddress: '',
//     IPPrefixLen: 0,
//     IPv6Gateway: '',
//     MacAddress: '',
//     Networks:
//      { host:
//         { EndpointID: 'aeba20b34a47596646044493147fb1eafd5b4b76a3688f9b5c450b1dfe2bfdfb',
//           Gateway: '',
//           IPAddress: '',
//           IPPrefixLen: 0,
//           IPv6Gateway: '',
//           GlobalIPv6Address: '',
//           GlobalIPv6PrefixLen: 0,
//           MacAddress: '' } } } } ] }
```


* docker info

```js

docker.command('info').then(function (data) {
  console.log('data = ', data);
});

//{ command: 'docker info  ',
//  raw: '"Containers: 1\\n Running: 0\\n Paused: 0\\n Stopped: 1\\nImages: 835\\nServer Version: 1.10.3\\nStorage Driver: aufs\\n Root Dir: /var/lib/docker/aufs\\n Backing Filesystem: extfs\\n Dirs: 836\\n Dirperm1 Supported: true\\nExecution Driver: native-0.2\\nLogging Driver: json-file\\nPlugins: \\n Volume: local\\n Network: bridge null host\\nKernel Version: 3.19.0-39-generic\\nOperating System: Ubuntu 14.04.3 LTS\\nOSType: linux\\nArchitecture: x86_64\\nCPUs: 8\\nTotal Memory: 31.31 GiB\\nName: atomix\\nID: 3KBH:CSNL:ZFBD:7HG4:QHTG:LXN5:37YQ:TUXL:KJGP:JFL7:JLVU:77PL\\nUsername: quobject\\nRegistry: https://index.docker.io/v1/\\n"',
//  object:
//  { containers: '1',
//    running: '0',
//    paused: '0',
//    stopped: '1',
//    images: '835',
//    server_version: '1.10.3',
//    storage_driver: 'aufs',
//    root_dir: '/var/lib/docker/aufs',
//    backing_filesystem: 'extfs',
//    dirs: '836',
//    dirperm_1_supported: 'true',
//    execution_driver: 'native-0.2',
//    logging_driver: 'json-file',
//    plugins: '',
//    volume: 'local',
//    network: 'bridge null host',
//    kernel_version: '3.19.0-39-generic',
//    operating_system: 'Ubuntu 14.04.3 LTS',
//    os_type: 'linux',
//    architecture: 'x86_64',
//    cp_us: '8',
//    total_memory: '31.31 GiB',
//    name: 'atomix',
//    id: '3KBH:CSNL:ZFBD:7HG4:QHTG:LXN5:37YQ:TUXL:KJGP:JFL7:JLVU:77PL',
//    username: 'quobject',
//    registry: 'https://index.docker.io/v1/' } }
```

* docker search

```js
docker.command('search nginxcont').then(function (data) {
  console.log('data = ', data);
});

// data = {
//   command: 'docker   search nginxcont ',
//   raw:
//     'NAME                         DESCRIPTION         STARS               OFFICIAL            AUTOMATED\nprotonyx76/nginxcontainer                        0                                       \nddavie2323/nginxhelloworld   NGINXContainer      0                                       \n',
//   images:
//     [{
//       name: 'protonyx76/nginxcontainer',
//       description: '',
//       stars: '0',
//       official: '',
//       automated: ''
//     },
//       {
//         name: 'ddavie2323/nginxhelloworld',
//         description: 'NGINXContainer',
//         stars: '0',
//         official: '',
//         automated: ''
//       }]
// }
```

* docker login

Please use **--password-stdin** for **secure** login

```js
docker.command('login -u myusername --password-stdin').then(function (data) {
  console.log('data = ', data);
  // Successful login
 }, function (rejected) {
 	console.log('rejected = ', rejected);
 	// Failed login
 });

// data =  { command: 'docker   login -u myusername --password-stdin ',
//          raw: 'Login Succeeded\n',
//          login: 'Login Succeeded' }

// rejected =  error: 'Error: Command failed: docker   login -u fakeUsername -p fakePassword 
//        WARNING! Using --password via the CLI is insecure. Use --password-stdin.
//        Error response from daemon: Get https://registry-1.docker.io/v2/: unauthorized: incorrect username or password
//        ' stdout = '' stderr = 'WARNING! Using --password via the CLI is insecure. Use --password-stdin.
//        Error response from daemon: Get https://registry-1.docker.io/v2/: unauthorized: incorrect username or password
```

* docker pull

```js
docker.command('pull nginx:latest').then(function (data) {
  console.log('data = ', data);
  // Successfully pulled image
 }, function (rejected) {
 	console.log('rejected = ', rejected);
 	// Failed to pull image
 });

// data =  { command: 'docker   pull nginx:1.15.2 ',
//           raw:'1.15.2: Pulling from library/nginx\nDigest: sha256:d85914d547a6c92faa39ce7058bd7529baacab7e0cd4255442b04577c4d1f424\nStatus: Image is up to date for nginx:1.15.2\n',
//           login: '1.15.2: Pulling from library/nginx\nDigest: sha256:d85914d547a6c92faa39ce7058bd7529baacab7e0cd4255442b04577c4d1f424\nStatus: Image is up to date for nginx:1.15.2' }

// rejected =  error: 'Error: Command failed: docker   pull nginx:999.999.999 
//      Error response from daemon: manifest for nginx:999.999.999 not found
//      ' stdout = '' stderr = 'Error response from daemon: manifest for nginx:999.999.999 not found
```

* docker push

```js
docker.command('push nginx:latest').then(function (data) {
  console.log('data = ', data);
  // Successfully pulled image
 }, function (rejected) {
 	console.log('rejected = ', rejected);
 	// Failed to pull image
 });

// data =  { command: 'docker   push mattsoghoian/test ',
//          raw:
//           'The push refers to repository [docker.io/<username>/<repo>]\n08d25fa0442e: Preparing\na8c4aeeaa045: Preparing\ncdb3f9544e4c: Preparing\n08d25fa0442e: Mounted from library/nginx\na8c4aeeaa045: Mounted from library/nginx\ncdb3f9544e4c: Mounted from library/nginx\nlatest: digest: sha256:4ffd9758ea9ea360fd87d0cee7a2d1cf9dba630bb57ca36b3108dcd3708dc189 size: 948\n',
//          login:
//           'The push refers to repository [docker.io/<username>/<repo>]\n08d25fa0442e: Preparing\na8c4aeeaa045: Preparing\ncdb3f9544e4c: Preparing\n08d25fa0442e: Mounted from library/nginx\na8c4aeeaa045: Mounted from library/nginx\ncdb3f9544e4c: Mounted from library/nginx\nlatest: digest: sha256:4ffd9758ea9ea360fd87d0cee7a2d1cf9dba630bb57ca36b3108dcd3708dc189 size: 948' }

// rejected =  error: 'Error: Command failed: docker   push nginx 
//        An image does not exist locally with the tag: nginx
//        ' stdout = 'The push refers to repository [docker.io/library/nginx]
//        ' stderr = 'An image does not exist locally with the tag: nginx

// rejected =  error: 'Error: Command failed: docker   push nginx 
//        errors:
//        denied: requested access to the resource is denied
//        unauthorized: authentication required
//        ' stdout = 'The push refers to repository [docker.io/library/nginx]
//        08d25fa0442e: Preparing
//        a8c4aeeaa045: Preparing
//        cdb3f9544e4c: Preparing
//        cdb3f9544e4c: Layer already exists
//        08d25fa0442e: Layer already exists
//        a8c4aeeaa045: Layer already exists
//        ' stderr = 'errors:
//        denied: requested access to the resource is denied
//        unauthorized: authentication required
//        '
```


## License

MIT

[npm-image]: https://img.shields.io/npm/v/docker-cli-js.svg?style=flat
[npm-url]: https://npmjs.org/package/docker-cli-js
[downloads-image]: https://img.shields.io/npm/dm/docker-cli-js.svg?style=flat
[downloads-url]: https://npmjs.org/package/docker-cli-js
