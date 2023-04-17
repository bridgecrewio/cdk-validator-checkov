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



