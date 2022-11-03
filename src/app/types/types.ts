export {}

export interface JSONGraphRootState {
    diagramList: [{ cells: [], _id: string, diagramName: string }] | null
    currentDiagramId: string | null
}
