import { dia, shapes, ui } from "@clientio/rappid";
import StencilService from "./stencilService";
import React, { Dispatch } from "react";
import {
  addLinkTools,
  getHaloMagnet,
  getMinDimensions,
  getPreserveAspectRatio,
  getResizeDirections,
  updateGridLayout,
  updateGroupSize,
  validateConnection,
  validateEmbedding,
} from "../utils/rappid-utils";
import { CustomLink } from "../shapes";
import { haloConfig } from "../rappid-configs/haloConfig";
import ToolbarService from "./toolbarService";

export interface InspectorState {
  cell: dia.Cell | null;
  graph: dia.Graph | null;
}

class RappidService {
  paperElement: HTMLElement;
  stencilElement: HTMLElement;
  toolbarElement: HTMLElement;
  paper!: dia.Paper;
  scroller!: ui.PaperScroller;
  graph!: dia.Graph;
  halo!: ui.Halo;
  setInspectorOpened!: Dispatch<React.SetStateAction<InspectorState>>;

  constructor(
    paperElement: HTMLElement,
    stencilElement: HTMLElement,
    toolbarElement: HTMLElement
  ) {
    this.paperElement = paperElement;
    this.stencilElement = stencilElement;
    this.toolbarElement = toolbarElement;
  }

  private static initTooltip(): ui.Tooltip {
    return new ui.Tooltip({
      rootTarget: document.body,
      target: "[data-tooltip]",
      direction: ui.Tooltip.TooltipArrowPosition.Auto,
      padding: 10,
    });
  }

  private static initFreeTransform(elementView: dia.ElementView): void {
    const freeTransform = new ui.FreeTransform({
      cellView: elementView,
      allowRotation: false,
      preserveAspectRatio: getPreserveAspectRatio(elementView),
      minWidth: getMinDimensions(elementView.model),
      minHeight: getMinDimensions(elementView.model),
      resizeDirections: getResizeDirections(elementView),
    });
    freeTransform.render();
  }

  public setInspectorFunction(
    callback: Dispatch<React.SetStateAction<InspectorState>>
  ): void {
    this.setInspectorOpened = callback;
  }

  public init(): void {
    this.initCanvas();
    this.initStencil();
    this.initToolbar();
    this.initPaperEvents();
    RappidService.initTooltip();
  }

  private initCanvas() {
    const graph = (this.graph = new dia.Graph({}, { cellNamespace: shapes }));

    const paper = (this.paper = new dia.Paper({
      model: graph,
      width: 3000,
      height: 3000,
      background: {
        color: "#F8F9FA",
      },
      cellViewNamespace: shapes,
      drawGrid: true,
      gridSize: 10,
      embeddingMode: true,
      validateEmbedding: validateEmbedding,
      snapLinks: { radius: 40 },
      validateConnection: validateConnection,
      linkPinning: false,
      defaultLink: new CustomLink(),
    }));

    const scroller = (this.scroller = new ui.PaperScroller({
      paper: paper,
      cursor: "grab",
      scrollWhileDragging: true,
      autoResizePaper: true,
    }));

    this.paperElement.appendChild(scroller.el);
    this.scroller.render().center();
  }

  private initToolbar(): void {
    const toolbarInst = new ToolbarService(
      this.toolbarElement,
      this.graph,
      this.scroller
    );
    toolbarInst.initToolbar();
  }

  private initStencil(): void {
    const stencilInst = new StencilService(this.paper, this.stencilElement);
    stencilInst.initStencil();
  }

  private onChangeElementsEmbeds(element: dia.Element): void {
    updateGridLayout(element);
    updateGroupSize(element);
  }

  private onBlankPointerdown(evt: dia.Event): void {
    this.scroller.startPanning(evt);
    this.paper.removeTools();
    this.setInspectorOpened({
      cell: null,
      graph: null,
    });
  }

  private onElementPointerclick(elementView: dia.ElementView): void {
    this.paper.removeTools();
    RappidService.initFreeTransform(elementView);
    this.initHalo(elementView);
  }

  private onLinkPointerclick(linkView: dia.LinkView): void {
    this.paper.removeTools();
    addLinkTools(linkView);
    if (this.halo) {
      this.halo.remove();
    }
  }

  private onCellPointerclick(cellView: dia.CellView): void {
    this.setInspectorOpened({
      cell: cellView.model,
      graph: this.graph,
    });
  }

  private initPaperEvents(): void {
    this.paper.on({
      "blank:pointerdown": (evt: dia.Event) => {
        this.onBlankPointerdown(evt);
      },
      "element:pointerclick": (elementView: dia.ElementView) => {
        this.onElementPointerclick(elementView);
      },
      "link:pointerclick": (linkView: dia.LinkView) => {
        this.onLinkPointerclick(linkView);
      },
      "link:connect": (linkView: dia.LinkView) => {
        this.linkValidation(linkView);
      },
      "cell:pointerclick": (cellView: dia.CellView) => {
        this.onCellPointerclick(cellView);
      },
    });
    this.graph.on({
      "change:embeds": (element) => {
        this.onChangeElementsEmbeds(element);
      },
      remove: () => {
        this.setInspectorOpened({
          cell: null,
          graph: null,
        });
      },
    });
  }

  private linkValidation(linkView: dia.LinkView): void {
    const source = linkView.model.getSourceElement();
    const maxElementLinks = this.graph.getCell(source!.id).prop("maxLinks");
    const currentElementLinks = this.graph.getConnectedLinks(
      this.graph.getCell(source!.id)
    ).length;
    if (maxElementLinks < currentElementLinks) {
      linkView.model.remove();
    }
  }

  private initHalo(cellView: dia.ElementView): void {
    const halo = (this.halo = new ui.Halo({
      cellView,
      type: "toolbar",
      handles: haloConfig,
      useModelGeometry: true,
      magnet: getHaloMagnet,
    }));
    halo.render();
    this.halo.on({
      "action:fork:pointerup": () => this.validateForking(cellView.model),
    });
  }

  private validateForking(cell: dia.Element): void {
    const maxElementLinks = cell.prop("maxLinks");
    const currentElementLinks = this.graph.getConnectedLinks(cell).length;
    if (maxElementLinks <= currentElementLinks) {
      const neighborArray = this.graph.getNeighbors(cell);
      neighborArray[neighborArray.length - 1].remove();
    }
  }
}

export default RappidService;
