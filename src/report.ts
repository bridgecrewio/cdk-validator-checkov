import { PolicyViolationBeta1 } from 'aws-cdk-lib';
import { PolicyValidationPluginReportBeta1 } from 'aws-cdk-lib/core/lib/validation/report';

export interface Report {
  readonly check_type: string;
  readonly results: Results;
  readonly summary: Summary;
  readonly url: string;
}

interface Results {
  readonly passed_checks: Check[];
  readonly failed_checks: Check[];
  readonly skipped_checks: Check[];
  readonly parsing_errors: string[];
}

interface Check {
  // there are more fields, but not needed for the plugin report
  readonly check_id: string;
  readonly bc_check_id: string;
  readonly check_name: string;
  readonly details: string[];
  readonly file_abs_path: string;
  readonly guideline: string;
  readonly resource: string;
  readonly severity: string;
}

interface Summary {
  readonly passed: number;
  readonly failed: number;
  readonly skipped: number;
  readonly parsing_errors: number;
  readonly resource_count: number;
  readonly checkov_version: string;
}

export function processReport(report: Report): PolicyValidationPluginReportBeta1 {
  if ('checkov_version' in report) {
    // empty result
    return {
      pluginVersion: report.checkov_version as string,
      success: true,
      violations: [],
    };
  }

  const pluginVersion = report.summary.checkov_version;
  const success = report.summary.failed === 0;
  const violationsMap: Record<string, PolicyViolationBeta1> = {};

  report.results.failed_checks.forEach((check) => {
    const violation: PolicyViolationBeta1 = {
      ruleName: check.check_id,
      description: check.check_name,
      violatingResources: [{
        resourceLogicalId: check.resource.split('.').pop() as string,
        locations: [], // it is only available in the check itself
        templatePath: check.file_abs_path,
      }],
      fix: check.details.join('\n'),
      severity: check.severity,
      ruleMetadata: {
        DocumentationUrl: check.guideline,
      },
    };

    if (check.check_id in violationsMap) {
      violationsMap[check.check_id].violatingResources.push({
        resourceLogicalId: check.resource.split('.').pop() as string,
        locations: [],
        templatePath: check.file_abs_path,
      });
    } else {
      violationsMap[check.check_id] = violation;
    }
  });

  return {
    pluginVersion,
    success,
    violations: Object.values(violationsMap),
  };
}
