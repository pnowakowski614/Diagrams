import { shapes } from '@clientio/rappid';

class Block extends shapes.standard.Rectangle {
    constructor(text: string) {
        super();
        this.size(40, 40);
        this.attr({
            label: {
                text,
            }
        })
    }
}

export const block = new Block("block");
export const textArea = new shapes.standard.TextBlock();
export const image = new shapes.standard.InscribedImage({
    attrs: {
        image: {
            xlinkHref: "../public/logo512.png",
        },
        label: {
            text: "image",
        }
    }
});
export const block3 = new Block("block3");
export const block4 = new Block("block4");
