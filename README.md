<p align="center">
  <img src="https://github.com/CVarisco/gitlab-merge/blob/master/docs/logo.png" width="500" alt="gitlab-merge"/>
</p>

<p align="center">
<strong align="center">First Gitlab guided CLI to create your merge request from terminal</strong>
</p>

<br>

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

- A `.gitlab-mergerc` file, written in YAML or JSON, with optional extensions: `.yaml/.yml/.json`.
- A `gitlab-merge.config.js` file that exports an object.
- A `"gitlab-merge"` key in your `package.json` file.

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

| Option          | Description                                                                                                                                                                                                                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_link`      | **Mandatory** Api link of the gitlab host                                                                                                                                                                                                                                                                       |
| `private_token` | **Mandatory** Your private token generated from gitlab. [Where can I generate the private token?](#where-can-i-generate-the-private-token?)                                                                                                                                                                     |
| `project_id`    | Optional Project id for the destionation of the merge request. If you don't set the project_id in the configuration file the tool at the beginning fetch ALL the list of the project hosted to the api_link provided. [Where can I find the project id in Gitlab?](#where-can-i-find-the-project-id-in-gitlab?) |
| `source_branch` | Optional From which branch the merge request come from (default the local active branch)                                                                                                                                                                                                                        |
| `target_branch` | Optional Target branch to merge changes                                                                                                                                                                                                                                                                         |
| `title`         | Optional Title of the merge request                                                                                                                                                                                                                                                                             |
| `description`   | Optional Description of the merge request                                                                                                                                                                                                                                                                       |

### Where can I generate the private token?

Very simple! go to your user settings in Gitlab at ´https://XXXXXXX/profile´

<p align="center">
  <img src="https://github.com/CVarisco/gitlab-merge/blob/master/docs/api_token.png" alt="gitlab-merge" width="1024" />
</p>

### Where can I find the project id in Gitlab?

You can find the project id of your project in the details tab of the repo.

<p align="center">
  <img src="https://github.com/CVarisco/gitlab-merge/blob/master/docs/project_id.png" alt="gitlab-merge" width="1024" />
</p>

## Contributing

Check the [issue list](https://github.com/CVarisco/gitlab-merge/issues) to contribute on some activities or to advice new features!
The library is open to everybody, contribute improve your skills.

`gitlab-merge` is maintained under [the Semantic Versioning guidelines](http://semver.org/).

Use `npm run watch` while coding.

### [Contributors](https://github.com/CVarisco/gitlab-merge/graphs/contributors)

## License

MIT © [Christian Varisco](https://github.com/CVarisco)
