
 class Authentication  extends HTMLElement {

   constructor() { 
      super()    ;
      this.attachShadow({ 'mode': 'open' });

      this.loginID = "ligin" ;
      this.passwordID = "password" ;
      this.authButtonId = "AuthID" ;

 
   }

   connectedCallback() { 

     this.shadowRoot.innerHTML =  `
            
          <link href="components/base/auth/auth-bar/coby-auth.css" rel="stylesheet" />

	  <table id="authentication-bar" name="authentication-bar" class="authentication">

		    <tr id="connection-bar" style="display:none" >    
		      <th>Login : </th>
		      <th><input name="login" id="${this.loginID }" type="text" maxlength="20" /></th> 
		      <th>Password :</th>
		      <th><input name="password" id="${this.passwordID}" type="password" maxlength="20" /></th> 
		      <th><input type="submit" value="Connect" id="${this.authButtonId}" style="margin-right: 0.5em; margin-left: 1em;" /></th> 
			</tr>			

			<div id="connected-bar" style="display:OK" >			   
			    <th>Connected as [ Rac021 ] </th>
				<th><input type="submit" value="Disconnect" id="${this.authButtonId}" style="margin-right: 0.5em; margin-left: 1em;" /></th> 
			</div>			

	  </table>

     ` ;

     this.shadowRoot.getElementById (this.authButtonId).onclick = _ =>  this.auth() ;
        

   }

   auth() {
   
        var login    = this.shadowRoot.getElementById(this.loginID).value ;

	   var password = this.shadowRoot.getElementById(this.passwordID ).value ;

           alert(login + " -- " + password ) ; 
   
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

 
  }


 }


 customElements.define("coby-auth", Authentication ) ;


 
