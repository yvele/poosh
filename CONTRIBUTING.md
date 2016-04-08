# Contributing to Poosh

 - [Issues and Bugs](#issue)
 - [Commit Message Guidelines](#commit)
 - [About](#about)

## <a name="issue"></a> Found an Issue?
If you find a bug in the source code or a mistake in the documentation, you can help us by
submitting an issue to the [GitHub Repository][https://github.com/yvele/poosh]. Even better you can submit a Pull Request with a fix.

## <a name="commit"></a> Git Commit Guidelines

Write meaningful and straightforward commit summaries.

```sh
# Bad
git commit assets -m 'change something' # ORLY? What change?

# Good
git commit assets -m 'style(css): Switch `reset.css` to `normalize.css`'
```

Avoid long commit summaries by limiting the maximum characters to `50`.

> Detailed descriptions should go on the commit message.

```sh
# Bad
git commit assets/javascripts -m 'Add `FIXME` note to dropdown module because it wasn't working on IE8'

# Good
git commit assets/javascripts -m 'style(dropdown): Add `FIXME` note to dropdown module'
```

Write commit summaries in the imperative, present tense.

```sh
# Bad
git commit scripts -m 'Fixed CI integration'

# Bad
git commit scripts -m 'Fixes CI integration'

# Bad
git commit scripts -m 'Fixing CI integration'

# Good
git commit scripts -m 'fix(ci): Fix CI integration'
```

Use proper english writing on commits.

> Because SCM is also code documentation.

```sh
# Bad (Everything in lower case, no proper punctuation and "whatever" really?)
git commit assets/stylesheets -m 'update clearfix or whatever'

# Bad (Why are you screaming?)
git commit assets/stylesheets -m 'UPDATE CLEARFIX'

# Good (Meaningful commit summary with proper orthography)
git commit assets/stylesheets -m 'fix(clearfix): Update clearfix implementation to use a more modern approach'
```

### Type

Must be one of the following:

| Prefix | Description |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
| `refactor ` | A code change that neither fixes a bug or adds a feature |
| `test` | Adding missing tests |
| `chore` | Changes to the build process or auxiliary tools and libraries such as documentation generation |

### Scope
The scope could be anything specifying place of the commit change. For example `readme`,
`package.json`, `OptionManager`, `docs/Components`, etc...

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

## <a name="about"></a>About

Thos rules have been inspired by AngularJS [contributing page](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md) and Netshoes [styleguide](https://github.com/netshoes/styleguide).
