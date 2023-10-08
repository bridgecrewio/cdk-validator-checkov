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

# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### CheckovValidatorProps <a name="CheckovValidatorProps" id="@bridgecrew/cdk-validator-checkov.CheckovValidatorProps"></a>

#### Initializer <a name="Initializer" id="@bridgecrew/cdk-validator-checkov.CheckovValidatorProps.Initializer"></a>

```typescript
import { CheckovValidatorProps } from '@bridgecrew/cdk-validator-checkov'

const checkovValidatorProps: CheckovValidatorProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@bridgecrew/cdk-validator-checkov.CheckovValidatorProps.property.check">check</a></code> | <code>string[]</code> | List of checks to run. |
| <code><a href="#@bridgecrew/cdk-validator-checkov.CheckovValidatorProps.property.skipCheck">skipCheck</a></code> | <code>string[]</code> | List of checks to skip. |

---

##### `check`<sup>Optional</sup> <a name="check" id="@bridgecrew/cdk-validator-checkov.CheckovValidatorProps.property.check"></a>

```typescript
public readonly check: string[];
```

- *Type:* string[]
- *Default:* all checks are run

List of checks to run.

---

##### `skipCheck`<sup>Optional</sup> <a name="skipCheck" id="@bridgecrew/cdk-validator-checkov.CheckovValidatorProps.property.skipCheck"></a>

```typescript
public readonly skipCheck: string[];
```

- *Type:* string[]
- *Default:* no checks are skipped

List of checks to skip.

---

## Classes <a name="Classes" id="Classes"></a>

### CheckovValidator <a name="CheckovValidator" id="@bridgecrew/cdk-validator-checkov.CheckovValidator"></a>

- *Implements:* aws-cdk-lib.IPolicyValidationPluginBeta1

A validation plugin using checkov.

#### Initializers <a name="Initializers" id="@bridgecrew/cdk-validator-checkov.CheckovValidator.Initializer"></a>

```typescript
import { CheckovValidator } from '@bridgecrew/cdk-validator-checkov'

new CheckovValidator(props?: CheckovValidatorProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@bridgecrew/cdk-validator-checkov.CheckovValidator.Initializer.parameter.props">props</a></code> | <code><a href="#@bridgecrew/cdk-validator-checkov.CheckovValidatorProps">CheckovValidatorProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@bridgecrew/cdk-validator-checkov.CheckovValidator.Initializer.parameter.props"></a>

- *Type:* <a href="#@bridgecrew/cdk-validator-checkov.CheckovValidatorProps">CheckovValidatorProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@bridgecrew/cdk-validator-checkov.CheckovValidator.validate">validate</a></code> | The method that will be called by the CDK framework to perform validations. |

---

##### `validate` <a name="validate" id="@bridgecrew/cdk-validator-checkov.CheckovValidator.validate"></a>

```typescript
public validate(context: IPolicyValidationContextBeta1): PolicyValidationPluginReportBeta1
```

The method that will be called by the CDK framework to perform validations.

This is where the plugin will evaluate the CloudFormation
templates for compliance and report and violations

###### `context`<sup>Required</sup> <a name="context" id="@bridgecrew/cdk-validator-checkov.CheckovValidator.validate.parameter.context"></a>

- *Type:* aws-cdk-lib.IPolicyValidationContextBeta1

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@bridgecrew/cdk-validator-checkov.CheckovValidator.property.name">name</a></code> | <code>string</code> | The name of the plugin that will be displayed in the validation report. |

---

##### `name`<sup>Required</sup> <a name="name" id="@bridgecrew/cdk-validator-checkov.CheckovValidator.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the plugin that will be displayed in the validation report.

---



