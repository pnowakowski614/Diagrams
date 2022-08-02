import '@clientio/rappid';
import { dia, ui } from "@clientio/rappid";
import { Node } from '../../shapes/node/node';
import { nodeConfig } from "../../shapes/node/node-config";

const groupElementsConfig: { [index: string]: Node[] } = {
    "analytics":
        [],
    "appIntegration":
        [],
    "compute":
        [],
    "containers":
        [],
    "database":
        [],
    "endUser":
        [],
    "management":
        [],
    "networking":
        [],
    "security":
        [],
    "storage":
        []
};

class StencilService {
    paper: dia.Paper;
    stencilElement: HTMLElement;
    stencil!: ui.Stencil;

    constructor(paper: dia.Paper, stencilElement: HTMLElement) {
        this.paper = paper;
        this.stencilElement = stencilElement;
    }

    initStencil(): void {
        this.stencil = new ui.Stencil({
            paper: this.paper,
            groups: this.setGroups(),
            label: "Elements",
            layout: {
                marginX: -13,
                columns: 1,
                rowHeight: 65
            },
            groupsToggleButtons: true,
            dragStartClone: this.cloneNode
        });

        this.setElements();
        this.stencilElement.appendChild(this.stencil.el);
        this.stencil.render();
        this.stencil.load(groupElementsConfig);
    }

    setElements() {
        Object.values(nodeConfig).map((value) => {
            let newNode = new Node().attr({
                label: {
                    text: value.label
                },
                icon: {
                    href: value.link
                }
            })
            groupElementsConfig[value.group].push(newNode);
        })
    }

    cloneNode(el: dia.Cell) {
        let clone = el.clone();
        clone.attr({
            label: {
                fontSize: 10,
                textAnchor: "middle",
                refX: 23,
                refY: 52
            }
        })
        return clone;
    }

    setGroups() {
        return {
            analytics: {
                label: 'Analytics',
                index: 1
            },
            appIntegration: {
                label: 'App Integration',
                index: 2,
                closed: true
            },
            compute: {
                label: 'Compute',
                index: 3,
                closed: true,
            },
            containers: {
                label: 'Containers',
                index: 4,
                closed: true,
            },
            database: {
                label: "Database",
                index: 5,
                closed: true,
            },
            endUser: {
                label: "End User Computing",
                index: 6,
                closed: true
            },
            management: {
                label: "Management",
                index: 7,
                closed: true
            },
            networking: {
                label: "Networking",
                index: 8,
                closed: true
            },
            security: {
                label: "Security",
                index: 9,
                closed: true
            },
            storage: {
                label: "Storage",
                index: 10,
                closed: true
            },
        }
    }
}

export default StencilService;