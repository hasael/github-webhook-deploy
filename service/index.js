
const { spawnSync } = require('child_process');
const fs = require('fs');
const archive = require('./archiver');

exports.deploy = async (repoUrl, repoName) => {

    var tmpDir = '/tmp/' + repoName;

    await require('lambda-git')()
    const clone = spawnSync('git', ['clone', repoUrl], {
        cwd: '/tmp'
    });
    console.log(clone.output.toString());

    await archive.zipAndUpload(tmpDir, '/tmp/ToDeploy.zip');

    console.log('searching for tmp');
    fs.readdirSync(tmpDir).forEach(file => {
        console.log(file);
    });

};