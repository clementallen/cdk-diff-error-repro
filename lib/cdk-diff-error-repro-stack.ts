import * as cdk from 'aws-cdk-lib';
import { JsonSchemaType, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class CdkDiffErrorReproStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, 'api');

    api.root.addMethod('ANY');

    api.addModel('model', {
      modelName: 'model',
      schema: {
        properties: {
          // This property works
          id: {
            type: JsonSchemaType.STRING,
          },
          // After deploying, uncomment the below property to trigger the diff to fail
          // constructor: {
          //   type: JsonSchemaType.STRING,
          // }
        }
      }
    });
  }
}
