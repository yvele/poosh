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
    match     : "**/*.{html}",
    priority  : -1
  }]
}
```

You can now publish:

```shell
> poosh
```

Or sync if you want to delete remote files that are locally missing:

```shell
> poosh sync
```

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
