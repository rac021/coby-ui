
 class Progressbar  extends HTMLElement {

   constructor() { 
      super()    ;
      this.attachShadow({ 'mode': 'open' });
   }

   connectedCallback() { 

     this.shadowRoot.innerHTML =  `
            
            <link href="components/base/progressbar/coby-progressbar.css" rel="stylesheet" />

		<div id="prbar">
		   <div id="prpos">
                      <div id="cval">xx%</div>
                   </div>
		</div>
     ` ;

     this.moveTo(25) ;

   }

   moveTo(number) {
    var prpos = this.shadowRoot.getElementById('prpos');
    prpos.style.width = number + "%";
     this.shadowRoot.getElementById('cval').innerHTML = number +"%" ;
  
   }

 }

 customElements.define("coby-progressbar", Progressbar ) ;


 
