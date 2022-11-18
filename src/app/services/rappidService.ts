import { dia, shapes, ui } from '@clientio/rappid';
import StencilService from "./stencilService";
import React, { Dispatch } from "react";
import {
    addLinkTools,
    defaultShapeLabelAttrs,
    getHaloMagnet,
    getMinDimensions,
    getPreserveAspectRatio,
    getResizeDirections,
    updateGridLayout,
    updateGroupSize,
    validateConnection,
    validateEmbedding
} from "../utils/rappid-utils";
import { AutoScaling, CustomLink, ECSCluster, ECSService, NodeShape, SecurityGroup, Subnet, VPC } from "../shapes";
import { haloConfig } from "../rappid-configs/haloConfig";
import ToolbarService from "./toolbarService";
import { GlobalShapesTypes } from "../types/enums";
import store from "../store/store";
import { omit } from "lodash";
import { Region } from "../shapes/region";

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
    halo!: ui.Halo;
    setInspectorOpened!: Dispatch<React.SetStateAction<InspectorState>>;

    constructor(paperElement: HTMLElement, stencilElement: HTMLElement, toolbarElement: HTMLElement) {
        this.paperElement = paperElement;
        this.stencilElement = stencilElement;
        this.toolbarElement = toolbarElement;
    }

    public setInspectorFunction(callback: Dispatch<React.SetStateAction<InspectorState>>): void {
        this.setInspectorOpened = callback;
    }

    public getGraphFromDB(graph: dia.Graph): void {
        const diagramCells: Array<any> = store.getState().diagrams.currentDiagram!;
        diagramCells.forEach(cell => {
            const createCell = (() => {
                switch (cell.type) {
                    case GlobalShapesTypes.NodeShape: {
                        const newShape = new NodeShape(omit(cell, ["text", "icon", "groupShapeColor"]));
                        newShape.attr({
                            label: {
                                ...defaultShapeLabelAttrs,
                                text: cell.text,
                            },
                            icon: {
                                href: cell.icon
                            }
                        })
                        return newShape;
                    }
                    case GlobalShapesTypes.AutoScaling: {
                        const newShape = new AutoScaling(omit(cell, ["text", "icon", "groupShapeColor"]));
                        newShape.attr({
                            label: {
                                text: cell.text,
                            }
                        })
                        return newShape;
                    }
                    case GlobalShapesTypes.EcsCluster: {
                        const newShape = new ECSCluster(omit(cell, ["text", "icon", "groupShapeColor"]));
                        newShape.attr({
                            label: {
                                text: cell.text,
                            }
                        })
                        return newShape;
                    }
                    case GlobalShapesTypes.EcsService: {
                        const newShape = new ECSService(omit(cell, ["text", "icon", "groupShapeColor"]));
                        newShape.attr({
                            label: {
                                text: cell.text,
                            }
                        })
                        return newShape;
                    }
                    case GlobalShapesTypes.SecurityGroup: {
                        const newShape = new SecurityGroup(omit(cell, ["text", "icon", "groupShapeColor"]));
                        newShape.attr({
                            body: {
                                stroke: cell.groupShapeColor
                            },
                            background: {
                                fill: cell.groupShapeColor
                            },
                            label: {
                                text: cell.text,
                            }
                        })
                        return newShape;
                    }
                    case GlobalShapesTypes.Subnet: {
                        const newShape = new Subnet(omit(cell, ["text", "icon", "groupShapeColor"]));
                        newShape.attr({
                            body: {
                                stroke: cell.groupShapeColor
                            },
                            background: {
                                fill: cell.groupShapeColor
                            },
                            label: {
                                text: cell.text,
                            }
                        })
                        return newShape;
                    }
                    case GlobalShapesTypes.Region: {
                        const newShape = new Region(omit(cell, ["text", "icon", "groupShapeColor"]));
                        newShape.attr({
                            body: {
                                stroke: cell.groupShapeColor
                            },
                            background: {
                                fill: cell.groupShapeColor
                            },
                            label: {
                                text: cell.text,
                            }
                        })
                        return newShape;
                    }
                    case GlobalShapesTypes.VPC: {
                        const newShape = new VPC(omit(cell, ["text", "icon", "groupShapeColor"]));
                        newShape.attr({
                            body: {
                                stroke: cell.groupShapeColor
                            },
                            background: {
                                fill: cell.groupShapeColor
                            },
                            label: {
                                text: cell.text,
                            }
                        })
                        return newShape;
                    }
                    default: {
                        const newLink = new CustomLink(omit(cell, ["linkColor"]));
                        newLink.attr({
                            line: {
                                stroke: cell.linkColor
                            }
                        })
                        return newLink;
                    }
                }
            })

            const cellToAdd = createCell();
            graph.addCell(cellToAdd);
        })
    }

    public init(): void {
        this.initCanvas();
        this.initStencil();
        this.initToolbar();
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

    private OnChangeElementsEmbeds(element: dia.Element): void {
        updateGridLayout(element);
        updateGroupSize(element);
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
                this.initHalo(elementView);
                this.halo.on('action:fork:pointerup', () => this.validateForking(elementView.model));
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
        this.graph.on('change:embeds', (element) => {
            this.OnChangeElementsEmbeds(element);
        })
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
            minWidth: getMinDimensions(elementView.model),
            minHeight: getMinDimensions(elementView.model),
            resizeDirections: getResizeDirections(elementView)
        });
        freeTransform.render();
    }

    private initHalo(cellView: dia.CellView): void {
        const halo = this.halo = new ui.Halo({
            cellView,
            type: 'toolbar',
            handles: haloConfig,
            useModelGeometry: true,
            magnet: getHaloMagnet
        })
        halo.render();
    }

    private validateForking(cell: dia.Element): void {
        const maxElementLinks = cell.prop("maxLinks");
        const currentElementLinks = this.graph.getConnectedLinks(cell).length;
        if (maxElementLinks <= currentElementLinks) {
            const neighborArray = this.graph.getNeighbors(cell)
            neighborArray[neighborArray.length - 1].remove();
        }
    }
}

export default RappidService;
