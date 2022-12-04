import { dia } from "@clientio/rappid";
import { DbCellAttrs } from "../types/types";
import { GlobalShapesTypes } from "../types/enums";
import store from "../store/store";
import {
  AutoScaling,
  CustomLink,
  ECSCluster,
  ECSService,
  NodeShape,
  SecurityGroup,
  Subnet,
  VPC,
} from "../shapes";
import { omit } from "lodash";
import { Region } from "../shapes/region";
import { defaultShapeLabelAttrs } from "./config-utils";
import { getSourcePortObject, getTargetPortObject } from "./rappid-utils";

const addEmbeds = (graph: dia.Graph) => {
  graph.getCells().forEach((cell) => {
    const parentId = cell.prop("parent");
    if (parentId) {
      const parent = graph.getCell(parentId);
      parent.embed(cell);
    }
  });
};

export const filterDiagramInfo = (graph: dia.Graph) => {
  return graph.getCells().map((cell: dia.Cell) => {
    const {
      type,
      position,
      size,
      id,
      localType,
      z,
      maxLinks,
      source,
      target,
      vertices,
    } = cell.attributes;
    const parent = cell.parent();
    if (type !== GlobalShapesTypes.CustomLink) {
      return {
        type,
        position,
        size,
        parent,
        id,
        localType,
        z,
        maxLinks: maxLinks!,
        text: cell.attr("label/text"),
        icon: cell.attr("icon/href"),
        groupShapeColor: cell.attr("body/stroke"),
      } as DbCellAttrs;
    } else {
      return {
        type,
        sourceId: source.id,
        targetId: target.id,
        id,
        z,
        vertices,
        linkColor: cell.attr("line/stroke"),
      } as DbCellAttrs;
    }
  });
};

export const setShapeAttrs = (cell: DbCellAttrs) => {
  const { type, text, icon, groupShapeColor, linkColor } = cell;
  switch (type) {
    case GlobalShapesTypes.NodeShape:
      return {
        label: {
          ...defaultShapeLabelAttrs,
          text,
        },
        icon: {
          href: icon,
        },
      };
    case (GlobalShapesTypes.AutoScaling,
    GlobalShapesTypes.EcsService,
    GlobalShapesTypes.EcsCluster):
      return {
        label: { text },
      };
    case (GlobalShapesTypes.VPC,
    GlobalShapesTypes.Region,
    GlobalShapesTypes.Subnet,
    GlobalShapesTypes.SecurityGroup):
      return {
        body: {
          stroke: groupShapeColor,
        },
        background: {
          fill: groupShapeColor,
        },
        label: { text },
      };
    default:
      return {
        line: {
          stroke: linkColor,
        },
      };
  }
};

const createCell = (cell: DbCellAttrs, graph: dia.Graph) => {
  const omittedAttrs = omit(cell, ["text", "icon", "groupShapeColor"]);
  switch (cell.type) {
    case GlobalShapesTypes.NodeShape: {
      const newShape = new NodeShape(omittedAttrs);
      return newShape.attr(setShapeAttrs(cell));
    }
    case GlobalShapesTypes.AutoScaling: {
      const newShape = new AutoScaling(omittedAttrs);
      return newShape.attr(setShapeAttrs(cell));
    }
    case GlobalShapesTypes.EcsCluster: {
      const newShape = new ECSCluster(omittedAttrs);
      return newShape.attr(setShapeAttrs(cell));
    }
    case GlobalShapesTypes.EcsService: {
      const newShape = new ECSService(omittedAttrs);
      return newShape.attr(setShapeAttrs(cell));
    }
    case GlobalShapesTypes.SecurityGroup: {
      const newShape = new SecurityGroup(omittedAttrs);
      return newShape.attr(setShapeAttrs(cell));
    }
    case GlobalShapesTypes.Subnet: {
      const newShape = new Subnet(omittedAttrs);
      return newShape.attr(setShapeAttrs(cell));
    }
    case GlobalShapesTypes.Region: {
      const newShape = new Region(omittedAttrs);
      return newShape.attr(setShapeAttrs(cell));
    }
    case GlobalShapesTypes.VPC: {
      const newShape = new VPC(omittedAttrs);
      return newShape.attr(setShapeAttrs(cell));
    }
    default: {
      const newLink = new CustomLink(
        omit(cell, ["linkColor", "sourceId", "targetId"])
      );
      newLink.source(getSourcePortObject(cell.sourceId, graph));
      newLink.target(getTargetPortObject(cell.targetId, graph));
      return newLink.attr(setShapeAttrs(cell));
    }
  }
};

export const getGraphFromDB = (graph: dia.Graph) => {
  const diagramCells: [DbCellAttrs] = store.getState().diagrams.currentDiagram!;
  diagramCells.forEach((cell) => {
    const cellToAdd = createCell(cell, graph);
    graph.addCell(cellToAdd);
  });
  addEmbeds(graph);
};
