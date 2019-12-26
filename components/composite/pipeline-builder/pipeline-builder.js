
 class PipelineBuilder  extends HTMLElement {

   constructor() { 
      super()    ;
     // this.shadow = this.attachShadow({ 'mode': 'open' });

     //const shadow = this.attachShadow({mode: 'closed'});
     //const s = document.createElement('script');
     //s.textContent = 'alert("hello");';
     // shadow.appendChild(s);

   }

   connectedCallback() { 

     this.innerHTML =  `
            
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

        <!-- <script src="components/composite/pipeline-builder/redips/redips-drag-min.js"></script> -->
        <!-- <script src="components/composite/pipeline-builder/redips-script.js"></script> -->
        
		 <link href="components/composite/pipeline-builder/pipeline-builder.css" rel="stylesheet" />
			
         <div id="redips-drag" name="redips-drag" >

		 <!-- tables inside this DIV could have draggable content -->

                 <main-container-builder>
					
                                <pipeline-builder-left>
					<!-- left container -->
					<div id="left">
						<table id="table2">
							<colgroup>
								<col width="120px"/>
							</colgroup>
							<tbody>
								<!-- clone 2 elements + last element -->
								<tr><td class="redips-mark"><div id="a" class="left-box redips-drag red redips-clone climit">Begin-For-Each</div></td></tr>
								<tr><td class="redips-mark"><div id="b" class="left-box redips-drag red redips-clone climit">End-For-Each</div></td></tr>
								<tr><td class="redips-mark"><div id="c" class="redips-drag orange redips-clone climit2_1 "> 
		                                                    <div style="display:flex; flex-direction: row; align-items: center"> 
	   							        <label for="genMapp" style="margin-left:2px" >Gen-Mapping</label>
									<input name="genMapp" class="input-info" />
		                                                    </div> 
		                                                </div></td></tr>
								<tr><td class="redips-mark"><div id="d" class="redips-drag orange redips-clone climit ">Extract-Data</div></td></tr>
								<tr><td class="redips-mark"><div id="e" class="redips-drag orange redips-clone climit ">Load-Data</div></td></tr>
								<tr><td class="redips-mark"><div id="f" class="redips-drag green redips-clone climit ">Infer-Data</div></td></tr>
								<tr><td class="redips-mark"><div id="g" class="redips-drag green redips-clone climit ">Query-Data</div></td></tr>
							</tbody>
						</table>
					</div> <!-- left container -->
					
					<pipeline-builder-arrow>
                                            <img src="components/composite/pipeline-builder/img/curved_arrow_01.png" alt="curved-arrow" id="img-arrow" name="img-arrow" class="img-arrow" > 
					</pipeline-builder-arrow>

                               </pipeline-builder-left>

                               <pipeline-builder-right>

        <div id="template_list_group" style="display:inline-flex; margin-top: 0.9em; margin-bottom: 0.4em;">
         <label for="template_list" style="width:20%; color: aqua;" >Existing Template</label>
          <select name "template_list" id="template_list" >
                <option>--</option>
                <option>OLA</option>
                <option>ACBB</option>
                <option>FORET</option>
          </select> 
          </div>
		                        <!-- right container -->
					<div id="right">
						<table id="table1">
							<colgroup>
								<col width="250px"/>
							</colgroup>
							<tbody>
								<tr><td></td></tr>
								<tr><td></td></tr>
								<tr><td></td></tr>
								<tr><td></td></tr>
								<tr><td></td></tr>
								<tr><td></td></tr>
								<tr><td></td></tr>
							</tbody>
						</table>
					</div> <!-- right container -->
                               </pipeline-builder-right>

				<pipeline-builder-message-info>
				
					<div id="message-info" class="message-info" >
								            
				            <div class="serialize_button" >
				            
						    <coby-button name="serialize_button" 
                                                                 _id="serialize_button_ID" 
                                                                 _title="Serialize"
                                                                 event="serialize-builder" 
                                                                 _style="background: linear-gradient(to right, #5c349b 0%, #366db8 51%, #08e115cf 100%);" > 
                            </coby-button>
                            
                            <coby-button name="clear_button" 
                                                                 _id="clear_button_ID" 
                                                                 _title="Clear" 
                                                                 event="clear-builder" 
                                                                 _style="background:linear-gradient(to right, #5c349b 0%, #366db8 51%, #08e115cf 100%);">  >
                            </coby-button>
                           
                             
						</div>

				               <div id="DSL" class="DSL">\nDSL..\n\n</div>

						 <div class="commit_save_buttons" >
                                                    <coby-button name="download_button" 
                                                                 _id="save_button_ID"
                                                                 _title="Download" 
                                                                 event="download-builder" 
                                                                 _style="background: linear-gradient(to right, #00d2ff 0%, #0f0222 51%, #00d2ff 100%);" > 
                                                    </coby-button>
						    <coby-button name="commit_button"
                                                                 _id="commit_button_ID" 
                                                                 _title="Commit" 
                                                                 event="commit-builder" 
                                                                 _style="background: linear-gradient(to right, #00d2ff 0%, #0f0222 51%, #00d2ff 100%);"  > 
                                                    </coby-button>				                    
						</div>
						
						
						<div style="margin-top:2em;">
						  <upload-psl></upload-psl>
						</div>
		 
						<br/><br/>				
					</div>
					
				</pipeline-builder-message-info>


		                <pipeline-builder-message>
					<div id="message">
						Sort elements from right table
						<br/>
						Double click will return element to initial position                              
				               <div id="message-dsl" class="message-dsl" > Coby-DSL </div>
					</div>
		                </pipeline-builder-message> 

                 </main-container-builder>
         
           </div> <!-- drag container -->

     ` ;

      _attachScript('components/composite/pipeline-builder/redips/redips-drag-min.js') ;  
      _attachScript('components/base/button/coby-button.js') ;
    
      setTimeout(function() { _attachScript('components/composite/pipeline-builder/redips-script.js') ; }, 5 ) ; 
      
     

     document.querySelector(".serialize_button coby-button")
             .onclick = _ => {
                 var target = document.getElementById("DSL");
                 serialize( target ) ; // call function in script.js
             } ;


     window.addEventListener( "clear-builder" ,function(event) {
        var target = document.getElementById("DSL");
        fadeOutThenFadeInWithText(target, "\nDSL..\n\n" , 500);       
        clearTable("table1", "7" ) ;
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

 customElements.define("coby-pipeline-builder", PipelineBuilder ) ;


 
