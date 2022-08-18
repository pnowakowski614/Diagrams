import { LocalShapesTypes, StencilGroups } from "../types/enums";

export const shapesConfig = {
    kinesisStream: {
        group: StencilGroups.analytics,
        label: "Kinesis Stream",
        link: "icons/Arch_Analytics/Arch_64/Arch_Amazon-Kinesis_64.svg",
        localType: LocalShapesTypes.node
    },
    redshift: {
        group: StencilGroups.analytics,
        label: "Redshift",
        link: "icons/Arch_Analytics/Arch_64/Arch_Amazon-Redshift_64.svg",
        localType: LocalShapesTypes.node
    },
    dataPipeline: {
        group: StencilGroups.analytics,
        label: "Data Pipeline",
        link: "icons/Arch_Analytics/Arch_64/Arch_AWS-Data-Pipeline_64.svg",
        localType: LocalShapesTypes.node
    },
    amazonSNS: {
        group: StencilGroups.appIntegration,
        label: "Amazon SNS",
        link: "icons/Arch_App-Integration/Arch_64/Arch_Amazon-Simple-Notification-Service_64.svg",
        localType: LocalShapesTypes.node
    },
    amazonSQS: {
        group: StencilGroups.appIntegration,
        label: "Amazon SQS",
        link: "icons/Arch_App-Integration/Arch_64/Arch_Amazon-Simple-Queue-Service_64.svg",
        localType: LocalShapesTypes.node
    },
    lambda: {
        group: StencilGroups.compute,
        label: "AWS Lambda",
        link: "icons/Arch_Compute/64/Arch_AWS-Lambda_64.svg",
        localType: LocalShapesTypes.node
    },
    batch: {
        group: StencilGroups.compute,
        label: "AWS Batch",
        link: "icons/Arch_Compute/64/Arch_AWS-Batch_64.svg",
        localType: LocalShapesTypes.node
    },
    autoScaling: {
        group: StencilGroups.compute,
        label: "Auto Scaling",
        link: "icons/Arch_Compute/64/Arch_Amazon-EC2-Auto-Scaling_64.svg",
        localType: LocalShapesTypes.autoScaling
    },
    ecsCluster: {
        group: StencilGroups.containers,
        label: "ECS Cluster",
        link: "icons/Arch_Containers/64/Arch_Amazon-Elastic-Container-Service_64.svg",
        localType: LocalShapesTypes.ecsCluster
    },
    ecsService: {
        group: StencilGroups.containers,
        label: "ECS Service",
        link: "icons/Arch_Containers/64/Arch_Amazon-Elastic-Container-Service_64.svg",
        localType: LocalShapesTypes.ecsService
    },
    aurora: {
        group: StencilGroups.database,
        label: "Aurora",
        link: "icons/Arch_Database/64/Arch_Amazon-Aurora_64.svg",
        localType: LocalShapesTypes.node
    },
    dynamoDB: {
        group: StencilGroups.database,
        label: "Dynamo DB",
        link: "icons/Arch_Database/64/Arch_Amazon-DynamoDB_64.svg",
        localType: LocalShapesTypes.node
    },
    appStream: {
        group: StencilGroups.endUser,
        label: "App Stream 2.0",
        link: "icons/Arch_End-User-Computing/64/Arch_Amazon-AppStream_64.svg",
        localType: LocalShapesTypes.node
    },
    workspaces: {
        group: StencilGroups.endUser,
        label: "Workspace",
        link: "icons/Arch_End-User-Computing/64/Arch_Amazon-WorkSpaces_64.svg",
        localType: LocalShapesTypes.node
    },
    cloudwatch: {
        group: StencilGroups.management,
        label: "CloudWatch",
        link: "icons/Arch_Management-Governance/64/Arch_Amazon-CloudWatch_64.svg",
        localType: LocalShapesTypes.node
    },
    cloudtrail: {
        group: StencilGroups.management,
        label: "CloudTrail",
        link: "icons/Arch_Management-Governance/64/Arch_AWS-CloudTrail_64.svg",
        localType: LocalShapesTypes.node
    },
    route53: {
        group: StencilGroups.networking,
        label: "Route 53",
        link: "icons/Arch_Networking-Content-Delivery/64/Arch_Amazon-Route-53_64.svg",
        localType: LocalShapesTypes.node
    },
    privateLink: {
        group: StencilGroups.networking,
        label: "PrivateLink",
        link: "icons/Arch_Networking-Content-Delivery/64/Arch_AWS-PrivateLink_64.svg",
        localType: LocalShapesTypes.node
    },
    securityGroup: {
        group: StencilGroups.groups,
        label: "Security",
        link: "icons/Arch_Security-Identity-Compliance/64/Arch_AWS-Security-Hub_64.svg",
        localType: LocalShapesTypes.securityGroup
    },
    vpcGroup: {
        group: StencilGroups.groups,
        label: "VPC",
        link: "icons/Arch_Security-Identity-Compliance/64/Arch_AWS-Security-Hub_64.svg",
        localType: LocalShapesTypes.vpc
    },
    waf: {
        group: StencilGroups.security,
        label: "WAF",
        link: "icons/Arch_Security-Identity-Compliance/64/Arch_AWS-WAF_64.svg",
        localType: LocalShapesTypes.node
    },
    shield: {
        group: StencilGroups.security,
        label: "Shield",
        link: "icons/Arch_Security-Identity-Compliance/64/Arch_AWS-Shield_64.svg",
        localType: LocalShapesTypes.node
    },
    securityHub: {
        group: StencilGroups.security,
        label: "Security Hub",
        link: "icons/Arch_Security-Identity-Compliance/64/Arch_AWS-Security-Hub_64.svg",
        localType: LocalShapesTypes.node
    },
    backup: {
        group: StencilGroups.storage,
        label: "Backup",
        link: "icons/Arch_Storage/64/Arch_AWS-Backup_64.svg",
        localType: LocalShapesTypes.node
    },
    snowball: {
        group: StencilGroups.storage,
        label: "Snowball",
        link: "icons/Arch_Storage/64/Arch_AWS-Snowball_64.svg",
        localType: LocalShapesTypes.node
    },
}