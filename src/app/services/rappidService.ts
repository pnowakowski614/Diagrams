import { dia, shapes, ui } from '@clientio/rappid';
import StencilService from "./stencilService";
import React from "react";
import {
    addLinkTools,
    getCustomLink,
    getHaloMagnet,
    getMinDimensions,
    getPreserveAspectRatio,
    getResizeDirections,
    validateConnection,
    validateEmbedding
} from "../utils/rappid-utils";

class RappidService {
    paperElement: HTMLElement;
    stencilElement: HTMLElement;
    paper!: dia.Paper;
    scroller!: ui.PaperScroller;
    graph!: dia.Graph;
    setInspectorOpened!: React.Dispatch<React.SetStateAction<boolean>>;

    constructor(paperElement: HTMLElement, stencilElement: HTMLElement) {
        this.paperElement = paperElement;
        this.stencilElement = stencilElement;
    }

    public setInspectorFunction(callback: React.Dispatch<React.SetStateAction<boolean>>): void {
        this.setInspectorOpened = callback;
    }

    public init(): void {
        this.initCanvas();
        this.initStencil(this.paper);
        this.initFreeTransform(this.paper);
        this.initHalo(this.paper);
        this.initPaperEvents(this.paper, this.scroller);
        RappidService.initTooltip();
    }

    private initCanvas() {
        const graph = this.graph = new dia.Graph({}, {cellNamespace: shapes});

        const paper = this.paper = new dia.Paper({
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
            validateEmbedding: validateEmbedding,
            snapLinks: {radius: 40},
            validateConnection: validateConnection,
            linkPinning: false,
            defaultLink: getCustomLink
        });

        const scroller = this.scroller = new ui.PaperScroller({
            paper: paper,
            cursor: 'grab',
            scrollWhileDragging: true,
            autoResizePaper: true,
        });

        this.paperElement.appendChild(scroller.el);
        scroller.render().center();
    }

    private initStencil(paper: dia.Paper): void {
        const stencilInst = new StencilService(paper, this.stencilElement);
        stencilInst.initStencil();
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
        paper.on({
            'blank:pointerdown': (evt: dia.Event) => {
                scroller.startPanning(evt);
                paper.removeTools();
            },
            'cell:pointerclick': () => {
                this.setInspectorOpened(true);
            },
            'link:pointerclick': (linkView: dia.LinkView) => {
                addLinkTools(linkView)
            }
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
                    useModelGeometry: true,
                    magnet: getHaloMagnet
                })
                halo.render();
                halo.removeHandle('resize');
            }
        );
    }
}

export default RappidService;