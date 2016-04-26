# poosh-plugin-header-location-from-html

> [Poosh](https://github.com/yvele/poosh) plugin that generates location HTTP headers from HTML content

[![npm version](https://img.shields.io/npm/v/poosh-plugin-header-location-from-html.svg)](https://www.npmjs.com/package/poosh-plugin-header-location-from-html)
[![source code](https://img.shields.io/badge/source%20code-master-blue.svg)](https://github.com/yvele/poosh/tree/master/packages/poosh-plugin-header-location-from-html)

## Sample

With the following options:

```json5
{
  plugins: ["header-location-from-html"],
  each: [{
    match     : "**/*.html",
    headers   : { location: { fromContent: true } }
  }]
}
```

A local file looking like that:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="canonical" href="http://mysite.tld/posts/my-original-url"/>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <meta http-equiv="refresh" content="0;url=http://mysite.tld/posts/my-original-url"/>
  </head>
</html>
```

Will be uploaded with a `location` HTTP header set to `http://mysite.tld/posts/my-original-url`.

## Dependencies

* [cheerio](https://github.com/cheeriojs/cheerio)
