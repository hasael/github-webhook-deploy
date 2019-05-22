
const { spawnSync } = require('child_process');
const fs = require('fs');
const archive = require('./archiver');
const path = require("path");
exports.deploy = async (repoUrl, repoName) => {

    var tmpDir = '/tmp/' + repoName;
    if (fs.existsSync(tmpDir)) {
        rmDir(tmpDir);
    }
  
    await require('lambda-git')()
    const clone = spawnSync('git', ['clone', repoUrl], {
        cwd: '/tmp'
    });
    
    console.log(clone.output.toString());

    await archive.zipAndUpload(tmpDir, '/tmp/ToDeploy.zip', 'ToDeploy.zip');

    logDirecotoryFiles(tmpDir);
};
function rmDir(dir) {
    var list = fs.readdirSync(dir);
    for(var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
        var stat = fs.statSync(filename);

        if(filename == "." || filename == "..") {
            // pass these files
        } else if(stat.isDirectory()) {
            // rmdir recursively
            rmdir(filename);
        } else {
            // rm fiilename
            fs.unlinkSync(filename);
        }
    }
    fs.rmdirSync(dir);
};
function logDirecotoryFiles(dir) {

    console.log('searching for ' + dir);
    fs.readdirSync(dir).forEach(file => {
        console.log(file);
    });
}