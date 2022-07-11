import { dia, ui, shapes } from '@clientio/rappid';

class Rappid {
    paperElement: HTMLElement;
  
    constructor(paperElement: HTMLElement) {
      this.paperElement = paperElement
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
          cellViewNamespace: shapes
      });
  
      const scroller = new ui.PaperScroller({
          paper,
          autoResizePaper: true,
          cursor: 'grab'
      });

      // const stencil = new ui.Stencil({
      //     paper,
      //     width: 200,
      //     height: 300
      // });

      this.paperElement.appendChild(scroller.el);
      scroller.render();

    }
  }

  export default Rappid;