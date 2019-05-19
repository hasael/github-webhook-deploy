# github-webhook-deploy
Lambda function called from a github webhook.
Actions:
- Pull repository
- Create a zip file
- Save the zip to S3

Dependencies
- npm install aws-sdk
- npm install lambda-git
- npm install archiver
