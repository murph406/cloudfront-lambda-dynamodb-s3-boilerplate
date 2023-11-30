# S3 Cloudfront Lambda API Boilerplate
A simple setup for a client-side and API applications with infrastructure using AWS S3, CloudFront, and Lambda. 

## Overview

A pre-configured setup for client-side and API infrastructure using AWS SAM (Serverless Application Model). Using AWS S3 for storage, CloudFront for content delivery, Lambda for serverless computing, and github actions with cloudformation for deployment. This boilerplate provides a lightweight template for deploying scalable and efficient web applications with proprietary API framework. Edit the codebase as needed for your custom needs. 

## Features
1. AWS Integration 
2. Serverless Architecture 
3. Scalable and Performant
4. Simple Deployment
5. Testing Environments
6. Directives
7. Encryption
8. Automated Testing Suite
9. Custom Headers configurations per testing environment 
10. Custom DynamoDb ORM
11. Custom Validations  
12. Robust Error Handling 

## Installation
1. Download repository and initialize a new repository in Github
2. Create a user in AWS IAM named cloudformation 
    1. Attach a policy with these **[permissions](https://gist.github.com/murph406/df07695fe33432f1a23610cb4694937d)**. 
    2. Create an access key and secret key and store in a safe place. 
3. Run in root of the project.
    1. `nvm use` - Set default node version. Click **[here](https://github.com/nvm-sh/nvm#intro)** for more info on nvm.
    2. `npm i` - Installs decencies for parent and child applications.
    3. `npm run script:setup` - Configure project and makes .env file in `src/api` directory.
4. If using Recaptcha 
    1. Go to google **[recaptcha console](https://developers.google.com/recaptcha)** and create a project. 
    2. Add any known subdomains
    3. Save public and private keys
5. Set environment variables in Github
    1. Make environments in github for application deployments named develop, stage, and main. Add variables to each environment. Default variables are defined in the generated `.env` file. 
        1. `RECAPTCHA_ENABLED` - Defaults to `false`.
    2. Add actions global variables. Default variables are defined in the generated `.env` file. 
        1. `AWS_ACCESS_KEY_ID` - Key created from cloudformation user.
        2. `AWS_SECRET_ACCESS_KEY` - Secret Key created from cloudformation user.
        3. `ENCRYPT_SECRET` - Generated from the setup script.
        4. `RECAPTCHA_SECRET`- Secret key created from recaptcha.
    3. Add actions global secrets. Default variables are defined in the generated `.env` file. 
        1. `PROJECT`
        2. `AWS_DEFAULT_REGION` - Defaults to `us-east-1`
        3. `RECAPTCHA_THRESHOLD` - Defaults to `0.5`. Click **[here](https://developers.google.com/recaptcha/docs/v3#interpreting_the_score)** for more info on the recaptcha threshold. 
6. Create staging branches and push to github
    1. `git checkout -b stage` and `git checkout -b develop`
    2. In the develop branch run
        1. `git .`
        2. `git commit -m 'init'`
        3. `git push origin -upstream develop`
7. Github actions will run and infrastructure will deploy. Once the pipeline finishes...
    1. Add the `DISTRIBUTION_ID` to the `develop` environment and set it to the new cloudfront distribution id. 
    2. Repeat steps 6 and 7 for the `stage` and main `branches`. 
8. Configure your client
    1. In the `src/client` directory is where the client is located and has a single html file as default.
    3. Add whatever web client-side framework you like. 
    4. Routing for the client is controlled from the origin request on cloudfront. The code lives in `src/functions/originRequests/clientOriginRequest`. 
    5. The routing default configuration is for a single page application. Change this function for your custom routing needs. 

<!-- ## Configuration
## Architecture
## Usage
## Deployment
## Credits
## Contact -->
