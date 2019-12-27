
 class AuthenticationPage  extends HTMLElement {

   constructor() { 
      super()    ;
      this.attachShadow({ 'mode': 'open' });
   }

   connectedCallback() { 

     this.shadowRoot.innerHTML =  `
				
	 	 <html>
		 			<head>
						<link rel="stylesheet" href="components/base/auth/auth-page/coby-auth-page.css">
					 </head>

					 <body>

					 <div id="logo"> 
					 
					 <h1><i> LOGIN TO COBY</i></h1>
					  
					 </div> 
					 
					 <section class="stark-login">
					 
						 <div id="form" class="form">	
						 
							 <div id="fade-box">
							 
								 <input type="text" id="login-page"    name="login-page"     placeholder="Login" required autofocus  value="admin">
								 <input type="text" id="rest-endpoint-page" name="password-page" placeholder="REST EndPoint" required style="display:none; border: 2px solid #fff94b;" value="http://localhost:8080/start" >
								 
								
								 <input type="password" id="password-page" name="password-page"  placeholder="Password" required value="admin">
								 <input type="text"     id="websocket-endpoint-page"  name="password-page"     placeholder="Login"  required  style="display:none ; border: 2px solid #fff94b;" value="ws://127.0.0.1:15674/ws" >

                                  <table>
                                    <tr>
                                        <td> <button id="auth-button-id-page" name="auth-button-id-page" style=" margin-left: 3.5em; width: 20em; margin-right: 3.5em;" >Log In</button> </td>
                                        <td><a id="wsEndPointID" href="#"">EndPoints</a></td>
                                    </tr>
                                  </table>
								 
							 </div>
						 </div>
						 						 
				 
						 <div class="hexagons">
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <br>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <span>&#x2B22;</span>
							 <br>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span> 
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 
								 <br>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <span>&#x2B22;</span>
								 <br>
									 <span>&#x2B22;</span>
									 <span>&#x2B22;</span>
									 <span>&#x2B22;</span>
									 <span>&#x2B22;</span>
									 <span>&#x2B22;</span>
									 <span>&#x2B22;</span>
									 <span>&#x2B22;</span>
									 <span>&#x2B22;</span>
									 <span>&#x2B22;</span>
									 <span>&#x2B22;</span>
									 <span>&#x2B22;</span>
									 <span>&#x2B22;</span>
								 </div>      
						</section> 
								 
								 <div id="circle1">
								 <div id="inner-cirlce1">
									 <h2> </h2>
								 </div>
								 </div>
								 								 
								<div style="color: initial; display:none;">
										<ul>
										<li></li>
										<li></li>
										<li></li>
										<li></li>
										<li></li>
										</ul>
								 </div>

															 
											
					 </body>
											
				</html>

		 ` ;	 

     this.shadowRoot     
         .getElementById ( "auth-button-id-page" )
         .onclick = _ => {
					
					    var componentToWizz = "form" ;
                    	reset_animation(this.shadowRoot.getElementById(componentToWizz)) ;  
					    this.shadowRoot.getElementById(componentToWizz).style.animation = "wiggle 75ms 10" ;
			  

					    var login    =  this.shadowRoot
						   				    .getElementById ( "login-page" ).value ;
														 
						var password =  this.shadowRoot
										    .getElementById ( "password-page" ).value ;

						window.dispatchEvent( new CustomEvent ( "authentication" , 
															    {  bubbles: true    , 
																   composed: true   ,
															       detail: {
																        login: login,
																		password: password						
															       } 
															   } 
						) ) ;

		 } ;
		 

		 function reset_animation(el)  {
			el.style.animation = 'none';
			var offsetH = el.offsetHeight; /* trigger reflow */
			el.style.animation = null; 
		  }
		   
          
          var toggleMenu = () => {
          
                toggle( this.shadowRoot.getElementById("login-page") ) ;
                toggle( this.shadowRoot.getElementById("rest-endpoint-page") ) ;               
                
                toggle( this.shadowRoot.getElementById("password-page") ) ;
                toggle( this.shadowRoot.getElementById("websocket-endpoint-page") ) ;
          }
         
         this.shadowRoot.getElementById("wsEndPointID").onclick = () => {               
                toggleMenu();         
         }
                        
         var toggle = ( elem) => {
            
            if ( elem.style.display === "none") {
                elem.style.display = "block";
            } else {
                elem.style.display = "none";
            }
         }
         
        
         
          var focusOnNextElementFrom = ( currentElement, nextElem , evnt, keyCodeOne, keyCodeTwo , select ) => {              
              
              this.shadowRoot.getElementById(currentElement).addEventListener( evnt, (event) => {
          
                if ( event.keyCode === keyCodeOne ||   event.keyCode === keyCodeTwo ) {
                   event.stopPropagation();
                   event.preventDefault();          
                   var elem = this.shadowRoot.getElementById(nextElem) ;
                   elem.focus();
                   if( select) elem.select();
                }
                
              }, false ) ;              
          }
          
          
         focusOnNextElementFrom ("login-page"     , "password-page"       , "keydown", 9, 13, "select" ) ;
         
         focusOnNextElementFrom ("password-page"  , "auth-button-id-page" , "keydown", 9, 13           ) ;
         
         focusOnNextElementFrom ("auth-button-id-page" , "wsEndPointID" , "keydown", 9, 9             ) ; 
          
          
         this.shadowRoot.getElementById("wsEndPointID").addEventListener("keydown", (event) => {

              if ( event.keyCode === 32 ) {
                 toggleMenu();
              }
            
          }, false ) ;
          
   }
   
 }


 customElements.define("coby-auth-page", AuthenticationPage ) ;


 
