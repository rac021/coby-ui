
 class JobSubmission  extends HTMLElement {

   constructor() { 
      super()    ;
      this.attachShadow({ 'mode': 'open' });
      this._id = "coby-textarea-id" ;
      this._name = "coby-textarea-name" ;
      this.eventType = "coby-textarea-event-type" ;
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

     this.shadowRoot.innerHTML =  `
            
            <link href="components/composite/job-submission/coby-job-submission.css" rel="stylesheet" />
           <!-- <link href="components/base/button/coby-button.css" rel="stylesheet" /> -->
           <!-- <link href="components/base/textarea/coby-textarea.css" rel="stylesheet" /> -->

             <div class="submitContainerId" >

                 <coby-textarea _id="_my_id"
                                _name="_my_name"                                  
                                placeholder="Enter Your Query Here.. " 
                                _style="background:linear-gradient(to right, rgb(5, 9, 6) 3%, rgb(51, 138, 57) 80%, rgba(1, 2, 9, 0.80) 95%); font-size: 40pt; margin:0.3em; resize: none; " >
                  </coby-textarea>

              </div>

              <div class="submitContainerCommandId" >
                <coby-button _id="submitJobId" 
                            _title="submit Extration"
                            _style="background:linear-gradient(to right, rgb(20, 27, 237) 0%, rgb(58, 123, 213) 51%, rgba(99, 45, 95, 0.92) 100%);" 
                            event="logs" > 
                </coby-button>
              </div>

             </div>
             
            </div> 

     ` ;

     const textArea = this.shadowRoot.querySelector( 'textarea' ) ;

     window.addEventListener( this.eventType ,function(event) {
        textArea.value += event.detail.message + "\n" ; 
     }) ;
     
     window.addEventListener( this.eventType ,function(event) {
        textArea.value = "" ;
     }) ;
   }

 }

 
 function _attachScript(url) {

  var alreadyLoaded = false ;
  var scripts = document.getElementsByTagName('script');
  var stringScripts = "" ;
  for ( let script of scripts ) {
     stringScripts += script.outerHTML + "\n" ;
     if ( script.outerHTML.includes(url)) {
       alreadyLoaded = true ;
       break ;
     }
  }

  if(alreadyLoaded ) return ;
  
  let script= document.createElement('script') ;
  script.type= 'text/javascript';
  script.src= url ;
  document.body.appendChild(script) ;
}

 customElements.define("coby-job-submission", JobSubmission ) ;

