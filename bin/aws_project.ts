#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {S3BucketStack} from '../lib/file_storage'
import {FileConversionDynamoDbStack} from '../lib/file_metadata'

const app = new cdk.App();
new S3BucketStack(app, 'S3BucketStack');
new FileConversionDynamoDbStack(app,'FileConversionTable')

