
 class CobyLogo  extends HTMLElement {

   constructor() { 
      super()    ;
      this.attachShadow({ 'mode': 'open' });
   }

   connectedCallback() { 

     this.shadowRoot.innerHTML =  `
            
          <link href="components/base/logo/coby-logo.css" rel="stylesheet" />

	        <div id="coby-logo" class="hit-the-floor">Coby</div>
     ` ;   

     this.shadowRoot
         .getElementById( "coby-logo" )
         .onclick = _ => {
            
            Swal.fire ( {
              title: 'Help',
              html: '<b>www.coby.fr</b>',
              width: 600,
              padding: '1em',
              backdrop: `
                rgba(0,0,123,0.4)          
                center left
                no-repeat
              `
            }) ;

         } ;
  }

 }

 customElements.define("coby-logo", CobyLogo ) ;


 
