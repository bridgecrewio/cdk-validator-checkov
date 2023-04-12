import { cdk } from 'projen';
import { NpmAccess } from 'projen/lib/javascript';
const project = new cdk.JsiiProject({
  author: 'bridgecrew',
  authorAddress: 'meet@bridgecrew.io',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: '@bridgecrew/cdk-validator-checkov',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/bridgecrewio/cdk-validator-checkov.git',
  keywords: [
    'cdk',
    'validator',
    'policy as code',
  ],
  npmAccess: NpmAccess.PUBLIC,
  release: true,
  publishToPypi: {
    distName: 'cdk-validator-checkov',
    module: 'cdk_validator_checkov',
  },
  devDeps: [
    'aws-cdk-lib@^2.73.0',
    'constructs',
  ],
  peerDeps: [
    'aws-cdk-lib@^2.73.0',
  ],
});

project.gitignore.exclude('.idea');

project.synth();