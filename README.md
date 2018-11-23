<p align="center">
  <img src="https://github.com/CVarisco/gitlab-merge/blob/master/docs/logo.png" width="500" alt="gitlab-merge"/>
</p>

<p align="center">
<strong align="center">First Gitlab CLI to create your merge request from terminal</strong>
</p><br>
<p align="center">

[![npm version](https://badge.fury.io/js/gitlab-merge.svg)](https://badge.fury.io/js/gitlab-merge)
[![Code Climate](https://codeclimate.com/github/CVarisco/gitlab-merge/badges/gpa.svg)](https://codeclimate.com/github/CVarisco/gitlab-merge)
[![npm](https://img.shields.io/npm/dw/gitlab-merge.svg)](https://www.npmjs.com/package/gitlab-merge)
[![Build Status](https://travis-ci.org/CVarisco/gitlab-merge.svg?branch=master)](https://travis-ci.org/CVarisco/gitlab-merge)

</p>

<p align="center">
  <img src="https://github.com/CVarisco/gitlab-merge/blob/master/docs/gitlab-merge-example.gif" alt="gitlab-merge" width="1024" />
</p>

## Install

```sh
$ npm install -g gitlab-merge
```

## Usage

Create your configuration file.
`gitlab-merge` uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) for configuration file support.
This means you can configure cca via:

- A `.ccarc` file, written in YAML or JSON, with optional extensions: `.yaml/.yml/.json`.
- A `cca.config.js` file that exports an object.
- A `"cca"` key in your `package.json` file.

The configuration file will be resolved starting from the root of your project,
and searching up the file tree until a config file is (or isn't) found.

```json
{
  "api_link": "https://gitlab.example.com/api/v4/",
  "private_token": "XXX"
}
```

Launch from terminal:

```sh
$ cd ~/my-projects
$ gitlab-merge
```

### Configuration

Currently supported options are:

| Option          | Description                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `api_link`      | Default type of the component                                                                                             |
| `private_token` | Default path to get the templates from the custom templates folder                                                        |
| `project_id`    | Default path to create component file and folder                                                                          |
| `source_branch` | Default extension for your javascript file `["js", "jsx"]`                                                                |
| `target_branch` | Default extension for your css file `["css", "scss", "sass", "less", false]`. Set to false if you don't want a style file |
| `title`         | Default flag to include a test file in the folder `[true, false]`                                                         |
| `description`   | Default flag to include a storybook file in the folder `[true, false]`                                                    |

### Where can I find the project id in Gitlab?

## Contributing

Check the [issue list](https://github.com/CVarisco/gitlab-merge/issues) to contribute on some activities or to advice new features!
The library is open to everybody, contribute improve your skills.

`gitlab-merge` is maintained under [the Semantic Versioning guidelines](http://semver.org/).

Use `npm run watch` while coding.

### [Contributors](https://github.com/CVarisco/gitlab-merge/graphs/contributors)

## License

MIT © [Christian Varisco](https://github.com/CVarisco)
