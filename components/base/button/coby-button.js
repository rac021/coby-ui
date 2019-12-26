 class Button extends HTMLElement {

   constructor() { 
      super()    ;
      this.attachShadow({ 'mode': 'open' }) ;
      this._id    = "coby-button-id"        ;
      this._title = "coby-button-title"     ;
      this.event  = "coby-eventType"        ;
      this._style = "background:linear-gradient(to right, #00d2ff 0%, #3a7bd5 51%, #00d2ff 100%); " ;
   }

   connectedCallback() { 

     if( this.hasAttribute('_id') ) {
	       this._id = this.getAttribute('_id');
     } else     {
        this._id =  Math.random()
                        .toString(36)
                        .substr(2, 9) ;
    }

    if( this.hasAttribute('_title') ) {
      	this._title = this.getAttribute('_title');
     }
   
    if( this.hasAttribute('event') ) {
	      this.event = this.getAttribute('event');
     }

     if( this.hasAttribute('_style') ) {
	      this._style += this.getAttribute('_style') ;
     }

     this.shadowRoot.innerHTML =  `
            
          <link href="components/base/button/coby-button.css" rel="stylesheet" />

          <button type="button" 
                  id="${this._id}"
                  class="gradient-button gradient-button"
                  style="${this._style} ;">
              </a>${this._title} </a> </button <br />
     ` ;

     this.shadowRoot
         .getElementById( this._id )
         .onclick = _ => {             
               window.dispatchEvent( new Event( this.event , 
                                                {  bubbles: true , 
                                                   composed: true } ) ) ;
         } ;
   }
 }

 customElements.define("coby-button", Button ) ;

 
