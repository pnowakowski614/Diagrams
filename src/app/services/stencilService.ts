import '@clientio/rappid';
import { dia, ui } from "@clientio/rappid";
import { shapesConfig } from "app/rappid-configs/shapesConfig";
import { groupConfig } from "app/rappid-configs/groupConfig";
import { AutoScaling, ECSCluster, ECSService, NodeShape, SecurityGroup, Subnet, VPC } from "app/shapes";
import { LocalShapesTypes } from "../types/enums";
import { defaultShapeAttrs, defaultStencilLayoutOptions } from "../utils/rappid-utils";
import { portsConfig } from "../rappid-configs/portsConfig";
import { Region } from "../shapes/region";

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
            dragStartClone: StencilService.cloneNode
        });

        this.stencilElement.appendChild(this.stencil.el);
        this.stencil.render();
        this.stencil.load(this.setElements());
    }

    private setElements(): { [p: string]: NodeShape[] } {
        const groupList: { [index: string]: NodeShape[] } = {};

        Object.keys(groupConfig).forEach((key) => {
            groupList[key] = [];
        })

        Object.values(shapesConfig).forEach((value) => {
            const newNode = new NodeShape()
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

    private static cloneNode(el: dia.Cell): dia.Cell {
        let clone = el.clone();
        switch (clone.prop("localType")) {
            case LocalShapesTypes.AutoScaling:
                return clone = new AutoScaling();
            case LocalShapesTypes.EcsCluster:
                return clone = new ECSCluster();
            case LocalShapesTypes.EcsService:
                return clone = new ECSService();
            case LocalShapesTypes.SecurityGroup:
                return clone = new SecurityGroup();
            case LocalShapesTypes.VPC:
                return clone = new VPC();
            case LocalShapesTypes.Subnet:
                return clone = new Subnet();
            case LocalShapesTypes.Region:
                return clone = new Region();
            default:
                clone.prop('ports', portsConfig);
                return clone.attr({
                    label: defaultShapeAttrs,
                });
        }
    }
}

export default StencilService;