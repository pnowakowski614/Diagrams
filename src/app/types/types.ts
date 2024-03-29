import { dia } from "@clientio/rappid";

export interface DbCellAttrs {
  type: string;
  position?: { x: number; y: number };
  size?: { height: number; width: number };
  id: string;
  localType?: string;
  z: number;
  maxLinks?: number;
  parent?: dia.Cell.ID;
  text?: string;
  icon?: string;
  groupShapeColor?: string;
  sourceId: string;
  targetId: string;
  vertices?: [{ x: number; y: number }];
  linkColor?: string;
}
