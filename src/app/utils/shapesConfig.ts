import { LocalShapesTypes, StencilGroups } from "../types/enums";

export const shapesConfig = {
    kinesisStream: {
        group: StencilGroups.analytics,
        label: "Kinesis Stream",
        link: "icons/Arch_Analytics/Arch_Amazon-Kinesis_64.svg",
        localType: LocalShapesTypes.node
    },
    redshift: {
        group: StencilGroups.analytics,
        label: "Redshift",
        link: "icons/Arch_Analytics/Arch_Amazon-Redshift_64.svg",
        localType: LocalShapesTypes.node
    },
    dataPipeline: {
        group: StencilGroups.analytics,
        label: "Data Pipeline",
        link: "icons/Arch_Analytics/Arch_AWS-Data-Pipeline_64.svg",
        localType: LocalShapesTypes.node
    },
    amazonSNS: {
        group: StencilGroups.appIntegration,
        label: "Amazon SNS",
        link: "icons/Arch_App-Integration/Arch_Amazon-Simple-Notification-Service_64.svg",
        localType: LocalShapesTypes.node
    },
    amazonSQS: {
        group: StencilGroups.appIntegration,
        label: "Amazon SQS",
        link: "icons/Arch_App-Integration/Arch_Amazon-Simple-Queue-Service_64.svg",
        localType: LocalShapesTypes.node
    },
    lambda: {
        group: StencilGroups.compute,
        label: "AWS Lambda",
        link: "icons/Arch_Compute/Arch_AWS-Lambda_64.svg",
        localType: LocalShapesTypes.node
    },
    batch: {
        group: StencilGroups.compute,
        label: "AWS Batch",
        link: "icons/Arch_Compute/Arch_AWS-Batch_64.svg",
        localType: LocalShapesTypes.node
    },
    autoScaling: {
        group: StencilGroups.compute,
        label: "Auto Scaling",
        link: "icons/Arch_Compute/Arch_Amazon-EC2-Auto-Scaling_64.svg",
        localType: LocalShapesTypes.autoScaling
    },
    ecsCluster: {
        group: StencilGroups.containers,
        label: "ECS Cluster",
        link: "icons/Arch_Containers/Arch_Amazon-Elastic-Container-Service_64.svg",
        localType: LocalShapesTypes.ecsCluster
    },
    ecsService: {
        group: StencilGroups.containers,
        label: "ECS Service",
        link: "icons/Arch_Containers/Arch_Amazon-Elastic-Container-Service_64.svg",
        localType: LocalShapesTypes.ecsService
    },
    aurora: {
        group: StencilGroups.database,
        label: "Aurora",
        link: "icons/Arch_Database/Arch_Amazon-Aurora_64.svg",
        localType: LocalShapesTypes.node
    },
    dynamoDB: {
        group: StencilGroups.database,
        label: "Dynamo DB",
        link: "icons/Arch_Database/Arch_Amazon-DynamoDB_64.svg",
        localType: LocalShapesTypes.node
    },
    appStream: {
        group: StencilGroups.endUser,
        label: "App Stream 2.0",
        link: "icons/Arch_End-User-Computing/Arch_Amazon-AppStream_64.svg",
        localType: LocalShapesTypes.node
    },
    workspaces: {
        group: StencilGroups.endUser,
        label: "Workspace",
        link: "icons/Arch_End-User-Computing/Arch_Amazon-WorkSpaces_64.svg",
        localType: LocalShapesTypes.node
    },
    cloudwatch: {
        group: StencilGroups.management,
        label: "CloudWatch",
        link: "icons/Arch_Management-Governance/Arch_Amazon-CloudWatch_64.svg",
        localType: LocalShapesTypes.node
    },
    cloudtrail: {
        group: StencilGroups.management,
        label: "CloudTrail",
        link: "icons/Arch_Management-Governance/Arch_AWS-CloudTrail_64.svg",
        localType: LocalShapesTypes.node
    },
    route53: {
        group: StencilGroups.networking,
        label: "Route 53",
        link: "icons/Arch_Networking-Content-Delivery/Arch_Amazon-Route-53_64.svg",
        localType: LocalShapesTypes.node
    },
    privateLink: {
        group: StencilGroups.networking,
        label: "PrivateLink",
        link: "icons/Arch_Networking-Content-Delivery/Arch_AWS-PrivateLink_64.svg",
        localType: LocalShapesTypes.node
    },
    securityGroup: {
        group: StencilGroups.groups,
        label: "Security",
        link: "icons/Arch_Security-Identity-Compliance/Arch_AWS-Security-Hub_64.svg",
        localType: LocalShapesTypes.securityGroup
    },
    vpcGroup: {
        group: StencilGroups.groups,
        label: "VPC",
        link: "icons/Arch_Security-Identity-Compliance/Arch_AWS-Security-Hub_64.svg",
        localType: LocalShapesTypes.vpc
    },
    waf: {
        group: StencilGroups.security,
        label: "WAF",
        link: "icons/Arch_Security-Identity-Compliance/Arch_AWS-WAF_64.svg",
        localType: LocalShapesTypes.node
    },
    shield: {
        group: StencilGroups.security,
        label: "Shield",
        link: "icons/Arch_Security-Identity-Compliance/Arch_AWS-Shield_64.svg",
        localType: LocalShapesTypes.node
    },
    securityHub: {
        group: StencilGroups.security,
        label: "Security Hub",
        link: "icons/Arch_Security-Identity-Compliance/Arch_AWS-Security-Hub_64.svg",
        localType: LocalShapesTypes.node
    },
    backup: {
        group: StencilGroups.storage,
        label: "Backup",
        link: "icons/Arch_Storage/Arch_AWS-Backup_64.svg",
        localType: LocalShapesTypes.node
    },
    snowball: {
        group: StencilGroups.storage,
        label: "Snowball",
        link: "icons/Arch_Storage/Arch_AWS-Snowball_64.svg",
        localType: LocalShapesTypes.node
    },
}