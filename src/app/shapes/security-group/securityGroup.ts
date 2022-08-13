import { shapes } from '@clientio/rappid';

export class SecurityGroup extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: 'app.securityGroup',
            size: {
                width: 200,
                height: 200
            },
            attrs: {
                body: {
                    fill: "transparent",
                    stroke: "blue",
                    strokeWidth: "3px"
                },
                background: {
                    fill: "blue",
                    x: "-25px",
                    width: 25,
                    height: 120,
                },
                label: {
                    text: "Security Group",
                    fill: "white",
                    transform: "translate(-20, 100) rotate(-90)",
                    textAnchor: "right",
                    refX: 5,
                    refY: 5,
                    fontSize: 10,
                    fontWeight: "bold"
                },
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
                }]
    }]
}

Object.assign(shapes, {
    app: {
        SecurityGroup
    }
});