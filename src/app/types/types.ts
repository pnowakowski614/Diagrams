export {}

export interface JSONGraphRootState {
    diagramList: [{ cells: [], id: number, diagramName: string }] | null
    id: number | null
}
