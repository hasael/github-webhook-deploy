
const index = require('./service/index');

exports.handler = function (event, context, callback) {
    var value = JSON.parse(JSON.stringify(event));
    var repoUrl = value.repository.html_url;
    var repoName = value.repository.name;

    index.deploy(repoUrl, repoName);

    const response = {
        statusCode: 200,
        body: JSON.stringify({ "message": 'Uploaded repsitory ' + repoUrl })
    };
    callback(null, response);
};