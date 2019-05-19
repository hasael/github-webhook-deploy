
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

    await archive.zipAndUpload(tmpDir, '/tmp/ToDeploy.zip', 'ToDeploy.zip');

    logDirecotoryFiles(tmpDir);
};

function logDirecotoryFiles(dir) {

    console.log('searching for ' + dir);
    fs.readdirSync(dir).forEach(file => {
        console.log(file);
    });
}