# god-cli [![npm](https://img.shields.io/npm/v/npm.svg?maxAge=2592000)](https://www.npmjs.com/package/god-cli)
Quickly create frontend automation project.

## Installation
``` bash
npm install god-cli -g
```

## Usage
```bash
god init <template-name> <project-name>
```

Example:
``` bash
god init webpack my-project
```

## Template
### List official Templates
```bash
god list
```
currently only support **webpack**.

### Use custom template
repository

The short hand repository string to download the repository from:
- GitHub - github:owner/name or simply owner/name
- GitLab - gitlab:owner/name
- Bitbucket - bitbucket:owner/name

```bash
god init owner/name <project-name>
```