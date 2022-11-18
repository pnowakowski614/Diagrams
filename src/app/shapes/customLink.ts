import { dia } from '@clientio/rappid';
import { GlobalShapesTypes } from "../types/enums";

export class CustomLink extends dia.Link {
    defaults() {
        return {
            ...super.defaults,
            type: GlobalShapesTypes.CustomLink,
            attrs: {
                line: {
                    connection: true,
                    stroke: 'brown',
                    strokeWidth: 2,
                    strokeLinejoin: 'round',
                    fill: 'none',
                    targetMarker: {
                        d: 'M 10 -5 0 0 10 5 z'
                    }
                },
                wrapper: {
                    connection: true,
                    strokeWidth: 15,
                    fill: 'none',
                    cursor: 'pointer',
                    stroke: 'transparent'
                }
            },
            router: {
                name: "manhattan",
            },
            connector: {
                name: 'rounded',
            }
        }
    }

    markup = [
        {
            tagName: 'path',
            selector: 'line'
        },
        {
            tagName: 'path',
            selector: 'wrapper'
        }
    ]
}
