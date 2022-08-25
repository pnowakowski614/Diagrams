import { shapes } from '@clientio/rappid';

export class Subnet extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: 'app.subnet',
            size: {
                width: 275,
                height: 250
            },
            attrs: {
                body: {
                    refWidth: "100%",
                    refHeight: "100%",
                    fill: "transparent",
                    stroke: "turquoise",
                    strokeWidth: "3px"
                },
                background: {
                    fill: "turquoise",
                    x: "-25px",
                    width: 25,
                    refHeight: "70%",
                },
                label: {
                    text: "Subnet",
                    fill: "white",
                    transform: "translate(-20, 100) rotate(-90)",
                    textAnchor: "right",
                    refX: 3,
                    refY: -30,
                    fontSize: 10,
                    fontWeight: "bold"
                },
                icon: {
                    href: "icons/other/lock.png",
                    width: 15,
                    height: 15,
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
                    tagName: 'image',
                    selector: 'icon'
                },
                {
                    tagName: 'text',
                    selector: 'label'
                }]
    }]
}

Object.assign(shapes, {
    app: {
        ...(shapes as any).app,
        Subnet
    }
});