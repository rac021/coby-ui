 class UploadPsl extends HTMLElement {

   constructor() { 
      super()    ;
      this.attachShadow({ 'mode': 'open' }) ;     
   }

   connectedCallback() { 
   
     this.shadowRoot.innerHTML =  `
            
        <input type="file" id="file" name="file" multiple style="margin-bottom: 100px;" />       
        <button id="upload_psl">Upload</button>
        
     ` ;
    
     this.shadowRoot
         .getElementById('upload_psl')
         .onclick  = _ => {
                    
             this.uploadFile()  ;
         } ;         
   }
 
   uploadFile() {
        
      var file = this.shadowRoot.getElementById('file').files[0] ;
      
      if( file == null ) {
          alert (' No File Selected ! ') ;
          return ;          
      }
      
	  var fragmente = []         ;
        
      var data = new FormData()  ;
      data.append('file', file ) ;
               
      fetch('http://localhost:8080/start', {
          method : 'POST',
          body   : data
      }) ; 
   }
}
 
customElements.define("upload-psl", UploadPsl ) ;

