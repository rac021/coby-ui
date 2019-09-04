
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
								 <input type="text"     id="login-page"    name="login-page"     placeholder="Login"    required>
								 <input type="password" id="password-page" name="password-page"  placeholder="Password" required>
									 
								 <button id="auth-button-id-page" name="auth-button-id-page" >Log In</button> 
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

   }

 }




 customElements.define("coby-auth-page", AuthenticationPage ) ;


 
