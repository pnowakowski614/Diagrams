import { shapes } from '@clientio/rappid';

export class node extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: 'app.node',
            attrs: {
                body: {
                    width: 45,
                    height: 45
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
                    width: 45,
                    height: 45,
                    href: "link"
                }
            }
        }
    }

    markup = [
        {
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
        Node
    }
});