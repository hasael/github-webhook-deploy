const archiver = require('archiver');
const fs = require('fs');
const s3 = require('./S3Save');

exports.zipAndUpload = (dirname, outputName) => {

    var output = fs.createWriteStream(outputName);
    var archive = archiver('zip');

    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
        s3.saveToS3('/tmp/ToDeploy.zip', 'ToDeploy.zip');
    });

    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);
    archive.directory(dirname + '/', false);
    archive.finalize();
}