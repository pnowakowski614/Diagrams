import { dia, ui } from "@clientio/rappid";

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

        this.toolbarElement.appendChild(this.toolbar.el);
        this.toolbar.render();
    }
}

export default ToolbarService;
