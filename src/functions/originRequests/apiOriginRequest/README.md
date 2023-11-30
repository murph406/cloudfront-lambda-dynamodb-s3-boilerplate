## Auth Origin Request

This Lambda function is configured as an Edge function on the CloudFront distribution, specifically handling origin requests made to the path `/api*`.

### Purpose

Within the current CloudFront distribution stack, an origin is set up to direct requests made to the path `/api*` to the Backend Lambda function's HTTP URL. This URL is protected with AWS Identity and Access Management (IAM) authentication (AWS_IAM). The primary goal of this Lambda function is to intercept incoming origin requests targeted at the `/api*` path, sign them using AWS Signature Version 4 (SigV4), and thereby ensure that the Lambda function is exclusively invoked from the CloudFront distribution.
