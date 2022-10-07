import { dia } from "@clientio/rappid";

export interface InspectorProps {
    cellView: dia.CellView
    graph: dia.Graph
}

export interface LabelInputProps {
    cellView: dia.CellView
}

export interface MaxLinksInputProps {
    cellView: dia.CellView,
    graph: dia.Graph
}

export interface ColorInputProps {
    cellView: dia.CellView
}
