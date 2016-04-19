# poosh-plugin-header-location-from-html

> [Poosh](https://github.com/yvele/poosh) plugin that generates location HTTP headers from HTML content

[![npm version](https://badge.fury.io/js/poosh-cli.svg)](https://badge.fury.io/js/poosh-plugin-header-location-from-html)

## Sample

If your local looks like that:

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

Then the plugin will automatically generates a location HTTP header for it.

## Dependencies

* [cheerio](https://github.com/cheeriojs/cheerio)
