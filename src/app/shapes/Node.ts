import { shapes } from '@clientio/rappid';

const nodeConfig = {
    kinesisStream: {
        label: "Kinesis Stream",
        link: "https://diagram.patchduty.com/assets/kinesisStream.898ccf1acbb638c31e4f58e2c4994318.svg"
    },
    redshift: {
        label: "Redshift",
        link: "https://diagram.patchduty.com/assets/redshift.d62784282398a27154911594fa99d32e.svg"
    },
    dataPipeline: {
        label: "Data Pipeline",
        link: "https://diagram.patchduty.com/assets/dataPipeline.788a11ff1fbaf7fe4f9130ff910ff6ef.svg"
    },
    amazonSNS: {
        label: "Amazon SNS",
        link: "https://diagram.patchduty.com/assets/sns.1f79b7b229dd55a42b9bb8c4a3be9f54.svg"
    },
    amazonSQS: {
        label: "Amazon SQS",
        link: "https://diagram.patchduty.com/assets/sqs.ceb674d395a77b6f750f157f00572152.svg"
    },
    lambda: {
        label: "AWS Lambda",
        link: "https://diagram.patchduty.com/assets/lambda.64fe7d6842f824c66a42fdbf53548d7e.svg"
    },
    batch: {
        label: "AWS Batch",
        link: "https://diagram.patchduty.com/assets/batch.f79e0fe4aace95060b544d133dc2e543.svg"
    },
    aurora: {
        label: "Aurora",
        link: "https://diagram.patchduty.com/assets/aurora.9cfedbf3dcd7761e9c0d0219976d10d1.svg"
    },
    dynamoDB: {
        label: "Dynamo DB",
        link: "https://diagram.patchduty.com/assets/dynamodb.c1b357224edb698266ed1bf0dc3d850c.svg"
    },
    appStream: {
        label: "App Stream 2.0",
        link: "https://diagram.patchduty.com/assets/appStream.1c320cbf13e58c4c79a1eff3d9341a19.svg"
    },
    workspaces: {
        label: "Workspace",
        link: "https://diagram.patchduty.com/assets/workspaces.9aea59c92d36e287db68ad10d6dc4741.svg"
    },
    cloudwatch: {
        label: "CloudWatch",
        link: "https://diagram.patchduty.com/assets/cloudWatch.bc4510f9559c11fef7f66dfd3c6bffc9.svg"
    },
    cloudtrail: {
        label: "CloudTrail",
        link: "https://diagram.patchduty.com/assets/cloudTrail.355ac1511296f38fa34bbff018d5d796.svg"
    },
    route53: {
        label: "Route 53",
        link: "https://diagram.patchduty.com/assets/route53.dbd7218ae667711036b0470c09c1e99d.svg"
    },
    privateLink: {
        label: "PrivateLink",
        link: "https://diagram.patchduty.com/assets/privateLink.b62d6ffb8cbfbb22082a2c888d479014.svg"
    },
    waf: {
        label: "WAF",
        link: "https://diagram.patchduty.com/assets/WAF.4180e71c17284b0c3984ba6c41cbead9.svg"
    },
    shield: {
        label: "Shield",
        link: "https://diagram.patchduty.com/assets/shield.dc5f2648866f40cd546efe8e62d68ea5.svg"
    },
    securityHub: {
        label: "Security Hub",
        link: "https://diagram.patchduty.com/assets/securityHub.d65289bd84131fcd5d34fcf5937ac089.svg"
    },
    backup: {
        label: "Backup",
        link: "https://diagram.patchduty.com/assets/backup.3a2a1aac578aa7a454bddda2efe8a7fb.svg"
    },
    snowball: {
        label: "Snowball",
        link: "https://diagram.patchduty.com/assets/snowball.1fd90a5ba540aba1ad97192f728a1661.svg"
    },

}

class Node extends shapes.standard.Rectangle {
    constructor(text: string, link: string) {
        super();
        this.size(45, 45);
        this.attr({
            label: {
                text,
                textAnchor: "right",
                refX: 60,
                fontSize: 14,
                fontWeight: "bold"
            },
            prop: {
                elementType: "Node"
            }
        });
        this.markup = [{
            tagName: 'rect',
            selector: 'body',
        },
            {
                tagName: 'text',
                selector: 'label'
            },
            {
                tagName: "image",
                selector: "icon",
                attributes: {
                    width: 45,
                    height: 45,
                    href: link,
                }
            }]
    }
}

//exports

export const kinesisStreamNode = new Node(
    nodeConfig.kinesisStream.label,
    nodeConfig.kinesisStream.link
);
export const redshiftNode = new Node(
    nodeConfig.redshift.label,
    nodeConfig.redshift.link
);
export const dataPipelineNode = new Node(
    nodeConfig.dataPipeline.label,
    nodeConfig.dataPipeline.link
);
export const amazonSNSNode = new Node(
    nodeConfig.amazonSNS.label,
    nodeConfig.amazonSNS.link
);
export const amazonSQSNode = new Node(
    nodeConfig.amazonSQS.label,
    nodeConfig.amazonSQS.link
);
export const lambdaNode = new Node(
    nodeConfig.lambda.label,
    nodeConfig.lambda.link
);
export const batchNode = new Node(
    nodeConfig.batch.label,
    nodeConfig.batch.link
);
export const auroraNode = new Node(
    nodeConfig.aurora.label,
    nodeConfig.aurora.link
);
export const dynamoDBNode = new Node(
    nodeConfig.dynamoDB.label,
    nodeConfig.dynamoDB.link
);
export const appStreamNode = new Node(
    nodeConfig.appStream.label,
    nodeConfig.appStream.link
);
export const workspacesNode = new Node(
    nodeConfig.workspaces.label,
    nodeConfig.workspaces.link
);
export const cloudwatchNode = new Node(
    nodeConfig.cloudwatch.label,
    nodeConfig.cloudwatch.link
);
export const cloudtrailNode = new Node(
    nodeConfig.cloudtrail.label,
    nodeConfig.cloudtrail.link
);
export const route53Node = new Node(
    nodeConfig.route53.label,
    nodeConfig.route53.link
);
export const privateLinkNode = new Node(
    nodeConfig.privateLink.label,
    nodeConfig.privateLink.link
);
export const wafNode = new Node(
    nodeConfig.waf.label,
    nodeConfig.waf.link
);
export const shieldNode = new Node(
    nodeConfig.shield.label,
    nodeConfig.shield.link
);
export const securityHubNode = new Node(
    nodeConfig.securityHub.label,
    nodeConfig.securityHub.link
);
export const backupNode = new Node(
    nodeConfig.backup.label,
    nodeConfig.backup.link
);
export const snowballNode = new Node(
    nodeConfig.snowball.label,
    nodeConfig.snowball.link
);
