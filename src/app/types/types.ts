export interface DbCellAttrs {
    type: string,
    position: { x: number, y: number },
    size: { height: number, width: number },
    id: string,
    localType: string,
    z: number,
    maxLinks: number,
    text: string,
    icon: string,
    groupShapeColor: string,
    source: {
        id: string,
        magnetBody: string,
        port: string,
    },
    target: {
        id: string,
        magnetBody: string,
        port: string,
    },
    vertices: [{ x: number, y: number }],
    linkColor: string
}

export interface GraphInfoCells {
    type: string,
    position: { x: number, y: number },
    size: { height: number, width: number },
    id: string,
    localType: string,
    z: number,
    maxLinks: number,
    attrs: {
        body: {
            stroke: string,
        }
        line: {
            stroke: string
        }
        label: {
            text: string,
        }
        icon: {
            href: string,
        }
    }
    source: {
        id: string,
        magnetBody: string,
        port: string,
    },
    target: {
        id: string,
        magnetBody: string,
        port: string,
    },
    vertices: [{ x: number, y: number }],
}

