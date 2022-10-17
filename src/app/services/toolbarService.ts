import { dia, layout, ui } from "@clientio/rappid";
import { postInJSON } from "../API/fetchMethods";

class ToolbarService {
    toolbarElement: HTMLElement;
    toolbar!: ui.Toolbar;
    graph!: dia.Graph;
    paperScroller!: ui.PaperScroller;

    constructor(toolbarElement: HTMLElement, graph: dia.Graph, paperScroller: ui.PaperScroller) {
        this.toolbarElement = toolbarElement;
        this.graph = graph;
        this.paperScroller = paperScroller;
    }

    public initToolbar(): void {
        const commandManager = new dia.CommandManager({
            graph: this.graph
        });

        this.toolbar = new ui.Toolbar({
            tools: [
                {type: 'inputText', name: "diagramName", label: "Name diagram: ", value: "Diagram Name"},
                {type: 'separator', width: "10px"},
                'undo',
                'redo',
                'separator',
                'zoomIn',
                'zoomOut',
                'zoomToFit',
                'zoomSlider',
                'separator',
                {type: 'button', name: 'treeLayout', text: 'Tree Layout'},
                'separator',
                {type: 'button', name: 'save', text: 'Save Diagram'},
                'separator',
                {type: 'button', name: 'clear', text: 'Clear Diagram'},
            ],
            references: {
                paperScroller: this.paperScroller,
                commandManager: commandManager
            }
        });

        const treeLayout = new layout.TreeLayout({
            graph: this.graph,
            parentGap: 100,
            siblingGap: 100,
            updatePosition: (element, position, opt) => {
                if (element.prop("embeds")) {
                    element.position(position.x, position.y, {deep: true})
                } else element.set("position", position, opt)
            },
            updateVertices: (link) => {
                link.vertices();
            }
        });

        this.toolbar.on('save:pointerclick', () => {
            const diagramName: string = this.toolbar.getWidgetByName("diagramName").el.querySelector("input")!.value;
            this.graph.set('diagramName', diagramName);
            postInJSON(this.graph);
        })

        this.toolbar.on('clear:pointerclick', () => {
            const cells = this.graph.getCells();
            this.graph.removeCells(cells);
        })

        this.toolbar.on('treeLayout:pointerclick', () => {
            treeLayout.layout({deep: true, parentRelative: true});
        })

        this.toolbarElement.appendChild(this.toolbar.el);
        this.toolbar.render();
    }
}

export default ToolbarService;
