import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class FileConversionDynamoDbStack extends cdk.Stack {
constructor(scope: cdk.App, id: string, props?: cdk.StackProps){
    super(scope,id,props);

    const table = new dynamodb.Table(this,'FileConversionTable',{
        partitionKey: {name:'fileId',type: dynamodb.AttributeType.STRING},
        sortKey: { name: 'uploadTimestamp', type: dynamodb.AttributeType.NUMBER },
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        removalPolicy: cdk.RemovalPolicy.RETAIN,
        pointInTimeRecovery: true,
        encryption: dynamodb.TableEncryption.AWS_MANAGED,
    })

    table.addGlobalSecondaryIndex({
        indexName: 'UserIndex',
        partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
        sortKey: { name: 'uploadTimestamp', type: dynamodb.AttributeType.NUMBER },
        projectionType: dynamodb.ProjectionType.INCLUDE,
        nonKeyAttributes: ['fileName', 'status', 'convertedFileId'],
    })
}

}