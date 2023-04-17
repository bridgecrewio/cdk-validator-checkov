import * as fs from 'fs';
import * as path from 'path';
import {
  App,
  Stack,
  aws_s3 as s3,
  PolicyViolationBeta1,
} from 'aws-cdk-lib';
import { PluginReportJson } from 'aws-cdk-lib/core/lib/validation/private/report';
import { CheckovValidator } from '../src';


beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});
describe('CheckovValidator', () => {
  test('synth succeeds', () => {
    // GIVEN
    const app = new App({
      policyValidationBeta1: [
        new CheckovValidator(),
      ],
      context: {
        '@aws-cdk/core:validationReportJson': true,
      },
    });

    // WHEN
    const stack = new Stack(app, 'Stack');
    new s3.Bucket(stack, 'Bucket', {});
    new s3.Bucket(stack, 'BucketBlockPublicAccess', {
      blockPublicAccess: {
        blockPublicAcls: true,
        blockPublicPolicy: true,
        ignorePublicAcls: true,
        restrictPublicBuckets: true,
      },
    });

    // THEN
    expect(() => {
      app.synth();
    }).not.toThrow();
    const report = JSON.parse(fs.readFileSync(path.join(app.outdir, 'policy-validation-report.json')).toString('utf-8').trim());
    const rules = Object.fromEntries(
      report.pluginReports.flatMap((r: PluginReportJson) => r.violations).map((v: PolicyViolationBeta1) => [v.ruleName, v.violatingResources]),
    );
    expect(Object.keys(rules)).toEqual(expect.arrayContaining([
      'CKV_AWS_18',
      'CKV_AWS_21',
      'CKV_AWS_53',
      'CKV_AWS_54',
      'CKV_AWS_55',
      'CKV_AWS_56',
    ]));
    expect(rules.CKV_AWS_18).toHaveLength(2);
    expect(rules.CKV_AWS_53).toHaveLength(1); // only resource Bucket, because it doesn't configure 'blockPublicAccess'
  });

  test('synth succeeds with check property', () => {
    // GIVEN
    const app = new App({
      policyValidationBeta1: [
        new CheckovValidator({
          check: ['CKV_AWS_18', 'CKV_AWS_21'],
        }),
      ],
      context: {
        '@aws-cdk/core:validationReportJson': true,
      },
    });

    // WHEN
    const stack = new Stack(app, 'Stack');
    new s3.Bucket(stack, 'Bucket', {});

    // THEN
    expect(() => {
      app.synth();
    }).not.toThrow();
    const report = JSON.parse(fs.readFileSync(path.join(app.outdir, 'policy-validation-report.json')).toString('utf-8').trim());
    const rules = Object.fromEntries(
      report.pluginReports.flatMap((r: PluginReportJson) => r.violations).map((v: PolicyViolationBeta1) => [v.ruleName, v.violatingResources]),
    );
    expect(Object.keys(rules).sort()).toEqual([
      'CKV_AWS_18',
      'CKV_AWS_21',
    ].sort());
  });

  test('synth succeeds with skipCheck property', () => {
    // GIVEN
    const app = new App({
      policyValidationBeta1: [
        new CheckovValidator({
          skipCheck: ['CKV_AWS_18', 'CKV_AWS_21'],
        }),
      ],
      context: {
        '@aws-cdk/core:validationReportJson': true,
      },
    });

    // WHEN
    const stack = new Stack(app, 'Stack');
    new s3.Bucket(stack, 'Bucket', {});

    // THEN
    expect(() => {
      app.synth();
    }).not.toThrow();
    const report = JSON.parse(fs.readFileSync(path.join(app.outdir, 'policy-validation-report.json')).toString('utf-8').trim());
    const rules = Object.fromEntries(
      report.pluginReports.flatMap((r: PluginReportJson) => r.violations).map((v: PolicyViolationBeta1) => [v.ruleName, v.violatingResources]),
    );
    expect(Object.keys(rules)).toEqual(expect.arrayContaining([
      'CKV_AWS_53',
      'CKV_AWS_54',
      'CKV_AWS_55',
      'CKV_AWS_56',
    ]));
    expect(Object.keys(rules)).not.toContain('CKV_AWS_18');
    expect(Object.keys(rules)).not.toContain('CKV_AWS_21');
  });

  test('synth succeeds when stack is empty', () => {
    // GIVEN
    const app = new App({
      policyValidationBeta1: [
        new CheckovValidator(),
      ],
      context: {
        '@aws-cdk/core:validationReportJson': true,
      },
    });

    // WHEN
    new Stack(app, 'Stack');

    // THEN
    expect(() => {
      app.synth();
    }).not.toThrow();
    const report = JSON.parse(fs.readFileSync(path.join(app.outdir, 'policy-validation-report.json')).toString('utf-8').trim());
    expect(report.pluginReports).toHaveLength(0);
  });
});