
 class Authentication  extends HTMLElement {

   constructor() { 
      super()    ;
      this.attachShadow({ 'mode': 'open' });

      this.loginID = "ligin" ;
      this.passwordID = "password" ;
      this.ConnectButtonId = "connectButtonID" ;
      
      this.disonnectButtonId = "disconnectButtonID" ;

 
   }

   connectedCallback() { 

     this.shadowRoot.innerHTML =  `
            
          <link href="components/base/auth/auth-bar/coby-auth.css" rel="stylesheet" />

	  <table id="authentication-bar" name="authentication-bar" class="authentication">

		    <tr id="connection-bar" style="display:block;" >    
		      <th>Login : </th>
		      <th><input name="login" id="${this.loginID }" type="text" maxlength="20" value="admin" /></th> 
		      <th>Password :</th>
		      <th><input name="password" id="${this.passwordID}" type="password" maxlength="20" value="admin" /></th> 
		      <th><input type="submit" value="Connect" id="${this.ConnectButtonId}" style="margin-right: 0.5em; margin-left: 1em;" /></th> 
			</tr>			

			<tbody id="connected-bar" style="display:none" >			   
			    <th>Connected as [ Rac021 ] </th>
				<th><input type="submit" value="Disconnect" id="${this.disonnectButtonId}" style="margin-right: 0.5em; margin-left: 1em;" /></th> 
			</tbody>			

	  </table>

     ` ;

     this.shadowRoot.getElementById (this.ConnectButtonId).onclick = _ =>  this.connect() ;
     this.shadowRoot.getElementById (this.disonnectButtonId).onclick = _ =>  this.disconnect() ;        
 
   }

   connect() {
       
       var login    = this.shadowRoot.getElementById(this.loginID).value ;

	   var password = this.shadowRoot.getElementById(this.passwordID ).value ;    
       
       // window.dispatchEvent( new Event( "clear-logs" , 
       //                                  {  bubbles: true , 
         //                                   composed: true } ) ) ;
                                                   
       
       window.dispatchEvent( new CustomEvent ( "authentication" , 
                                                                {  bubbles: true    , 
                                                                   composed: true   ,
                                                                   detail: {
                                                                        login: login,
                                                                        password: password
                                                                   } 
                                                               } 
                           ) ) ;
                        
                        
       /*
       var xhr = new XMLHttpRequest();
       
	   xhr.open('POST', 'www.google.com');
	   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	   xhr.onload = function() {
		   if (xhr.status === 200 ) {
			alert('Something went wrong.  Name is now ' + xhr.responseText);
		   }
		   else if (xhr.status !== 200) {
			alert('Request failed.  Returned status of ' + xhr.status);
		   }
	   };

	   xhr.send(encodeURI('name=' + "HELOOO")); 
       */
       
  }

disconnect() {
   console.log("Disconnect....")  ;   
   window.dispatchEvent( new CustomEvent ( 'onDisconnect' , 
                                         {  bubbles: true    , 
                                              composed: true   ,
                                              detail: {
                                                message: 'onDisconnect'
                                              } 
                                         } 
                        ) ) ;

   document.getElementsByTagName("coby-auth")[0].shadowRoot.getElementById("authentication-bar").getElementsByTagName("tr")[1].getElementsByTagName("th")[0].innerHTML  =  "Connected as [ ] "  ;
   document.getElementsByTagName("coby-auth")[0].shadowRoot.getElementById("authentication-bar").getElementsByTagName("tr")[0].style.display = "block" ;
   document.getElementsByTagName("coby-auth")[0].shadowRoot.getElementById("connected-bar").style.display = "none" ;
  
     
  }

  
 }


 customElements.define("coby-auth", Authentication ) ;


 
