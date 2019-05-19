var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var fs = require('fs');

exports.saveToS3 = (localFileName, key) => {
    var s3 = new AWS.S3();
    console.log("Start uploading file to S3");

    fs.readFile(localFileName, function (err, data) {
        if (err) throw err;
        var param = { Bucket: 'hasael-code-to-deploy', Key: key, Body: data };
        console.log('Data length ' + data.length);
        s3.upload(param, function (err, data) {

            // Whether there is an error or not, delete the temp file
            fs.unlink(localFileName, function (err) {
                if (err) console.error(err);
                console.log('Temp File Delete');
            });

            if (err) console.log(err, err.stack);
            else console.log('Successfully uploaded data');
        });
    });
}