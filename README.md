-   **How to deploy:**

```    -   git clone https://github.com/alaulwan/trailers_serverless.git ```

```    -   cd trailers_serverless/src/getTrailers ```

```    -   npm install --production ```

```    -   npm prune --production ```

```    -   cd ../.. ```

```    -   aws s3 mb s3://trailers-artifactory-dev  // Create S3 bucket. If youalready have one, you may use it```

```    -   mkdir -p cloudformation/dist ```

```    -   aws cloudformation package --template-file cloudformation/serverless.yaml --output-template-file cloudformation/dist/serverless.yaml --s3-bucket trailers-artifactory-dev --s3-prefix trailers-integration ```

```    -   aws cloudformation deploy --template-file cloudformation/dist/serverless.yaml --stack-name trailers-alaa-test --capabilities CAPABILITY_NAMED_IAM --tags Environment=dev Owner=beam Project=trailers --parameter-overrides Service=trailers Environment=dev ```
________________________________________________________________________________
API Example:

```    GET {aws_api_gateway}/trailers?viaplayLink=https://content.viaplay.se/pcdash-se/film/focus-2015 ```
