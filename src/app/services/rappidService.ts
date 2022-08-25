import { dia, shapes, ui } from '@clientio/rappid';
import StencilService from "./stencilService";
import React from "react";
import { GlobalShapesTypes } from "../types/enums";

class RappidService {
    paperElement: HTMLElement;
    stencilElement: HTMLElement;
    setInspectorOpened!: React.Dispatch<React.SetStateAction<boolean>>;

    constructor(paperElement: HTMLElement, stencilElement: HTMLElement) {
        this.paperElement = paperElement;
        this.stencilElement = stencilElement;
    }

    public setInspectorFunction(callback: React.Dispatch<React.SetStateAction<boolean>>) {
        this.setInspectorOpened = callback;
    }

    public init() {
        const graph = new dia.Graph({}, {cellNamespace: shapes});

        const paper = new dia.Paper({
            model: graph,
            width: 3000,
            height: 3000,
            background: {
                color: '#F8F9FA',
            },
            cellViewNamespace: shapes,
            drawGrid: true,
            gridSize: 10,
        });

        const scroller = new ui.PaperScroller({
            paper: paper,
            cursor: 'grab',
            scrollWhileDragging: true,
            autoResizePaper: true,
        });

        this.paperElement.appendChild(scroller.el);
        scroller.render().center();

        this.initPaperEvents(paper, scroller);

        const stencilInst = new StencilService(paper, this.stencilElement);
        stencilInst.initStencil();

        this.initTooltip();
    }

    private initTooltip() {
        return new ui.Tooltip({
            target: '[data-tooltip]',
            direction: ui.Tooltip.TooltipArrowPosition.Auto,
            position: ui.Tooltip.TooltipPosition.Left,
            padding: 10
        });
    }

    private initPaperEvents(paper: dia.Paper, scroller: ui.PaperScroller) {
        paper.on('blank:pointerdown', (evt) => scroller.startPanning(evt));

        paper.on('cell:pointerclick', () => {
            this.setInspectorOpened(true);
        });

        paper.on('element:pointerclick', (elementView) => {
            const getMinDimensions = (elementView: dia.ElementView) => {
                switch (elementView.model.attributes.type) {
                    case GlobalShapesTypes.Node:
                        return 30;
                    case GlobalShapesTypes.VPC:
                    case GlobalShapesTypes.SecurityGroup:
                    case GlobalShapesTypes.Subnet:
                        return 150;
                    case GlobalShapesTypes.EcsService:
                    case GlobalShapesTypes.EcsCluster:
                        return 100;
                    default:
                        return 50;
                }
            }

            const freeTransform = new ui.FreeTransform({
                cellView: elementView,
                allowRotation: false,
                preserveAspectRatio: true,
                minWidth: getMinDimensions(elementView),
                minHeight: getMinDimensions(elementView),
            });
            freeTransform.render();
        });
    }

}

export default RappidService;