import '@clientio/rappid';
import { ui } from "@clientio/rappid";
import * as shape from '../../../../shapes/shapes';

class Stencil {
    paperScroller: ui.PaperScroller;
    stencilElement: HTMLElement;
    stencil!: ui.Stencil;

    constructor(paperScroller: ui.PaperScroller, stencilElement: HTMLElement) {
        this.paperScroller = paperScroller;
        this.stencilElement = stencilElement;
    }

    initStencil() {
        this.stencil = new ui.Stencil({
            paper: this.paperScroller,
            groups: this.setGroups(),
            layout: {
                columns: 1,
                marginX: 40,
            },
            groupsToggleButtons: true
        });

        this.stencilElement.appendChild(this.stencil.el);
        this.stencil.render();
        this.stencil.load({
            common:
                [shape.block, shape.textArea, shape.image],
            compute:
                [shape.block3],
            containers:
                [shape.block4]
        });

        // this.stencil.on('element:drop', (elementView) => {
        //     elementView.selectors.label.textContent = "";
        // })
    }

    setGroups() {
        return {
            common: {
                label: 'Common',
                index: 1
            },
            compute: {
                label: 'Compute',
                index: 2
            },
            containers: {
                label: 'Containers',
                index: 3
            },
            networking: {
                label: 'Networking and Content Delivery',
                index: 4
            },
            storage: {
                label: "Storage",
                index: 5
            },
            database: {
                label: "Database",
                index: 6
            },
            misc: {
                label: "Misc",
                index: 7
            }
        }
    }
}

export default Stencil;