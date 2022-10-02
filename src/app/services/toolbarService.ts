import { ui } from "@clientio/rappid";

class ToolbarService {
    toolbarElement: HTMLElement;
    toolbar!: ui.Toolbar;

    constructor(toolbarElement: HTMLElement) {
        this.toolbarElement = toolbarElement;
    }

    public initToolbar(): void {
        this.toolbar = new ui.Toolbar({
            tools: [
                {type: 'checkbox'},
                {type: 'range', name: 'slider', min: 0, max: 10, step: 1},
                {type: 'separator'},
                {type: 'toggle', name: 'toggle', label: ''},
                'separator',
                {type: 'inputText'},
                {type: 'button', name: 'ok', text: 'Ok'},
                {type: 'button', name: 'cancel', text: 'Cancel'},
                {type: 'separator'}
            ]
        });

        this.toolbarElement.appendChild(this.toolbar.el);
        this.toolbar.render();
    }
}

export default ToolbarService;
