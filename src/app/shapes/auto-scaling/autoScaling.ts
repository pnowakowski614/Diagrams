import { shapes } from '@clientio/rappid';

export class AutoScaling extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: 'app.autoScaling',
            attrs: {
                body: {
                    width: 70,
                    height: 50,
                    fill: "orange",
                },
                label: {
                    text: "Auto Scaling",
                    textAnchor: "middle",
                    refX: 35,
                    refY: -20,
                    fontSize: 10,
                    fontWeight: "bold"
                },
                leftArrow: {
                    d: "m 0 25 v 35 l -35 -35 l 35 -35 z",
                    fill: "orange"
                },
                rightArrow: {
                    d: "m 70 25 v -35 l 35 35 l -35 35 z",
                    fill: "orange"
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
            tagName: 'path',
            selector: 'leftArrow'
        },
        {
            tagName: 'path',
            selector: 'rightArrow'
        }
    ]
}

Object.assign(shapes, {
    app: {
        AutoScaling
    }
});