import '@clientio/rappid';
import { dia, ui } from "@clientio/rappid";
import { shapesConfig } from "app/rappid-configs/shapesConfig";
import { groupConfig } from "app/rappid-configs/groupConfig";
import { AutoScaling } from "app/shapes/autoScaling";
import { ECSCluster } from "app/shapes/ecsCluster";
import { ECSService } from "app/shapes/ecsService";
import { Node } from "app/shapes/node";
import { SecurityGroup } from "app/shapes/securityGroup";
import { VPC } from "app/shapes/vpc";
import { LocalShapesTypes } from "../types/enums";
import { defaultShapeAttrs, defaultStencilLayoutOptions } from "../utils/rappid-utils";
import { Subnet } from "../shapes/subnet";

class StencilService {
    paper: dia.Paper;
    stencilElement: HTMLElement;
    stencil!: ui.Stencil;

    constructor(paper: dia.Paper, stencilElement: HTMLElement) {
        this.paper = paper;
        this.stencilElement = stencilElement;
    }

    public initStencil(): void {
        this.stencil = new ui.Stencil({
            paper: this.paper,
            groups: groupConfig,
            label: "Elements",
            layout: defaultStencilLayoutOptions,
            groupsToggleButtons: true,
            dragStartClone: this.cloneNode
        });

        this.stencilElement.appendChild(this.stencil.el);
        this.stencil.render();
        this.stencil.load(this.setElements());
    }

    private setElements() {
        let groupList: { [index: string]: Node[] } = {};

        Object.keys(groupConfig).forEach((key) => {
            groupList[key] = [];
        })

        Object.values(shapesConfig).forEach((value) => {
            let newNode = new Node()
            newNode.attr({
                root: {
                    dataTooltip: value.label
                },
                label: {
                    text: value.label,
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

    private cloneNode(el: dia.Cell) {
        let clone = el.clone();
        switch (clone.attributes.localType) {
            case LocalShapesTypes.Node:
                clone.attr({
                    label: defaultShapeAttrs,
                })
                break;
            case LocalShapesTypes.AutoScaling:
                clone = new AutoScaling();
                break;
            case LocalShapesTypes.EcsCluster:
                clone = new ECSCluster();
                break;
            case LocalShapesTypes.EcsService:
                clone = new ECSService();
                break;
            case LocalShapesTypes.SecurityGroup:
                clone = new SecurityGroup();
                break;
            case LocalShapesTypes.VPC:
                clone = new VPC();
                break;
            case LocalShapesTypes.Subnet:
                clone = new Subnet();
                break;
            default:
                break;
        }
        return clone;
    }
}

export default StencilService;