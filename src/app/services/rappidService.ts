import { dia, shapes, ui } from '@clientio/rappid';
import StencilService from "./stencilService";
import React from "react";

class RappidService {
    paperElement: HTMLElement;
    stencilElement: HTMLElement;
    setInspectorOpened!: React.Dispatch<React.SetStateAction<boolean>>;

    constructor(paperElement: HTMLElement, stencilElement: HTMLElement) {
        this.paperElement = paperElement;
        this.stencilElement = stencilElement;
    }

    setInspectorFunction(callback: React.Dispatch<React.SetStateAction<boolean>>) {
        this.setInspectorOpened = callback;
    }

    init() {
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
    }

    initPaperEvents(paper: dia.Paper, scroller: ui.PaperScroller) {
        paper.on('blank:pointerdown', (evt) => scroller.startPanning(evt));

        paper.on('cell:pointerclick', () => {
            this.setInspectorOpened(true);
        });

        paper.on('element:pointerclick', (elementView) => {
            const freeTransform = new ui.FreeTransform({
                cellView: elementView,
                allowRotation: false,
                preserveAspectRatio: true,
            });
            freeTransform.render();
        });
    }

}

export default RappidService;