import { shapes } from '@clientio/rappid';

export class Node extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: 'app.node',
            size: {
                width: 45,
                height: 45,
            },
            attrs: {
                label: {
                    text: "default",
                    textAnchor: "right",
                    refX: 55,
                    refY: 15,
                    fontSize: 14,
                    fontWeight: "bold"
                },
                icon: {
                    href: "link"
                }
            }
        }
    }

    markup = [{
        tagName: 'rect',
        selector: 'body',
    },
        {
            tagName: 'text',
            selector: 'label'
        },
        {
            tagName: "image",
            selector: "icon",
            attributes: {
                width: 45,
                height: 45,
            }
        }]
}