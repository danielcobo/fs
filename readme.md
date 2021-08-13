# fs

[Write](#make), [read](#read), [clone](#clone-aka-copy--paste) and [remove](#remove-aka-delete) files and folders without much thinking.

The built-in NodeJS `fs` module is often too broad and low-level. Unlike the native `fs` or other packages `@danielcobo/fs` comes with useful defaults and just a handful of methods to learn.

## 🧭 Table of contents

- [✨ Benefits](#-benefits)
- [🎒 Requierments](#-requierments)
- [🚀 Quickstart](#-quickstart)
- [📘 Documentation](#-documentation)
- [🆘 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [🧪 Testing](#-testing)
- [⚖️ License](#️-license)

## ✨ Benefits

- [x] Only a few methods to remember
- [x] Uses `async/await`
- [x] Includes tests
- [x] MIT license

## 🎒 Requierments

To use this package you will need:

- [NodeJS](https://nodejs.org/en/)
- Knowledge of [`async/await`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) or [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) handling

## 🚀 Quickstart

### Install

```cli
npm install @danielcobo/fs
```

<sub>**Note:** In case you're wondering, **@danielcobo/** is just a [namespace scope](https://docs.npmjs.com/about-scopes/) - an NPM feature. Scopes make it easier to name modules and improve [security](https://github.blog/2021-02-12-avoiding-npm-substitution-attacks/).</sub>

### Require the module

```js
const fs = require('@danielcobo/fs');
```

### Make

```js
//Make a directory
await fs.mk('./some/folder');

//Make a file (including any missing path directories)
const path = './some/other/folder/helloworld.txt';
const content = '@danielcobo/fs is awesome!';
await fs.mk(path, content);
```

<sub>**Note:** we use the **same method for directories and files**. We can do that with all the methods. Less to remember, yay!</sub>

### Read

```js
//Read directory subpaths
const tree = await fs.read('./some');

console.log(tree);
/*
{
    dirs: [folder, other/folder],
    files:[other/folder/helloworld.txt]
}
*/

//Read a file
const path = './some/other/folder/helloworld.txt';
const content = await fs.read(path);

console.log(content); //@danielcobo/fs is awesome!
```

### Clone (aka. copy & paste)

```js
//Clone a directory and all it's contents
const original = './some/folder';
const clone = './some/clone/folder';
await fs.clone(original, clone);

//Clone a file
const originalFile = './some/other/folder/helloworld.txt';
const cloneFile = './some/other/clone/folder/helloworld.txt';
await fs.clone(originalFile, cloneFile);
```

### Remove (aka. delete)

```js
//Remove a directory and all it's contents
await fs.rm('./some/folder');

//Remove a file
await fs.rm('./some/other/folder/helloworld.txt');
```

For details see documentation below.

## 📘 Documentation

### .mk()

Write a file or create a directory path.

| Param     | Type                 | Default  | Description                                                                                                                |
| --------- | -------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| mkPath    | `string`             |          | path to write to                                                                                                           |
| content   | `string`             |          | file text content (ignored for directory)                                                                                  |
| [options] | `string` \| `Object` | `'utf8'` | encoding, mode, flag, signal. See [NodeJS docs](https://nodejs.org/api/fs.html#fs_fspromises_writefile_file_data_options). |

### .make()

Alias of [.mk()](#mk)

### .read()

Read file or directory.

| Param     | Type                          | Default  | Description                                                                                                          |
| --------- | ----------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| readPath  | `string` \| `Array.<string>` |          | path to read                                                                                                         |
| [options] | `string` \| `Object`          | `'utf8'` | encoding, mode, flag, signal. See [NodeJS docs](https://nodejs.org/api/fs.html#fs_fspromises_readfile_path_options). |

| Returns     | Type     | Description                                                                |
| ----------- | -------- | -------------------------------------------------------------------------- |
| tree        | `Tree`   | Tree object containing paths within given tree/s. See [Tree](#tree--object) |

### .clone()

Clone file or directory.

| Param           | Type     | Description   |
| --------------- | -------- | ------------- |
| originalPath    | `string` | original path |
| destinationPath | `string` | clone path    |

### .rm()

Remove file or directory.

| Param  | Type     | Description                                    |
| ------ | -------- | ---------------------------------------------- |
| rmPath | `string` | path to remove - can be file or directory path |

### .remove()

Alias of [.rm()](#rm)

### Tree : `Object`

Paths within a given tree

| Name       | Type             | Description                          |
| ---------- | ---------------- | ------------------------------------ |
| dirs       | `Array.<string>` | paths of subdirectories              |
| files      | `Array.<string>` | filepaths                            |
| root       | `Array.<string>` | path/s of tree/s being read          |
| prunedTree | `prunedTree`     | see [prunedTree](#prunedtree--object) |

### PrunedTree : `Object`

Tree subpaths without root path

| Name  | Type             | Description                               |
| ----- | ---------------- | ----------------------------------------- |
| dirs  | `Array.<string>` | paths of subdirectories without root path |
| files | `Array.<string>` | filepaths without root path               |

## 🆘 Troubleshooting

Remember `await` must be used inside an `async function` unless:

- you add `"type":"module"` to your project's `package.json`.
- change the file extension to `.mjs`
- wrap any code using `await` into an asynchronous immediately invoked function expression (my gosh that's a mouthful..). Example:

```js
(async function () {
  //Code using await goes here
})();
```

The reason for these acrobatics is top-level `await` works in [ECMAScript modules](https://nodejs.org/api/esm.html#esm_modules_ecmascript_modules). However, [NodeJS uses CommonJS modules](https://nodejs.org/api/packages.html#packages_determining_module_system) by default. Adding `"type":"module"` to your project's `package.json` makes NodeJS parse all your `.js` files as ECMAScript modules. If you want it to only parse individual files as ECMAScript modules, you can do so by giving them an `.mjs` extension.

## 🤝 Contributing

### Anyone can contribute

Contributions come in many shapes and sizes. All are welcome.
You can contribute by:

- asking questions
- suggesting features
- sharing this repo with friends
- improving documentation (even fixing typos counts 😉)
- providing tutorials (if you do, please [let me know](https://twitter.com/danielcobocom), I would love to read them)
- improving tests
- contributing code (new features, performance boosts, code readability improvements..)

### Rules for contributions

**General guidelines:**

- there are no dumb questions
- be polite and respectful to others
- do good

**When coding remember:**

- working > maintainability > performance
- best code is no code
- be descriptive when naming
- keep it [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
- do test

**Contribution licence:**
All contributions are considered to be under same [license](#license) as this repository.

## 🧪 Testing

**Testing suite:** [🃏 Jest](https://jestjs.io) | **Test command:** `npm test`

**Mutation testing suite:** [👽 Stryker Mutator](https://stryker-mutator.io) | **Mutation test command:** `npm run mutation`

If you intend to develop further or contribute code, then please ensure to write and use testing. Strive for 100% code coverage and high mutation scores. Mutation score 100 is great, but it's not always neccessary (if there are valid reasons).

## ⚖️ License

[MIT License](https://github.com/danielcobo/fs/blob/master/LICENSE.md)
