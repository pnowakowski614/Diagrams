import { dia, shapes, ui } from '@clientio/rappid';
import StencilService from "./stencilService";
import React from "react";
import {
    getMinDimensions,
    getPreserveAspectRatio,
    getResizeDirections,
    validateEmbedding
} from "../utils/rappid-utils";

class RappidService {
    paperElement: HTMLElement;
    stencilElement: HTMLElement;
    setInspectorOpened!: React.Dispatch<React.SetStateAction<boolean>>;

    constructor(paperElement: HTMLElement, stencilElement: HTMLElement) {
        this.paperElement = paperElement;
        this.stencilElement = stencilElement;
    }

    public setInspectorFunction(callback: React.Dispatch<React.SetStateAction<boolean>>): void {
        this.setInspectorOpened = callback;
    }

    public init(): void {
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
            embeddingMode: true,
            validateEmbedding: validateEmbedding
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

        RappidService.initTooltip();
        this.initFreeTransform(paper);
        this.initHalo(paper);
    }

    private static initTooltip(): ui.Tooltip {
        return new ui.Tooltip({
            target: '[data-tooltip]',
            direction: ui.Tooltip.TooltipArrowPosition.Auto,
            position: ui.Tooltip.TooltipPosition.Left,
            padding: 10
        });
    }

    private initPaperEvents(paper: dia.Paper, scroller: ui.PaperScroller): void {
        paper.on('blank:pointerdown', (evt) => scroller.startPanning(evt));

        paper.on('cell:pointerclick', () => {
            this.setInspectorOpened(true);
        });
    }

    private initFreeTransform(paper: dia.Paper): void {
        paper.on('element:pointerclick', (elementView) => {
            const freeTransform = new ui.FreeTransform({
                cellView: elementView,
                allowRotation: false,
                preserveAspectRatio: getPreserveAspectRatio(elementView),
                minWidth: getMinDimensions(elementView),
                minHeight: getMinDimensions(elementView),
                resizeDirections: getResizeDirections(elementView)
            });
            freeTransform.render();
        });
    }

    private initHalo(paper: dia.Paper): void {
        paper.on('cell:pointerclick', (cellView: dia.CellView) => {
                const halo = new ui.Halo({
                    cellView,
                    type: 'toolbar',
                    useModelGeometry: true
                })
                halo.render();
                halo.removeHandle('resize');
            }
        );
    }
}

export default RappidService;