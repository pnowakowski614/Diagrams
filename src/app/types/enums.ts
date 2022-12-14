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
  Storage = "Storage",
}

export enum LocalShapesTypes {
  NodeShape = "NodeShape",
  AutoScaling = "AutoScaling",
  EcsCluster = "EcsCluster",
  EcsService = "EcsService",
  SecurityGroup = "SecurityGroup",
  VPC = "VPC",
  Subnet = "Subnet",
  ECSTask = "ECSTask",
  EC2 = "EC2",
  Region = "Region",
}

export enum GlobalShapesTypes {
  NodeShape = "app.NodeShape",
  AutoScaling = "app.AutoScaling",
  EcsCluster = "app.ECSCluster",
  EcsService = "app.ECSService",
  SecurityGroup = "app.SecurityGroup",
  VPC = "app.VPC",
  Subnet = "app.Subnet",
  Region = "app.Region",
  CustomLink = "app.CustomLink",
}

export enum Routes {
  diagram = "/diagram",
  diagramList = "/list",
  login = "/login",
  signup = "/signup",
}

export enum AlertMessages {
  loggingIn = "You're being logged in, please wait.",
  invalidForm = "Invalid form!",
  loggedOut = "Successfully logged out!",
  loginError = "Wrong username or password!",
  diagramSaved = "Diagram saved!",
  duplicate = "Duplicate email or username!",
  diagramOpened = "Diagram opened successfully!",
}
