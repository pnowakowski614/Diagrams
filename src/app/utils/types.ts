import { dia } from "@clientio/rappid";

export {}

export interface InspectorProps {
    cellView: dia.CellView
    graph: dia.Graph
}

export interface LabelInputProps {
    cellView: dia.CellView
}

export interface MaxLinksInputProps {
    cell: dia.Cell,
    graph: dia.Graph
}

export interface ColorInputProps {
    cell: dia.Cell
}
