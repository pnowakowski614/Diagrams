import { shapes } from '@clientio/rappid';

export class VPC extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: 'app.VPC',
            size: {
                width: 275,
                height: 250
            },
            attrs: {
                body: {
                    refWidth: "100%",
                    refHeight: "100%",
                    fill: "transparent",
                    stroke: "green",
                    strokeWidth: "3px"
                },
                background: {
                    fill: "green",
                    x: "-25px",
                    width: 25,
                    height: 120,
                },
                label: {
                    text: "VPC",
                    fill: "white",
                    transform: "translate(-20, 100) rotate(-90)",
                    textAnchor: "right",
                    refX: 5,
                    refY: 5,
                    fontSize: 10,
                    fontWeight: "bold"
                },
                icon: {
                    href: "icons/other/cloud.png",
                    width: 20,
                    height: 20,
                    refX: -20,
                    refY: 5,
                }
            }
        }
    }

    markup = [{
        tagName: 'g',
        children:
            [{
                tagName: 'rect',
                selector: 'body',
            },
                {
                    tagName: 'rect',
                    selector: 'background'
                },
                {
                    tagName: 'text',
                    selector: 'label'
                },
                {
                    tagName: 'image',
                    selector: 'icon'
                }]
    }]
}

Object.assign(shapes, {
    app: {
        ...(shapes as any).app,
        VPC
    }
});