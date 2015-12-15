# docker-cli-js
A node.js wrapper for the docker command line tool

[![NPM](https://nodei.co/npm/docker-cli-js.png?downloads=true&downloadRank=true)](https://nodei.co/npm/docker-cli-js/)
[![NPM](https://nodei.co/npm-dl/docker-cli-js.png?months=6&height=3)](https://nodei.co/npm/docker-cli-js/)

## Installation

### Step 1: Prerequisites

The docker command line tool must be installed and accessible in the path

### Step 2: Installation
    
    npm install docker-cli-js
    
Then:

```js
var Docker = require('docker-cli-js');
```

## Usage

With promise

```js
   var docker = new Docker({
     machinename: 'aws_machine01',
     cwd: 'nginx'
   });

   docker.command('build -t nginximg1 .').then(function (data) {
    console.log('data = ', data);
   })


//data = {
//  command: 'docker --tlsverify --tlscacert="/home/ubuntu/.docker/machine/machines/aws_machine01/ca.pem" --tlscert="/home/ubuntu/.docker/machine/machines/aws_machine01/cert.pem" --tlskey="/home/ubuntu/.docker/machine/machines/aws_machine01/key.pem" -H=tcp://52.64.142.194:2376 build -t nginximg1 . ',
//  raw: '["Sending build context to Docker daemon 3.584 kB\\rSending build context to Docker daemon 3.584 kB\\r\\r\\nStep 0 : FROM nginx\\nlatest: Pulling from library/nginx\\n843e2bded498: Pulling fs layer\\n8c00acfb0175: Pulling fs layer\\n426ac73b867e: Pulling fs layer\\nd6c6bbd63f57: Pulling fs layer\\n4ac684e3f295: Pulling fs layer\\n91391bd3c4d3: Pulling fs layer\\nb4587525ed53: Pulling fs layer\\n0240288f5187: Pulling fs layer\\n28c109ec1572: Pulling fs layer\\n063d51552dac: Pulling fs layer\\nd8a70839d961: Pulling fs layer\\nceab60537ad2: Pulling fs layer\\nd8a70839d961: Verifying Checksum\\nd8a70839d961: Download complete\\n4ac684e3f295: Verifying Checksum\\n4ac684e3f295: Download complete\\n0240288f5187: Verifying Checksum\\n0240288f5187: Download complete\\nd6c6bbd63f57: Verifying Checksum\\nd6c6bbd63f57: Download complete\\n8c00acfb0175: Verifying Checksum\\n8c00acfb0175: Download complete\\nceab60537ad2: Verifying Checksum\\nceab60537ad2: Download complete\\n28c109ec1572: Verifying Checksum\\n28c109ec1572: Download complete\\n426ac73b867e: Verifying Checksum\\n426ac73b867e: Download complete\\n063d51552dac: Verifying Checksum\\n063d51552dac: Download complete\\n91391bd3c4d3: Verifying Checksum\\n91391bd3c4d3: Download complete\\nb4587525ed53: Verifying Checksum\\nb4587525ed53: Download complete\\n843e2bded498: Verifying Checksum\\n843e2bded498: Download complete\\n843e2bded498: Pull complete\\n8c00acfb0175: Pull complete\\n426ac73b867e: Pull complete\\nd6c6bbd63f57: Pull complete\\n4ac684e3f295: Pull complete\\n91391bd3c4d3: Pull complete\\nb4587525ed53: Pull complete\\n0240288f5187: Pull complete\\n28c109ec1572: Pull complete\\n063d51552dac: Pull complete\\nd8a70839d961: Pull complete\\nceab60537ad2: Pull complete\\nlibrary/nginx:latest: The image you are pulling has been verified. Important: image verification is a tech preview feature and should not be relied on to provide security.\\nDigest: sha256:302e0a331371acb77e434075d111ebe485a7f3605fdcf184185fcca73d65ac8b\\nStatus: Downloaded newer image for nginx:latest\\n ---> ceab60537ad2\\nStep 1 : COPY content /usr/share/nginx/html\\n ---> d57e3a01e674\\nRemoving intermediate container 84b42b1010a6\\nSuccessfully built d57e3a01e674\\n",""]',
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

With callback:

```js
   var docker = new Docker({
     cwd: 'nginx'
   });

  docker.command('build -t nginximg1 .', function (err, data) {
    console.log('data = ', data);
  });

//data = {
//  command: 'docker build -t nginximg1 . ',
//  raw: '["Sending build context to Docker daemon 3.584 kB\\rSending build context to Docker daemon 3.584 kB\\r\\r\\nStep 0 : FROM nginx\\n ---> 6886fb5a9b8d\\nStep 1 : COPY content /usr/share/nginx/html\\n ---> Using cache\\n ---> abdf8a18f0a1\\nSuccessfully built abdf8a18f0a1\\n",""]',
//  success: true,
//  imageId: 'abdf8a18f0a1',
//  response:
//   ['Sending build context to Docker daemon 3.584 kB\rSending build context to Docker daemon 3.584 kB\r\r',
//     'Step 0 : FROM nginx',
//     ' ---> 6886fb5a9b8d',
//     'Step 1 : COPY content /usr/share/nginx/html',
//     ' ---> Using cache',
//     ' ---> abdf8a18f0a1',
//     'Successfully built abdf8a18f0a1',
//     '']
//}

```

* docker run

```js

docker.command('run --name nginxcont -d -p 80:80 nginximg1').then(function (data) {
  console.log('data = ', data);
});

//data = {
//  command: 'docker run --name nginxcont -d -p 80:80 nginximg1 ',
//  raw: '["c0df7ad377630bd3bd05fba217e295434fa2d5da03c5216e531a9421530360dc\\n",""]',
//  containerId: 'c0df7ad377630bd3bd05fba217e295434fa2d5da03c5216e531a9421530360dc'
//}
```

* docker ps

```js

docker.command('ps').then(function (data) {
  console.log('data = ', data);
});


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
```

* docker images

```js

docker.command('images').then(function (data) {
  console.log('data = ', data);
});


//data =  { command: 'docker images ',
//  raw: '["REPOSITORY             TAG                  IMAGE ID            CREATED             VIRTUAL SIZE\\nquobjectio/consul
//     0.5.2                c2e8640282e5        5 days ago          37.17 MB\\nquobjectio/consul      0.5.2c               74ae12b3b517        5 days ago          35.92 MB\\n<none>                 <none>               35682216ba6f        6 days ago
//35.92 MB\\nquobjectio/mongodb     3.0.7                5ca1d18839fb        10 days ago         347 MB\\nquobjectio/mongodb
//3.0.7d               5ca1d18839fb        10 days ago         347 MB\\nquobjectio/zookeeper   3.4.6-ubuntu-14.04   92eedb07b809        2 weeks ago         369.9 MB\\nswarm                  latest               6b40fe7724bd        2 weeks ago         15.6 MB\\nalpine                 3.2                  8a648f689ddb        9 weeks ago         5.249 MB\\nalpine                 latest               8a648f689ddb        9 weeks ago         5.249 MB\\nubuntu                 latest               91e54dfb1179
//3 months ago        188.4 MB\\nubuntu                 14.04                8251da35e7a7        3 months ago        188.4 MB\\nubuntu                 15.04                23635bbeb7c5        3 months ago        131.3 MB\\ntutum/mongodb          latest               e27c5e60a8f1        5 months ago        502.6 MB\\n",""]',
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

* docker images

```js

docker.command('network ls').then(function (data) {
  console.log('data = ', data);
});


//data = {
//  command: 'docker network ls ',
//  raw: '["NETWORK ID          NAME                                      DRIVER\\n4d6a0a35e87f        machine.1.ap-southeast-2.1.0.0.5/none     null                \\n042642d752f4        machine.1.ap-southeast-2.1.0.0.5/host     host                \\n6cc7e229d7c3        machine.1.ap-southeast-2.2.0.0.5/none     null                \\n4a6e627fc1dc        machine.1.ap-southeast-2.2.0.0.5/host     host                \\ne1b70f5af1c8        machine.1.ap-southeast-2.2.0.0.5/bridge   bridge              \\n1f5d449aca44        machine.1.ap-southeast-2.1.0.0.5/bridge   bridge              \\n",""]',
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