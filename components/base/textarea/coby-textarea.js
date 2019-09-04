
 class Textarea  extends HTMLElement {

   constructor() { 
      super()    ;
      this.attachShadow({ 'mode': 'open' });
      this._id = "coby-textarea-id" ;
      this._name = "coby-textarea-name" ;
      this.eventType = "coby-textarea-event-type" ;
      this.readonly = "" ;
      this._style="background:black; padding:0.5em; " ;

    }

   connectedCallback() { 

     if( this.hasAttribute('_id') ) {
      	this._id = this.getAttribute('_id');
     }
     
     if( this.hasAttribute('_name') ) {
       	this._name = this.getAttribute('_name');
     }

     if( this.hasAttribute('eventType') ) {
      	this.eventType = this.getAttribute('eventType');
     }

     if( this.hasAttribute('_style') ) {
      this._style += this.getAttribute('_style');      
     }

     if( this.hasAttribute('readonly') ) {
	      this.readonly = "readonly" ;
     }

     if( this.hasAttribute('placeholder') ) {
     	 this.placeholder = this.getAttribute('placeholder');
     }

     this.shadowRoot.innerHTML =  `
            
            <link href="components/base/textarea/coby-textarea.css" rel="stylesheet" />

	        	<textarea class="textarea" 
                name="${this._name}" 
		            id="${this._id}"
   		          placeholder="${this.placeholder}" 
                style="${this._style} "
 		            ${this.readonly} 
		            rows="5" ></textarea> 
     ` ;
   
     const textArea = this.shadowRoot.querySelector( 'textarea' ) ;

     window.addEventListener( this.eventType ,function(event) {
        textArea.value += event.detail.message + "\n" ; 
     }) ;
     
     window.addEventListener( onClearLogs ,function(event) {
        textArea.value = "" ;
     }) ;
   }

 }

 customElements.define("coby-textarea", Textarea ) ;

