enum groupEnum {
    analytics = "analytics",
    appIntegration = "appIntegration",
    compute = "compute",
    containers = "containers",
    database = "database",
    endUser = "endUser",
    management = "management",
    networking = "networking",
    groups = "groups",
    security = "security",
    storage = "storage"
}

enum shapes {
    node = "Node",
    autoScaling = "autoScaling",
    ecsCluster = "ecsCluster",
    ecsService = "ecsService",
    securityGroup = "securityGroup",
    vpc = "VPC"
}

export const shapesConfig = {
    kinesisStream: {
        group: groupEnum.analytics,
        label: "Kinesis Stream",
        link: "icons/Arch_Analytics/Arch_64/Arch_Amazon-Kinesis_64.svg",
        localType: shapes.node
    },
    redshift: {
        group: groupEnum.analytics,
        label: "Redshift",
        link: "icons/Arch_Analytics/Arch_64/Arch_Amazon-Redshift_64.svg",
        localType: shapes.node
    },
    dataPipeline: {
        group: groupEnum.analytics,
        label: "Data Pipeline",
        link: "icons/Arch_Analytics/Arch_64/Arch_AWS-Data-Pipeline_64.svg",
        localType: shapes.node
    },
    amazonSNS: {
        group: groupEnum.appIntegration,
        label: "Amazon SNS",
        link: "icons/Arch_App-Integration/Arch_64/Arch_Amazon-Simple-Notification-Service_64.svg",
        localType: shapes.node
    },
    amazonSQS: {
        group: groupEnum.appIntegration,
        label: "Amazon SQS",
        link: "icons/Arch_App-Integration/Arch_64/Arch_Amazon-Simple-Queue-Service_64.svg",
        localType: shapes.node
    },
    lambda: {
        group: groupEnum.compute,
        label: "AWS Lambda",
        link: "icons/Arch_Compute/64/Arch_AWS-Lambda_64.svg",
        localType: shapes.node
    },
    batch: {
        group: groupEnum.compute,
        label: "AWS Batch",
        link: "icons/Arch_Compute/64/Arch_AWS-Batch_64.svg",
        localType: shapes.node
    },
    autoScaling: {
        group: groupEnum.compute,
        label: "Auto Scaling",
        link: "icons/Arch_Compute/64/Arch_Amazon-EC2-Auto-Scaling_64.svg",
        localType: shapes.autoScaling
    },
    ecsCluster: {
        group: groupEnum.containers,
        label: "ECS Cluster",
        link: "icons/Arch_Containers/64/Arch_Amazon-Elastic-Container-Service_64.svg",
        localType: shapes.ecsCluster
    },
    ecsService: {
        group: groupEnum.containers,
        label: "ECS Service",
        link: "icons/Arch_Containers/64/Arch_Amazon-Elastic-Container-Service_64.svg",
        localType: shapes.ecsService
    },
    aurora: {
        group: groupEnum.database,
        label: "Aurora",
        link: "icons/Arch_Database/64/Arch_Amazon-Aurora_64.svg",
        localType: shapes.node
    },
    dynamoDB: {
        group: groupEnum.database,
        label: "Dynamo DB",
        link: "icons/Arch_Database/64/Arch_Amazon-DynamoDB_64.svg",
        localType: shapes.node
    },
    appStream: {
        group: groupEnum.endUser,
        label: "App Stream 2.0",
        link: "icons/Arch_End-User-Computing/64/Arch_Amazon-AppStream_64.svg",
        localType: shapes.node
    },
    workspaces: {
        group: groupEnum.endUser,
        label: "Workspace",
        link: "icons/Arch_End-User-Computing/64/Arch_Amazon-WorkSpaces_64.svg",
        localType: shapes.node
    },
    cloudwatch: {
        group: groupEnum.management,
        label: "CloudWatch",
        link: "icons/Arch_Management-Governance/64/Arch_Amazon-CloudWatch_64.svg",
        localType: shapes.node
    },
    cloudtrail: {
        group: groupEnum.management,
        label: "CloudTrail",
        link: "icons/Arch_Management-Governance/64/Arch_AWS-CloudTrail_64.svg",
        localType: shapes.node
    },
    route53: {
        group: groupEnum.networking,
        label: "Route 53",
        link: "icons/Arch_Networking-Content-Delivery/64/Arch_Amazon-Route-53_64.svg",
        localType: shapes.node
    },
    privateLink: {
        group: groupEnum.networking,
        label: "PrivateLink",
        link: "icons/Arch_Networking-Content-Delivery/64/Arch_AWS-PrivateLink_64.svg",
        localType: shapes.node
    },
    securityGroup: {
        group: groupEnum.groups,
        label: "Security",
        link: "icons/Arch_Security-Identity-Compliance/64/Arch_AWS-Security-Hub_64.svg",
        localType: shapes.securityGroup
    },
    vpcGroup: {
        group: groupEnum.groups,
        label: "VPC",
        link: "icons/Arch_Security-Identity-Compliance/64/Arch_AWS-Security-Hub_64.svg",
        localType: shapes.vpc
    },
    waf: {
        group: groupEnum.security,
        label: "WAF",
        link: "icons/Arch_Security-Identity-Compliance/64/Arch_AWS-WAF_64.svg",
        localType: shapes.node
    },
    shield: {
        group: groupEnum.security,
        label: "Shield",
        link: "icons/Arch_Security-Identity-Compliance/64/Arch_AWS-Shield_64.svg",
        localType: shapes.node
    },
    securityHub: {
        group: groupEnum.security,
        label: "Security Hub",
        link: "icons/Arch_Security-Identity-Compliance/64/Arch_AWS-Security-Hub_64.svg",
        localType: shapes.node
    },
    backup: {
        group: groupEnum.storage,
        label: "Backup",
        link: "icons/Arch_Storage/64/Arch_AWS-Backup_64.svg",
        localType: shapes.node
    },
    snowball: {
        group: groupEnum.storage,
        label: "Snowball",
        link: "icons/Arch_Storage/64/Arch_AWS-Snowball_64.svg",
        localType: shapes.node
    },
}