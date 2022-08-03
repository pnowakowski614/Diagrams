import '@clientio/rappid';
import { dia, ui } from "@clientio/rappid";
import { node } from '../../shapes/node/node';
import { nodeConfig } from "../../shapes/node/node-config";
import { groupElementsConfig } from "./groupElementsConfig";
import { groupConfig } from "./groupConfig";
import { autoScaling } from "../../shapes/auto-scaling/autoScaling";
import { ecsCluster } from "../../shapes/ecs-cluster/ecsCluster";

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
            let newNode = new node().attr({
                label: {
                    text: value.label
                },
                icon: {
                    href: value.link
                }
            });
            newNode.prop("type", value.type);
            groupElementsConfig[value.group].push(newNode);
        })
    }

    cloneNode(el: dia.Cell) {
        let clone = el.clone();
        switch (clone.attributes.type) {
            case "Node":
                clone.attr({
                    label: {
                        fontSize: 10,
                        textAnchor: "middle",
                        refX: 23,
                        refY: 52
                    }
                })
                break;
            case "autoScaling":
                clone = new autoScaling();
                break;
            case "ecsCluster":
                clone = new ecsCluster();
                break;
            default:
                break;
        }
        return clone;
    }

    setGroups() {
        return groupConfig;
    }
}

export default StencilService;