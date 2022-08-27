import { LocalShapesTypes, StencilGroups } from "../types/enums";

export const shapesConfig = {
    kinesisStream: {
        group: StencilGroups.Analytics,
        label: "Kinesis Stream",
        link: "icons/Arch_Analytics/Arch_Amazon-Kinesis_64.svg",
        localType: LocalShapesTypes.Node
    },
    redshift: {
        group: StencilGroups.Analytics,
        label: "Redshift",
        link: "icons/Arch_Analytics/Arch_Amazon-Redshift_64.svg",
        localType: LocalShapesTypes.Node
    },
    dataPipeline: {
        group: StencilGroups.Analytics,
        label: "Data Pipeline",
        link: "icons/Arch_Analytics/Arch_AWS-Data-Pipeline_64.svg",
        localType: LocalShapesTypes.Node
    },
    amazonSNS: {
        group: StencilGroups.AppIntegration,
        label: "Amazon SNS",
        link: "icons/Arch_App-Integration/Arch_Amazon-Simple-Notification-Service_64.svg",
        localType: LocalShapesTypes.Node
    },
    amazonSQS: {
        group: StencilGroups.AppIntegration,
        label: "Amazon SQS",
        link: "icons/Arch_App-Integration/Arch_Amazon-Simple-Queue-Service_64.svg",
        localType: LocalShapesTypes.Node
    },
    lambda: {
        group: StencilGroups.Compute,
        label: "AWS Lambda",
        link: "icons/Arch_Compute/Arch_AWS-Lambda_64.svg",
        localType: LocalShapesTypes.Node
    },
    batch: {
        group: StencilGroups.Compute,
        label: "AWS Batch",
        link: "icons/Arch_Compute/Arch_AWS-Batch_64.svg",
        localType: LocalShapesTypes.Node
    },
    ec2: {
        group: StencilGroups.Compute,
        label: "Amazon EC2",
        link: "icons/Arch_Compute/Arch_Amazon-EC2_64.svg",
        localType: LocalShapesTypes.Node
    },
    autoScaling: {
        group: StencilGroups.Compute,
        label: "Auto Scaling",
        link: "icons/Arch_Compute/Arch_Amazon-EC2-Auto-Scaling_64.svg",
        localType: LocalShapesTypes.AutoScaling
    },
    ecsCluster: {
        group: StencilGroups.Containers,
        label: "ECS Cluster",
        link: "icons/Arch_Containers/Arch_Amazon-Elastic-Container-Service_64.svg",
        localType: LocalShapesTypes.EcsCluster
    },
    ecsService: {
        group: StencilGroups.Containers,
        label: "ECS Service",
        link: "icons/Arch_Containers/Arch_Amazon-Elastic-Container-Service_64.svg",
        localType: LocalShapesTypes.EcsService
    },
    ecsTask: {
        group: StencilGroups.Containers,
        label: "ECS Task",
        link: "icons/Arch_Containers/Arch_ECS-Task_64.png",
        localType: LocalShapesTypes.Node
    },
    aurora: {
        group: StencilGroups.Database,
        label: "Aurora",
        link: "icons/Arch_Database/Arch_Amazon-Aurora_64.svg",
        localType: LocalShapesTypes.Node
    },
    dynamoDB: {
        group: StencilGroups.Database,
        label: "Dynamo DB",
        link: "icons/Arch_Database/Arch_Amazon-DynamoDB_64.svg",
        localType: LocalShapesTypes.Node
    },
    appStream: {
        group: StencilGroups.EndUser,
        label: "App Stream 2.0",
        link: "icons/Arch_End-User-Computing/Arch_Amazon-AppStream_64.svg",
        localType: LocalShapesTypes.Node
    },
    workspaces: {
        group: StencilGroups.EndUser,
        label: "Workspace",
        link: "icons/Arch_End-User-Computing/Arch_Amazon-WorkSpaces_64.svg",
        localType: LocalShapesTypes.Node
    },
    cloudwatch: {
        group: StencilGroups.Management,
        label: "CloudWatch",
        link: "icons/Arch_Management-Governance/Arch_Amazon-CloudWatch_64.svg",
        localType: LocalShapesTypes.Node
    },
    cloudtrail: {
        group: StencilGroups.Management,
        label: "CloudTrail",
        link: "icons/Arch_Management-Governance/Arch_AWS-CloudTrail_64.svg",
        localType: LocalShapesTypes.Node
    },
    route53: {
        group: StencilGroups.Networking,
        label: "Route 53",
        link: "icons/Arch_Networking-Content-Delivery/Arch_Amazon-Route-53_64.svg",
        localType: LocalShapesTypes.Node
    },
    privateLink: {
        group: StencilGroups.Networking,
        label: "PrivateLink",
        link: "icons/Arch_Networking-Content-Delivery/Arch_AWS-PrivateLink_64.svg",
        localType: LocalShapesTypes.Node
    },
    securityGroup: {
        group: StencilGroups.Groups,
        label: "Security",
        link: "icons/other/securityIcon.png",
        localType: LocalShapesTypes.SecurityGroup
    },
    vpcGroup: {
        group: StencilGroups.Groups,
        label: "VPC",
        link: "icons/other/vpcIcon.png",
        localType: LocalShapesTypes.VPC
    },
    subnetGroup: {
        group: StencilGroups.Groups,
        label: "Subnet",
        link: "icons/other/subnetIcon.png",
        localType: LocalShapesTypes.Subnet
    },
    waf: {
        group: StencilGroups.Security,
        label: "WAF",
        link: "icons/Arch_Security-Identity-Compliance/Arch_AWS-WAF_64.svg",
        localType: LocalShapesTypes.Node
    },
    shield: {
        group: StencilGroups.Security,
        label: "Shield",
        link: "icons/Arch_Security-Identity-Compliance/Arch_AWS-Shield_64.svg",
        localType: LocalShapesTypes.Node
    },
    securityHub: {
        group: StencilGroups.Security,
        label: "Security Hub",
        link: "icons/Arch_Security-Identity-Compliance/Arch_AWS-Security-Hub_64.svg",
        localType: LocalShapesTypes.Node
    },
    backup: {
        group: StencilGroups.Storage,
        label: "Backup",
        link: "icons/Arch_Storage/Arch_AWS-Backup_64.svg",
        localType: LocalShapesTypes.Node
    },
    snowball: {
        group: StencilGroups.Storage,
        label: "Snowball",
        link: "icons/Arch_Storage/Arch_AWS-Snowball_64.svg",
        localType: LocalShapesTypes.Node
    },
}