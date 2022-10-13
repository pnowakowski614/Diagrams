import { dia, shapes, ui } from '@clientio/rappid';
import StencilService from "./stencilService";
import React, { Dispatch } from "react";
import {
    addLinkTools,
    getHaloMagnet,
    getMinDimensions,
    getPreserveAspectRatio,
    getResizeDirections,
    validateConnection,
    validateEmbedding
} from "../utils/rappid-utils";
import { CustomLink } from "../shapes";
import { haloConfig } from "../rappid-configs/haloConfig";

export interface InspectorState {
    isOpened: boolean;
    cellView: dia.CellView | null;
    graph: dia.Graph | null;
}

class RappidService {
    paperElement: HTMLElement;
    stencilElement: HTMLElement;
    paper!: dia.Paper;
    scroller!: ui.PaperScroller;
    graph!: dia.Graph;
    setInspectorOpened!: Dispatch<React.SetStateAction<InspectorState>>;

    constructor(paperElement: HTMLElement, stencilElement: HTMLElement) {
        this.paperElement = paperElement;
        this.stencilElement = stencilElement;
    }

    public setInspectorFunction(callback: Dispatch<React.SetStateAction<InspectorState>>): void {
        this.setInspectorOpened = callback;
    }

    public init(): void {
        this.initCanvas();
        this.initStencil();
        this.initPaperEvents();
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
            defaultLink: new CustomLink()
        });

        const scroller = this.scroller = new ui.PaperScroller({
            paper: paper,
            cursor: 'grab',
            scrollWhileDragging: true,
            autoResizePaper: true,
        });

        this.paperElement.appendChild(scroller.el);
        this.scroller.render().center();
    }

    private initStencil(): void {
        const stencilInst = new StencilService(this.paper, this.stencilElement);
        stencilInst.initStencil();
    }

    private static initTooltip(): ui.Tooltip {
        return new ui.Tooltip({
            rootTarget: document.body,
            target: '[data-tooltip]',
            direction: ui.Tooltip.TooltipArrowPosition.Auto,
            padding: 10
        });
    }

    private initPaperEvents(): void {
        this.paper.on({
            'blank:pointerdown': (evt: dia.Event) => {
                this.scroller.startPanning(evt);
                this.paper.removeTools();
                this.setInspectorOpened({
                    isOpened: false,
                    cellView: null,
                    graph: null
                });
            },
            'element:pointerclick': (elementView: dia.ElementView) => {
                this.paper.removeTools();
                RappidService.initFreeTransform(elementView);
                RappidService.initHalo(elementView);
            },
            'link:pointerclick': (linkView: dia.LinkView) => {
                this.paper.removeTools();
                addLinkTools(linkView);
            },
            'link:connect': (linkView: dia.LinkView) => {
                this.linkValidation(linkView);
            },
            'cell:pointerclick': (cellView: dia.CellView) => {
                this.setInspectorOpened({
                    isOpened: true,
                    cellView,
                    graph: this.graph
                });
            }
        });
    }

    private linkValidation(linkView: dia.LinkView): void {
        const source = linkView.model.getSourceElement();
        const maxElementLinks = this.graph.getCell(source!.id).prop("maxLinks");
        const currentElementLinks = this.graph.getConnectedLinks(this.graph.getCell(source!.id)).length;
        if (maxElementLinks < currentElementLinks) {
            linkView.model.remove();
        }
    }

    private static initFreeTransform(elementView: dia.ElementView): void {
        const freeTransform = new ui.FreeTransform({
            cellView: elementView,
            allowRotation: false,
            preserveAspectRatio: getPreserveAspectRatio(elementView),
            minWidth: getMinDimensions(elementView),
            minHeight: getMinDimensions(elementView),
            resizeDirections: getResizeDirections(elementView)
        });
        freeTransform.render();
    }


    private static initHalo(cellView: dia.CellView): void {
        const halo = new ui.Halo({
            cellView,
            type: 'toolbar',
            handles: haloConfig,
            useModelGeometry: true,
            magnet: getHaloMagnet
        })
        halo.render();
    }
}

export default RappidService;
