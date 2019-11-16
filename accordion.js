var Accordion = (function(){

  /**
   * Função construtora do Accordion
   * @param {string} id 
   * @param {string} cssClass 
   */
  function Accordion(id, cssClass){
    this.id = id;
    this.cssClass = cssClass;
    this.items = [];
    this.itemsIds = [];
    this.init();
  }
  
  Accordion.prototype.init = function(){
  
    const el = document.querySelector(this.id);
    if(!el) throw new Error('Element not exists');
  
    this.element = el;
  
    this.element.addEventListener('click', function(e){
   
      if(e.target.matches(`.btn-accordion`)){
        const id =  e.target.closest('.accordion-item').getAttribute('id');
        const item = this.items.find(el => el.id === `#${id}`);
        if(item !== -1){
          item.toggle();
        }
      }
  
    }.bind(this)); 
    // bind do this da funcao para ser apontado para o objeto Accordion
  
  
  }

  Accordion.prototype.add = function(id, title, body, cssClass){
  
    if(!this.element) throw new Error('Accordion not exists');
  
    const itemObj = new AccordionItem(this.element, id, title, body, cssClass);
    itemObj.validate();
  
    const layout = itemObj.create();
  
    this.items.push(itemObj);
  
    this.element.insertAdjacentHTML('beforeend', layout);
  
    const itemEl = document.querySelector(id);
  
    itemObj.element = itemEl;
  
  }
  
  

  /**
   * Função construtora de um item do Accordion
   * @param {HTMLElement} parent 
   * @param {string} id 
   * @param {string} title 
   * @param {string} body 
   * @param {string} cssClass 
   */
  function AccordionItem(parent, id, title, body, cssClass = ''){
  
    this.parent = parent;
  
    this.id = id;
  
    this.title = title;
  
    this.body = body;
  
    this.cssClass = cssClass;
  
  }
  
  /**
   * Retorna layout preenchido do item do accordion
   */
  AccordionItem.prototype.create = function(){



    const markup = 
    `
    <div id=${this.id.replace('#','')} class='accordion-item ${this.cssClass}'>
      <a class="btn-accordion" href="javascript:void(0)">
        ${this.title}
      </a>
      <div class="accordion-panel">
        ${this.body}
      </div>
    </div>
    `;
  
    return markup;
    
    
  }
  
  /**
   * Abre ou fecha o item do accordion
   */
  AccordionItem.prototype.toggle = function(){
  
    const panel = this.element.querySelector('.accordion-panel');
    if (panel.style.maxHeight) {
      this.element.classList.remove('open');
      panel.style.maxHeight = null;
    }else{
      this.element.classList.add('open');
      panel.style.maxHeight = panel.scrollHeight + "px";
    }  
  }

  /**
   * Valida se foi passado id que sera usado no item do accordion
   * Valida se foi passado a qual accordion este item pertence
   */
  AccordionItem.prototype.validate = function(){
    if(!this.id) throw new Error('Enter an ID for the accordion item element');
    if(!this.parent) throw new Error('Please enter the parent element of the item.');
  }


  return Accordion;
})();
















