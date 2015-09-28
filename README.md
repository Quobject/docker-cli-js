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