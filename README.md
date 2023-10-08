# CDK Checkov Validator Plugin

<!--BEGIN STABILITY BANNER-->

---

![cdk-constructs: Experimental](https://img.shields.io/badge/cdk--constructs-experimental-important.svg?style=for-the-badge)

> The APIs of higher level constructs in this module are experimental and under active development.
> They are subject to non-backward compatible changes or removal in any future version. These are
> not subject to the [Semantic Versioning](https://semver.org/) model and breaking changes will be
> announced in the release notes. This means that while you may use them, you may need to update
> your source code when upgrading to a newer version of this package.
---

<!--END STABILITY BANNER-->

## Installation

### TypeScript/JavaScript

```bash
npm install @bridgecrew/cdk-validator-checkov
```

### Python

```bash
pip install cdk-validator-checkov
```

## Usage

To use this plugin in your CDK application add it to the CDK App.

### Python

```python
from cdk_validator_checkov import CheckovValidator

...

App(
  policy_validation_beta1=[
    CheckovValidator()
  ]
)
```

By default, the `CheckovValidator` plugin comes with all `checkov`
[built-in checks for CloudFormation](https://www.checkov.io/5.Policy%20Index/cloudformation.html).
In order to disable any of the checks or just run a subset of them you can use the `check` or `skipCheck` property.

```python
CheckovValidator(
  check= ['CKV_AWS_18', 'CKV_AWS_21']
)
```

```python
CheckovValidator(
  skipCheck= ['CKV_AWS_18', 'CKV_AWS_21']
}
```


### TypeScript

```ts
new App({
  policyValidationBeta1: [
    new CheckovValidator(),
  ],
});
```

Specify checks:

```ts
new CheckovValidator({
    check: ['CKV_AWS_18', 'CKV_AWS_21'],
});
```

Skip checks:

```ts
new CheckovValidator({
    skipCheck: ['CKV_AWS_18', 'CKV_AWS_21'],
});
```

### Troubleshooting

If you are getting `Error: spawnSync checkov ENOBUFS` error, please try to set `CHECKOV_MAX_BUFFER_SIZE_MB` environment variable to numeric value above 1. It's setting `maxBuffer` parameter for `spawnSync` [function](https://nodejs.org/api/child_process.html#child_processspawnsynccommand-args-options) under the hood.
