import { dia, layout, ui } from "@clientio/rappid";
import { filterDiagramInfo } from "../utils/parser-utils";
import store from "../store/store";
import {
  changeIsDiagramSaved,
  clearCurrentDiagram,
  updateDiagram,
} from "../store/diagramsSlice";

class ToolbarService {
  toolbarElement: HTMLElement;
  toolbar!: ui.Toolbar;
  graph!: dia.Graph;
  paperScroller!: ui.PaperScroller;
  treeLayout!: layout.TreeLayout;

  constructor(
    toolbarElement: HTMLElement,
    graph: dia.Graph,
    paperScroller: ui.PaperScroller
  ) {
    this.toolbarElement = toolbarElement;
    this.graph = graph;
    this.paperScroller = paperScroller;
  }

  public initToolbar(): void {
    const commandManager = new dia.CommandManager({
      graph: this.graph,
    });

    this.toolbar = new ui.Toolbar({
      tools: [
        "separator",
        "undo",
        "redo",
        "separator",
        { type: "zoomIn", name: "zoomIn", step: 0.2, min: 0.2, max: 2 },
        { type: "zoomOut", name: "zoomOut", step: 0.2, min: 0.2, max: 2 },
        { type: "zoomToFit", name: "toFit", step: 0.2, min: 0.2, max: 2 },
        {
          type: "zoomSlider",
          name: "zoomSlider",
          step: 20,
          min: 20,
          max: 200,
        },
        "separator",
        { type: "button", name: "treeLayout", text: "Tree Layout" },
        "separator",
        { type: "button", name: "save", text: "Save Diagram" },
        "separator",
        { type: "button", name: "clear", text: "Clear Diagram" },
      ],
      references: {
        paperScroller: this.paperScroller,
        commandManager: commandManager,
      },
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
          element.position(position.x, position.y, { deep: true });
        } else element.set("position", position, opt);
      },
      updateVertices: (link) => {
        link.vertices();
      },
    });
  }

  private onSavePointerClick(): void {
    const diagramName = store.getState().diagrams.diagramName;
    const cells = filterDiagramInfo(this.graph);
    const id = store.getState().diagrams.diagramId;
    store.dispatch(updateDiagram({ cells, diagramName, id }));
    store.dispatch(changeIsDiagramSaved());
  }

  private onClearPointerClick(): void {
    this.graph.clear();
    store.dispatch(clearCurrentDiagram());
  }

  private initToolbarEvents(): void {
    this.toolbar.on({
      "save:pointerclick": () => this.onSavePointerClick(),
      "clear:pointerclick": () => this.onClearPointerClick(),
      "treeLayout:pointerclick": () => {
        this.treeLayout.layout({ deep: true, parentRelative: true });
      },
    });
  }
}

export default ToolbarService;
