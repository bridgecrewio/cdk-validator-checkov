import { cdk } from 'projen';
const project = new cdk.JsiiProject({
  author: 'gruebel',
  authorAddress: 'anton.gruebel@gmail.com',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: 'cdk-validator-checkov',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/anton.gruebel/cdk-validator-checkov.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();