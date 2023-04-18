import {
  IPolicyValidationPluginBeta1,
  IPolicyValidationContextBeta1,
  PolicyValidationPluginReportBeta1,
} from 'aws-cdk-lib';
import { Report, processReport } from './report';
import { exec } from './utils';

export interface CheckovValidatorProps {
  /**
     * List of checks to run
     *
     * @default - all checks are run
     */
  readonly check?: string[];

  /**
     * List of checks to skip
     *
     * @default - no checks are skipped
     */
  readonly skipCheck?: string[];
}

/**
 * A validation plugin using checkov
 */
export class CheckovValidator implements IPolicyValidationPluginBeta1 {
  public readonly name: string;

  private readonly checkov: string;
  private readonly check: string[];
  private readonly skipCheck: string[];

  private templatePaths: string[] = [];

  constructor(props: CheckovValidatorProps = {}) {
    this.name = 'cdk-validator-checkov';

    this.checkov = 'checkov'; // possible improvement allow Docker usage
    this.check = props.check ?? [];
    this.skipCheck = props.skipCheck ?? [];
  }

  validate(context: IPolicyValidationContextBeta1): PolicyValidationPluginReportBeta1 {
    this.templatePaths = context.templatePaths;

    return this.execCheckov();
  }

  private execCheckov(): PolicyValidationPluginReportBeta1 {
    const flags = [
      '--framework',
      'cloudformation',
      'terraform_json',
      '--output',
      'json',
      '--soft-fail',
    ];

    this.templatePaths.forEach((templatePath) => {
      flags.push('-f');
      flags.push(templatePath);
    });

    if (this.check?.length) {
      flags.push('--check');
      flags.push(this.check.join(','));
    }

    if (this.skipCheck?.length) {
      flags.push('--skip-check');
      flags.push(this.skipCheck.join(','));
    }

    try {
      const report: Report = exec([this.checkov, ...flags], {
        json: true,
        env: {
          LOG_LEVEL: 'ERROR',
        },
      });

      return processReport(report);
    } catch (e) {
      console.error(`checkov plugin failed to scan the given templates. Error: ${e}`);

      return {
        success: false,
        violations: [],
      };
    }
  }
}
