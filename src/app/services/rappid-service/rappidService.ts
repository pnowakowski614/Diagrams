import { dia, shapes, ui } from '@clientio/rappid';
import StencilService from "../stencil-service/stencilService";

class RappidService {
    paperElement: HTMLElement;
    stencilElement: HTMLElement;
    setInspectorOpened!: Function;

    constructor(paperElement: HTMLElement, stencilElement: HTMLElement) {
        this.paperElement = paperElement;
        this.stencilElement = stencilElement;
    }

    setInspectorFunction(callback: Function) {
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

        paper.on('cell:pointerclick', () => {
            this.setInspectorOpened(true);
        });

        paper.on('cell:pointerclick', (cellView) => {
            console.log(cellView);
            if (cellView.model instanceof dia.Link) return;
            const freeTransform = new ui.FreeTransform({
                cellView,
                allowRotation: false,
            });
            console.log(freeTransform);
            freeTransform.render();
        });

        this.paperElement.appendChild(scroller.el);
        scroller.render().center();

        paper.on('blank:pointerdown', (evt) => scroller.startPanning(evt));
        const stencilInst = new StencilService(paper, this.stencilElement);
        stencilInst.initStencil();
    }
}

export default RappidService;