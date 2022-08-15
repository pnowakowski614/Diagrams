import '@clientio/rappid';
import { dia, ui } from "@clientio/rappid";
import { shapesConfig } from "app/shapes/node/shapes-config";
import { groupConfig } from "../utils/groupConfig";
import { AutoScaling } from "app/shapes/auto-scaling/autoScaling";
import { ECSCluster } from "app/shapes/ecs-cluster/ecsCluster";
import { ECSService } from "app/shapes/ecs-service/ecsService";
import { Node } from "app/shapes/node/node";
import { SecurityGroup } from "app/shapes/security-group/securityGroup";


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

        this.stencilElement.appendChild(this.stencil.el);
        this.stencil.render();
        this.stencil.load(this.setElements());
    }

    setElements() {
        let groupList: { [index: string]: Node[] } = {};

        Object.keys(groupConfig).map((key) => {
            groupList[key] = [];
        })

        Object.values(shapesConfig).map((value) => {
            let newNode = new Node()
            newNode.attr({
                label: {
                    text: value.label
                },
                icon: {
                    href: value.link
                }
            });
            newNode.prop("localType", value.localType);
            groupList[value.group].push(newNode);
        })

        return groupList;
    }

    cloneNode(el: dia.Cell) {
        let clone = el.clone();
        switch (clone.attributes.localType) {
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
                clone = new AutoScaling();
                break;
            case "ecsCluster":
                clone = new ECSCluster();
                break;
            case "ecsService":
                clone = new ECSService();
                break;
            case "securityGroup":
                clone = new SecurityGroup();
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