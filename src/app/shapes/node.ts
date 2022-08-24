import { shapes } from '@clientio/rappid';

export class Node extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: 'app.Node',
            size: {
                width: 45,
                height: 45
            },
            attrs: {
                root: {
                    dataTooltip: "default"
                },
                body: {
                    refWidth: "100%",
                    refHeight: "100%",
                },
                label: {
                    text: "default",
                    textAnchor: "right",
                    refX: 55,
                    refY: 15,
                    fontSize: 14,
                    fontWeight: "bold"
                },
                icon: {
                    refWidth: "100%",
                    refHeight: "100%",
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
        }]
}

Object.assign(shapes, {
    app: {
        ...(shapes as any).app,
        Node
    }
});