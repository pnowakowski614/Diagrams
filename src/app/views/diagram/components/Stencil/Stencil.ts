import '@clientio/rappid';
import { dia, ui } from "@clientio/rappid";
import * as node from '../../../../shapes/Node';

class Stencil {
    paper: dia.Paper;
    stencilElement: HTMLElement;
    stencil!: ui.Stencil;

    constructor(paper: dia.Paper, stencilElement: HTMLElement) {
        this.paper = paper;
        this.stencilElement = stencilElement;
    }

    initStencil() {
        this.stencil = new ui.Stencil({
            paper: this.paper,
            groups: this.setGroups(),
            label: "Elements",
            layout: {
                marginX: -13,
                columns: 1,
                rowHeight: 65
            },
            groupsToggleButtons: true,
            dragStartClone: this.cloneNode,
            dragEndClone: this.cloneNode
        });

        this.stencilElement.appendChild(this.stencil.el);
        this.stencil.render();
        this.stencil.load({
            analytics:
                [node.kinesisStreamNode, node.redshiftNode, node.dataPipelineNode],
            appIntegration:
                [node.amazonSNSNode, node.amazonSQSNode],
            compute:
                [node.lambdaNode, node.batchNode],
            containers:
                [],
            database:
                [node.auroraNode, node.dynamoDBNode],
            endUser:
                [node.appStreamNode, node.workspacesNode],
            management:
                [node.cloudwatchNode, node.cloudtrailNode],
            networking:
                [node.route53Node, node.privateLinkNode],
            security:
                [node.wafNode, node.shieldNode, node.securityHubNode],
            storage:
                [node.backupNode, node.snowballNode]
        });
    }

    cloneNode(el: dia.Cell) {
        let clone = el.clone();
        clone.attr({
            label: {
                text: "",
            }
        })

        if (el.attributes.attrs?.prop?.elementType === "Node") {
            // @ts-ignore
            clone.markup[2].attributes.href = el.markup[2].attributes.href
        }
        return clone;
    }

    setGroups() {
        return {
            analytics: {
                label: 'Analytics',
                index: 1
            },
            appIntegration: {
                label: 'App Integration',
                index: 2,
                closed: true
            },
            compute: {
                label: 'Compute',
                index: 3,
                closed: true,
            },
            containers: {
                label: 'Containers',
                index: 4,
                closed: true,
            },
            database: {
                label: "Database",
                index: 5,
                closed: true,
            },
            endUser: {
                label: "End User Computing",
                index: 6,
                closed: true
            },
            management: {
                label: "Management",
                index: 7,
                closed: true
            },
            networking: {
                label: "Networking",
                index: 8,
                closed: true
            },
            security: {
                label: "Security",
                index: 9,
                closed: true
            },
            storage: {
                label: "Storage",
                index: 10,
                closed: true
            },
        }
    }
}

export default Stencil;