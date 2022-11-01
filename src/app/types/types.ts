export {}

export interface JSONGraphRootState {
    diagramList: [{ cells: [], id: number, diagramName: string }] | null
    currentDiagramId: number | null
}
