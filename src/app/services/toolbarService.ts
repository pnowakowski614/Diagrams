import { dia, layout, ui } from "@clientio/rappid";
import { filterDiagramInfo } from "../utils/rappid-utils";
import store from "../store/store";
import { updateDiagram } from "../store/updateDiagramSlice";

class ToolbarService {
    toolbarElement: HTMLElement;
    toolbar!: ui.Toolbar;
    graph!: dia.Graph;
    paperScroller!: ui.PaperScroller;
    treeLayout!: layout.TreeLayout;

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
                'separator',
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

        this.initTreeLayout();
        this.initToolbarEvents();
        this.toolbarElement.appendChild(this.toolbar.el);
        this.toolbar.render();
    }

    private initTreeLayout(): void {
        this.treeLayout = new layout.TreeLayout({
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
    }

    private initToolbarEvents(): void {
        this.toolbar.on({
                'save:pointerclick': async () => {
                    const graphJSON = filterDiagramInfo(this.graph);
                    const cells = JSON.stringify(graphJSON);
                    const id = store.getState().singleDiagram.id;
                    const diagramName = store.getState().singleDiagram.diagramName;
                    store.dispatch(updateDiagram({cells, diagramName, id}));
                },
                'clear:pointerclick': () => {
                    const cells = this.graph.getCells();
                    this.graph.removeCells(cells);
                },
                'treeLayout:pointerclick': () => {
                    this.treeLayout.layout({deep: true, parentRelative: true});
                }
            }
        )
    }
}

export default ToolbarService;
