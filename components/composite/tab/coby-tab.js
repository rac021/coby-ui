 class Tab  extends HTMLElement {

   constructor() { 
      super()    ;
      this.attachShadow({ 'mode': 'open' }) ;
      this.tabClass = "tab" ;
      this.tabContentClass = "tabcontent" ;
      this.tabLinksClass = "tfablinks" ;
      this.cobyTextAreaComponentTag = "coby-textarea";
      this.cobyJobSubmissionComponentTag = "coby-job-submission";
     // this.cobyPipelineBuilderTag = "coby-pipeline-builder";
   }

   connectedCallback() { 
 
     this.shadowRoot.innerHTML =  `
            
            <link href="components/composite/tab/coby-tab.css" rel="stylesheet" />          

            <!-- Tab links -->

            <div class="${this.tabClass}">
                <!-- <button class="${this.tabLinksClass}" id="defaultOpen">
	                     Output
	             </button>  -->                

            </div>

            <div class="tabContentContainer" >
		    <!-- 
		    <div id="output" class="${this.tabContentClass}"> 
		 	  <${this.cobyTextAreaComponentTag} _id="_my_id" _name="_my_name" eventType="ondata" ></${this.cobyTextAreaComponentTag}>
		    </div>  -->

            </div>
     ` ;

     this._appendComponent( this.cobyTextAreaComponentTag, "buttonLogsId", "contentLogId", "logs", "textAreaLogsId", onRecievedDataLogsEvent  , 'background: linear-gradient(#3e3d3d, #000000);resize: none;' , "readonly" ) ;
     this._appendComponent( this.cobyTextAreaComponentTag, "buttonJobsId", "contentJobsId", "Jobs", "textAreaJobsId", onRecievedDataJobsEvent , 'background: linear-gradient(#3e3d3d, #000000);resize: none;' , "readonly" ) ;

     this._appendComponent( this.cobyJobSubmissionComponentTag, "buttonSubmissionJobId", "contentSubmissionJob", "Submission", "cobyJobSubmissionId", onSubmitJobEvent , "", "" ) ;

    // this._appendComponent( this.cobyPipelineBuilderTag, "buttonPipelineBuilderId", "contentPipelineBuilderId", "PipelineBuilder", "cobyPipelineBuilderId", onSubmitJobEvent ) ;

     this.shadowRoot.getElementById("buttonLogsId").click() ; // set first textArea as defaultSelection

     this._addSpinner() ;


    // _attachScript('components/base/pipeline-builder/redips-drag-min.js') ; 
    //  _attachScript('components/base/pipeline-builder/script.js') ;
    //   _attachScript('components/base/pipeline-builder/pipeline-builder.js') ;

    _attachScript('components/base/textarea/coby-textarea.js') ; 
    _attachScript('components/base/button/coby-button.js') ; 
    _attachScript('components/composite/job-submission/coby-job-submission.js') ; 
  
   }   

  _appendComponent( componentTag, buttonID, contentID, title , textAreaId, eventType, style, attribute ) {

    this.shadowRoot
        .querySelector( "." + this.tabClass )
        .appendChild( this._createTabButton( buttonID , title ) ) ;

    this.shadowRoot
        .append( this._createContentTab( componentTag, contentID , textAreaId, eventType, style, attribute ) ) ;

    this.shadowRoot
        .getElementById( buttonID )
        .onclick = _ => this.openTab( buttonID , contentID ) ;

  }

  _createTabButton(id, title) {

    var tabButton =  document.createElement("button") ;
    tabButton.className = this.tabLinksClass ;
    tabButton.id = id ;
    tabButton.append(title) ;
    return tabButton ;
      
  }

  _createContentTab( componentTag, id, textAreaId, eventType, style, attribute ) {

    var tabContent =  document.createElement("div") ;
    tabContent.className = this.tabContentClass ;
    tabContent.id = id ;
    tabContent.append( this._createComponent( componentTag, textAreaId, textAreaId, eventType , style, attribute  ) ) ;
    return tabContent ;      
  }

  _createComponent( componentTag, id, name, eventType, style, attribute ) {

    var component =  document.createElement(componentTag ) ;
    component.setAttribute( "_id" , id ) ;
    component.setAttribute( "_name" , name ) ;
    component.setAttribute( "eventType" , eventType ) ;

    component.setAttribute( "_style" ,style ) ;

    if( attribute !== '' )
    component.setAttribute( attribute , attribute ) ;
    
    return component ;      
  }

  _addSpinner() {

    var divSpinner =  document.createElement("div") ;
    divSpinner.setAttribute( "id" , "divSpinnerId" ) ;

    var label      =  document.createElement("label");
    label.setAttribute( "id" , "spinnerLabelId" ) ;
    label.setAttribute( "for" , "spinnerId" ) ;
    label.innerHTML=" Max lines to keep ";
    divSpinner.appendChild( label ) ;

    var spinner    =  document.createElement("input");
    spinner.setAttribute( "id" , "spinnerId" ) ;
    spinner.setAttribute( "type" , "number" ) ;
    spinner.setAttribute( "min" , "10" ) ;
    spinner.setAttribute( "max" , "100" ) ;
    spinner.setAttribute( "size" , "10" ) ;
    spinner.setAttribute( "value" , "0" ) ;


    var button    =  document.createElement("button");
    button.setAttribute( "type" , "button" ) ;
    button.setAttribute( "id" , "spinnerButtonOkId" ) ;
    button.innerHTML="ok" ;

    divSpinner.appendChild( spinner ) ;
    divSpinner.append( button ) ;
   
    this.shadowRoot
        .querySelector( "." + this.tabClass )
        .appendChild( divSpinner ) ;

    this.shadowRoot.getElementById("spinnerButtonOkId").style.padding = "1px";
    this.shadowRoot.getElementById("spinnerButtonOkId").style.marginLeft = "7px";
    this.shadowRoot.getElementById("spinnerButtonOkId").style.marginBottom = "2px";

    this.shadowRoot.getElementById("spinnerButtonOkId").style.color = "lightblue";
    this.shadowRoot.getElementById("spinnerButtonOkId").style.backgroundColor = "black";
    this.shadowRoot.getElementById("spinnerButtonOkId").style.fontWeight = "bold";

    this.shadowRoot.getElementById("spinnerLabelId").style.marginRight = "8px";
    this.shadowRoot.getElementById("spinnerLabelId").style.marginBottom = "2px";
    this.shadowRoot.getElementById("spinnerLabelId").style.backgroundColor = "bisque";

    this.shadowRoot.getElementById("spinnerId").style.marginBottom = "3px";
    this.shadowRoot.getElementById("spinnerId").style.backgroundColor = "aqua";

    this.shadowRoot.getElementById("divSpinnerId").style.float = "right";
    this.shadowRoot.getElementById("divSpinnerId").style.marginRight = "1em";
    this.shadowRoot.getElementById("divSpinnerId").style.display = "flex";
    this.shadowRoot.getElementById("divSpinnerId").style.transform = "translateY(50%)";

  }

  /* TAB */

   openTab( tabLinkClicked, type) {

    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = this.shadowRoot.querySelectorAll("."+ this.tabContentClass);
    for (i = 0; i < tabcontent.length; i++) {
       tabcontent[i].style.display = "none" ;
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = this.shadowRoot.querySelectorAll("." + this.tabLinksClass );
    for ( i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    this.shadowRoot.getElementById(type).style.display = "flex";
    /*evt.currentTarget.className += " active"; */
    this.shadowRoot.getElementById(tabLinkClicked).className += " active";
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

 customElements.define("coby-tab", Tab ) ;


