# poosh-plugin-s3

> [Poosh](https://github.com/yvele/poosh) plugin that publishes files to AWS S3

[![npm version](https://img.shields.io/npm/v/poosh-plugin-s3.svg)](https://www.npmjs.com/package/poosh-plugin-s3)
[![source code](https://img.shields.io/badge/source%20code-master-blue.svg)](https://github.com/yvele/poosh/tree/master/packages/poosh-plugin-s3)

## Samples

A single default remote option with a [S3 endpoint][s3-endpoint] as a single string:

```json5
{
  plugins : ["s3"],
  baseDir : "./deploy",
  remote  : "s3-us-west-2.amazonaws.com/my-bucket/base-path",

  each : [{
    match : "**/*.{html,css,js,jpg,png}",
  }]
}
```

The same option expressed as an object:

```json5
{
  plugins : ["s3"],
  baseDir : "./deploy",

  remote  : {
    type      : "s3",
    region    : "us-west-2",
    bucket    : "my-bucket",
    basePath  : "base-path"
  },

  each : [{
    match : "**/*.{html,css,js,jpg,png}",
  }]
}
```

Complex sample with multiple remote options:

```json5
{
  plugins : ["s3"],
  baseDir : "./deploy",

  remote  : {
    "default": {
      type      : "s3",
      region    : "us-west-2",
      bucket    : "my-first-bucket",
      proxy     : "http://0.0.0.0:1331"
    },
    remoteId1: {
      type            : "s3",
      region          : "us-east-1",
      bucket          : "my-second-bucket",
      accessKeyId     : "...",
      secretAccessKey : "...",
      maxRetries      : 5,
      timeout         : "5 minutes"
    },
    remoteId2: "s3-us-west-2.amazonaws.com/my-bucket/base-path"
  },

  each : [{
    // Remote "remoteId1" will be used
    match   : "**/*.{html}",
    remote  : "remoteId1"
  }, {
    // Remote "remoteId2" will be used
    match   : "**/*.{css,js}",
    remote  : {
      id            : "remoteId2",
      acl           : "private",
      storageClass  : "REDUCED_REDUNDANCY"
    }
  }, {
    // Remote "default" will be used
    match   : "**/*.{jpg,png}"
  }]
}
```

## Dependencies

* [aws-sdk](https://github.com/aws/aws-sdk-js)

[s3-endpoint]: http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region
