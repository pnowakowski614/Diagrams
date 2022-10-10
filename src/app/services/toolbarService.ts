import { dia, layout, ui } from "@clientio/rappid";

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
                {type: 'button', name: 'treeLayout', text: 'Tree Layout'},
                'separator',
                'undo',
                'redo',
                'separator',
                'zoomIn',
                'zoomOut',
                'zoomSlider',
                'separator',
                {type: 'button', name: 'save', text: 'Save Diagram'},
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
            updateVertices: (link) => {
                link.vertices();
            }
        });

        this.toolbar.on('save:pointerclick', () => {
            const graphJSON = this.graph.toJSON();
            const jsonString = JSON.stringify(graphJSON);

            fetch('http://localhost:7000/graphs', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: jsonString
            }).then(() =>
                console.log("diagram saved")
            )
        })

        this.toolbar.on('treeLayout:pointerclick', () => {
            treeLayout.layout({deep: true, parentRelative: true});
        })

        this.toolbarElement.appendChild(this.toolbar.el);
        this.toolbar.render();
    }
}

export default ToolbarService;
