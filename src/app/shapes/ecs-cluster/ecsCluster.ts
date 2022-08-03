import { shapes } from '@clientio/rappid';

export class ecsCluster extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: 'app.ecsCluster',
            attrs: {
                body: {
                    width: 200,
                    height: 200,
                    fill: "#9c9e9a",
                    stroke: "black"
                },
                label: {
                    text: "ECS Cluster",
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
        ecsCluster
    }
});