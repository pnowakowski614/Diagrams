export enum StencilGroups {
    Analytics = "Analytics",
    AppIntegration = "AppIntegration",
    Compute = "Compute",
    Containers = "Containers",
    Database = "Database",
    EndUser = "EndUser",
    Management = "Management",
    Networking = "Networking",
    Groups = "Groups",
    Security = "Security",
    Storage = "Storage"
}

export enum LocalShapesTypes {
    Node = "Node",
    AutoScaling = "AutoScaling",
    EcsCluster = "EcsCluster",
    EcsService = "EcsService",
    SecurityGroup = "SecurityGroup",
    VPC = "VPC",
    Subnet = "Subnet"
}

export enum GlobalShapesTypes {
    Node = "app.node",
    AutoScaling = "app.autoScaling",
    EcsCluster = "app.ecsCluster",
    EcsService = "app.ecsService",
    SecurityGroup = "app.securityGroup",
    VPC = "app.VPC",
    Subnet = "app.subnet"
}
