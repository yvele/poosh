# eslint-config-poosh
> [Poosh](https://github.com/yvele/poosh) command line interface (cli)

## Options

```
Usage: poosh <command> [options]

Options:

  -h, --help              output usage information
  -w, --plugins [string]  comma separated plugins
  -r, --readonly [what]   read-only mode, can be remote, cache or both (default)
  -f, --force [what]      force mode, can be remote, cache or both (default)
  -v, --verbose           get more detailled output on every files
  -q, --quiet             quiet operations
  -V, --version           output the version number

Commands:

  upload [options]        default command
  sync [options]

Examples:

  $ poosh --readonly remote --force cache
  $ poosh sync -v
```
