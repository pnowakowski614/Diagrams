import { shapes } from '@clientio/rappid';

export class ECSService extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: 'app.ECSService',
            attrs: {
                body: {
                    width: 140,
                    height: 140,
                    fill: "white",
                    stroke: "black"
                },
                label: {
                    text: "ECS Service",
                    textAnchor: "right",
                    refX: 5,
                    refY: 5,
                    fontSize: 10,
                    fontWeight: "bold"
                },
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
        }]
}

Object.assign(shapes, {
    app: {
        ECSService
    }
});