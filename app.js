 
  class Pipeline extends HTMLElement {


      constructor() {
         super();
      }

      connectedCallback() {
         
	 this.innerHTML = `

            <iframe id="pipelineId" 
                    name="pipelineId" 
                    src="pipeline/index.html" 
                    width="100%" 
                    height="100%" 
                    frameborder="0"></iframe>
            `
         
  	 this.outputLogs = document.getElementById("outputLogs") ;
         this.outputLogs.onclick = _ => outputLogs() ;

         this.buttonListJobs = document.getElementById("listWaitingJobs") ;
         this.buttonListJobs.onclick = _ => listJobs() ;        

         this.button = document.getElementById("clearOutput") ;
         this.button.onclick = _ => clearTextArea() ;

      }
  }

 customElements.define("coby-pipeline", Pipeline ) ;

 function outputLogs() {  

   document.getElementById("pipelineId")
           .contentWindow
           .document
           .getElementById("defaultOpenOutputLogs")
           .click();   
 }

 function listJobs() {  

   document.getElementById("pipelineId")
           .contentWindow
           .document
           .getElementById("defaultOpenJobs")
           .click();   
 }

 function clearTextArea() {    

   document.getElementById("pipelineId")
           .contentWindow
           .document
           .getElementById("coby-textarea")
           .value = "" ;  
 }


