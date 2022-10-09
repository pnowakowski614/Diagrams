import { dia, layout, shapes, ui } from '@clientio/rappid';
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
import ToolbarService from "./toolbarService";

export interface InspectorState {
    isOpened: boolean;
    cellView: dia.CellView | null;
    graph: dia.Graph | null;
}

class RappidService {
    paperElement: HTMLElement;
    stencilElement: HTMLElement;
    toolbarElement: HTMLElement;
    paper!: dia.Paper;
    scroller!: ui.PaperScroller;
    graph!: dia.Graph;
    setInspectorOpened!: Dispatch<React.SetStateAction<InspectorState>>;

    constructor(paperElement: HTMLElement, stencilElement: HTMLElement, toolbarElement: HTMLElement) {
        this.paperElement = paperElement;
        this.stencilElement = stencilElement;
        this.toolbarElement = toolbarElement;
    }

    public setInspectorFunction(callback: Dispatch<React.SetStateAction<InspectorState>>): void {
        this.setInspectorOpened = callback;
    }

    public init(): void {
        this.initCanvas();
        this.initStencil();
        this.initToolbar();
        this.initPaperEvents();
        this.initGridLayout();
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
        scroller.render().center();
    }

    private initToolbar(): void {
        const toolbarInst = new ToolbarService(this.toolbarElement, this.graph, this.scroller);
        toolbarInst.initToolbar();
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

    private initGridLayout(): void {
        this.graph.on('change:embeds', (element) => {
            const padding = 25;

            layout.GridLayout.layout(element.getEmbeddedCells(), {
                columns: 3,
                parentRelative: true,
                rowGap: padding,
                columnGap: 30,
                marginX: padding,
                marginY: padding
            });
        })
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
        const sourceId = linkView.model.source().id as dia.Cell.ID;
        const maxElementLinks = this.graph.getCell(sourceId).prop("maxLinks");
        const currentElementLinks = this.graph.getConnectedLinks(this.graph.getCell(sourceId)).length;
        if (maxElementLinks < currentElementLinks || maxElementLinks === undefined) {
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
