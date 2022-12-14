import { GlobalShapesTypes, LocalShapesTypes } from "../types/enums";

export const defaultShapeLabelAttrs = {
  fontSize: 10,
  textAnchor: "middle",
  refX: "50%",
  refY: "110%",
};

export const defaultStencilLayoutOptions = {
  marginX: -13,
  columns: 1,
  rowHeight: 65,
};

export const validEmebedCombinationConsts = [
  LocalShapesTypes.NodeShape,
  LocalShapesTypes.ECSTask,
  LocalShapesTypes.EC2,
  LocalShapesTypes.EcsService,
  LocalShapesTypes.EcsCluster,
];

export const groupList = [
  GlobalShapesTypes.VPC,
  GlobalShapesTypes.SecurityGroup,
  GlobalShapesTypes.Region,
  GlobalShapesTypes.Subnet,
  GlobalShapesTypes.EcsCluster,
  GlobalShapesTypes.EcsService,
];

export const colorChangeShapes = [
  GlobalShapesTypes.Region,
  GlobalShapesTypes.VPC,
  GlobalShapesTypes.SecurityGroup,
  GlobalShapesTypes.Subnet,
  GlobalShapesTypes.CustomLink,
];
