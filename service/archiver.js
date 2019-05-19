const archiver = require('archiver');
const fs = require('fs');
const s3 = require('./S3Save');

exports.zipAndUpload = (dirname, outputName, s3Key) => {

    var output = fs.createWriteStream(outputName);
    var archive = archiver('zip');

    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
        s3.saveToS3(outputName, s3Key);
    });

    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);
    archive.directory(dirname + '/', false);
    archive.finalize();
}