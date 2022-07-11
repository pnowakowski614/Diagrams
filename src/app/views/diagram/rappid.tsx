import { dia, ui, shapes } from '@clientio/rappid';

class Rappid {
    paperElement: HTMLElement;
    stencilElement: HTMLElement;
    constructor(paperElement: HTMLElement, stencilElement: HTMLElement) {
      this.paperElement = paperElement;
      this.stencilElement = stencilElement;
    }
  
    init() {
      const graph = new dia.Graph({}, { cellNamespace: shapes });
  
      const paper = new dia.Paper({
          model: graph,
          width: '100%',
          height: '100%',
          background: {
          color: '#F8F9FA',
          },
          cellViewNamespace: shapes,
          drawGrid: true,
          gridSize: 10,
      });
  
      const scroller = new ui.PaperScroller({
          paper,
          cursor: 'grab',
          scrollWhileDragging: true,
      });

        const c = new shapes.basic.Circle({
            position: { x: 70, y: 10 }, size: { width: 50, height: 30 }
        });

      const stencil = new ui.Stencil({
          paper,
          groups: {
              basic: {
                  label: 'Shapes',
                  index: 1
              }
          }
      });


      this.paperElement.appendChild(scroller.el);
      scroller.render();
      this.stencilElement.appendChild(stencil.el);
      stencil.render();

      paper.on('blank:pointerdown', (evt) => scroller.startPanning(evt));
      stencil.loadGroup([c], 'basic');
    }
  }

  export default Rappid;