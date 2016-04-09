# poosh
> Publish and sync local files to some remote endpoint

![alt tag](media/screenshot-publish.png)


## Short Example

Install the CLI and the S3 plugin:

```shell
> npm install -g poosh-cli poosh-plugin-s3
```

Create a .poosh.json5 file (yep it's [json5](http://json5.org/)) at the root of your project:

```json5
{
  plugins : ["s3"],
  baseDir : "./deploy",
  remote  : "s3-us-west-2.amazonaws.com/my-bucket",

  each: [{
    headers   : { "cache-control": { cacheable: "public" } }
  }, {
    match     : "**/*.{html,css,js}",
    gzip      : true,
    headers   : { "cache-control": { maxAge: "48 hours" } }
  }, {
    match     : "**/*.{jpg,png,gif,ico}",
    gzip      : false,
    headers   : { "cache-control": { maxAge: "6 months" } }
  }, {
    match     : "**/*.html",
    priority  : -1
  }]
}
```

You can now upload:

```shell
> poosh
```

Or sync if you want to delete remote files that are locally missing:

```shell
> poosh sync
```

## Options

| Option       | Default | Description
| ------------ | ------- | -------------
| plugins      | `[]`    | List of plugins to load and use. A single plugin is designed by it's package name (with or without it's `poosh-plugin-` prefix).
| baseDir      | `null`  | The base directory of local files. This path can either be absolute or relative (to the configuration file).
| remote       | `null`  | The remote client or a key/value map of remote clients to use for processing files.
| concurrency  | `3`     | File processing concurrency.
| each         | `[]`    | List of items used to select and process local files. Available options are described in the [each section](#each).

### Each

All "each" items are applied to files **in order**. Same options are overriden by the last one.

| Option       | Default     | Description
| ------------ | ----------- | -------------
| match        | `null`      | A [glob](https://github.com/jonschlinkert/micromatch#features) used to match files. If not specified, other options will be applied to all files without marking them as "to be processed".
| priority     | `null`      | Greatest numbers are processed first.
| gzip         | `false`     | If true, will gzip the file in remote destination.
| headers      | `[]`        | List of [headers options](#headers).
| remote       | `"default"` | The [key of the remote client](#options) to use. Or an object with an `id` key and some other ones that will define specific remote client options.

### Headers

Options used to control file's HTTP headers.

<table>
  <tr>
    <th>Option</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>cache-control</td>
    <td>`null`</td>
    <td>
      String or object. The object can be a combination of the following keys:
      <ul>
        <li>**maxAge**: A number (of seconds) or a string that will be parsed by [ms](https://github.com/rauchg/ms.js). For example `"60 days"`, `"2.5 hrs"`, `"1 month"`, `"2h"`, etc.</li>
        <li>**cacheable**: Can be one of the following values: `null`, `"public"`, `"private"`, `"no-cache"`.</li>
        <li>**noTransform**: Boolean.</li>
      </ul>
      All those keys are `null` by default.
    </td>
  </tr>
  <tr>
    <td>content-disposition</td>
    <td>`null`</td>
    <td>String.</td>
  </tr>
  <tr>
    <td>content-encoding</td>
    <td>`null`</td>
    <td>Content-encoding header is automatically generated at runtime, but this option force the header to a specific value.</td>
  </tr>
  <tr>
    <td>content-language</td>
    <td>`null`</td>
    <td>String.</td>
  </tr>
  <tr>
    <td>content-length</td>
    <td>`null`</td>
    <td>Number. Content-length header is automatically generated at runtime, but this option force the header to a specific value.</td>
  </tr>
  <tr>
    <td>content-md5</td>
    <td>`null`</td>
    <td>String.</td>
  </tr>
  <tr>
    <td>content-type</td>
    <td>`null`</td>
    <td>Content-type header is automatically generated at runtime, but this option force the header to a specific value.</td>
  </tr>
  <tr>
    <td>expires</td>
    <td>`null`</td>
    <td>String.</td>
  </tr>
  <tr>
    <td>location</td>
    <td>`null`</td>
    <td>String.</td>
  </tr>
</table>


## License

The MIT License (MIT)

Copyright (c) 2016 Yves Merlicco

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
