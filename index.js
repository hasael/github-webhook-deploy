    
const { spawnSync } = require('child_process');
const fs = require('fs');
const archive = require('./archiver');

exports.handler = async (event, context, callback) => {
    var value = JSON.parse(JSON.stringify(event));
    var repoUrl = value.repository.html_url;
    var repoName = value.repository.name;
    var tmpDir = '/tmp/' + repoName;

    await require('lambda-git')()
    const clone = spawnSync('git', ['clone', repoUrl], {
        cwd: '/tmp'
    });
    console.log(clone.output.toString());
    console.log(tmpDir)
    await archive.zipAndUpload(tmpDir, '/tmp/ToDeploy.zip');

    console.log('searching for tmp');
    fs.readdirSync(tmpDir).forEach(file => {
        console.log(file);
    });


};