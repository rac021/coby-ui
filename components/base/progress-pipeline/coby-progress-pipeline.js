
 class ProgressPipeline  extends HTMLElement {

   constructor() { 
      super()    ;
      this.attachShadow({ 'mode': 'open' });
   }

   connectedCallback() { 

     this.shadowRoot.innerHTML =  `
            
            <link href="components/base/progress-pipeline/coby-progress-pipeline.css" rel="stylesheet" />

	    <div id="progress-pipeline">

				<ul>
							<li id="1" class="success">        <a href="#1">Generate Mapping </a> </li>
							<li id="2" class="error" >         <a href="#2">Extract data     </a> </li>
							<li id="3" class="active loader "> <a href="#3">Load             </a> </li>
							<li id="4" >                       <a href="#4">Infer            </a> </li>
							<li id="5" >                       <a href="#5">Sparql Process   </a> </li>
							<li id="6" > <a href="#6">Store    </a> </li>                
				</ul>
				
	   </div>
     ` ;
   }
 }

 customElements.define("coby-progress-pipeline", ProgressPipeline ) ;

 
 
