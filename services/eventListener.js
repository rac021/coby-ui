 
  class EventListenerService {
 
      static amqp  ;
      
      constructor() {        
        //  this.amqp = new AmqpService() ;
          this.connectedCallback( new AmqpService() )  ;
      }

      connectedCallback() {    
          
        window.addEventListener( "authentication", function(event) {
            
         //  alert("Reconnect");
          
          this.login    = event.detail.login     ;
          this.password =  event.detail.password ;
          
          this.console.log ( " Authentication : " + this.login  + " -- " +  this.password ) ; 

          var vHost = "/" ;
          var queue = "/exchange/coby-log-user-exchange" ;
          var socket = "ws://127.0.0.1:15674/ws"         ;
          
          if(  this.login == 'admin' ) {
              queue = "/queue/coby-log-root-queue"
          }
                                
          if ( EventListenerService.amqp == null ) EventListenerService.amqp = new AmqpService() ;
                                
          EventListenerService.amqp.connect( socket, vHost, queue, login , password ) ;
          
          var connexion = "" ;
          
          var tryConn = () => {
              
                return new Promise((resolve, reject) =>   {

                    const intervalId = setInterval(() =>  {

                     if( EventListenerService.amqp.getConnectionState() === "OK" ) {
                         //alert("in promise OKKKKKKK" );
                         clearInterval(intervalId) ;
                         resolve("OK");
                     }
                     
                     else if( EventListenerService.amqp.getConnectionState() === "KO" ) {
                        clearInterval(intervalId) ;
                        //alert("in promise KKKKKKOOOOOO" );
                        resolve("KO");
                    }
                    }, 50 )
                })
          } ;
          
          
          tryConn().then( connState =>      {
             //alert(" STATE CONN => " +connState );
                    if( connState == "OK" ) {                       
                                 //  alert("Yeaaaaah connexion" );  
                            document.getElementsByTagName("coby-auth")[0].shadowRoot.getElementById("authentication-bar").getElementsByTagName("tr")[1].getElementsByTagName("th")[0].innerHTML  =  "Connected as [ " + event.detail.login  + " ]"  ;
                            document.getElementsByTagName("coby-auth")[0].shadowRoot.getElementById("authentication-bar").getElementsByTagName("tr")[0].style.display = "none" ;
                            document.getElementsByTagName("coby-auth")[0].shadowRoot.getElementById("connected-bar").style.display = "block" ;
                           
                             Swal.fire ( {
                            position: 'center',
                            type: 'success',
                            title: 'Signed in Successfully',
                            showConfirmButton: false,
                            timer: 2500
                            }) ;
                                
                            
                            
                             // alert("event disconnect only once" );
                              // window.removeEventListener( "onDisconnect", disco , true) ;
                              // window.addEventListener( "onDisconnect" , disco  );
                            // Because Connected 
                            
                            
                      //    
                            
                           // if( !  attachedDisconnectEvent )  {
                     //           window.addEventListener( "onDisconnect" , disco, false);
                                
                             //   attachedDisconnectEvent = true ; 
                         //  }
                           
                    } else {
                       // alert("Oups ! "  +connState );
                       EventListenerService.amqp = null ;   
                    }
              
              } ) ;
              
              
             
          /*

          var tryConn = setInterval( () => {
                            //alert("CONNNNNNNN");
                           //alert("amqp.getConnectionState()  ==> " + amqp.getConnectionState()  );
                             if( amqp.getConnectionState() === "OK" || amqp.getConnectionState() === "KO" ) {
                                connexion = amqp.getConnectionState() ;
                                 //alert("connexion  ==> " + connexion );
                               clearInterval(tryConn) ;
                             }
                         } ,
                         1000 ) ;
          */
                         
         // tryConn ;
                         
          /*
            alert(" ===> [" + connexion + "]" );
            if( connexion  === "OK" ) {
                alert("YEAH");
                 Swal.fire({
                  position: 'top-end',
                  type: 'success',
                  title: 'Connected',
                  showConfirmButton: false,
                  timer: 2500
                }) ;
                
                //  document.getElementsByTagName("coby-auth")[0].shadowRoot.getElementById("authentication-bar").style.display = "none";

                document.getElementsByTagName("coby-auth")[0].shadowRoot.getElementById("authentication-bar").innerHTML +=  event.detail.login + " - Connected" ;
              
            }
        */
           
          //                .then( am => am.connect() )
            //             .then( am => return am.getConnectionState()) ) ; 
                          
                          
                        //  alert(amqp.getConnectionState()) ;
          
          //AmqpService.service( socket, vHost, queue, event.detail.login , event.detail.password )
            //             .then( am => am.connect())
              //           .then( am => getConnectionState()) ; 
                             
           
         
           
          /*
          if(  amqp.getConnectionState() === "CONNECTED" ) {

               alert( " ===+++ " + amqp.CONNECTION_STATE ) ;
               
                Swal.fire({
                  position: 'top-end',
                  type: 'success',
                  title: 'Connected',
                  showConfirmButton: false,
                  timer: 2500
                }) ;

               
             // document.getElementsByTagName("coby-auth")[0].shadowRoot.getElementById("authentication-bar").style.display = "none";

              document.getElementsByTagName("coby-auth")[0].shadowRoot.getElementById("authentication-bar").innerHTML +=  event.detail.login + " - Connected" ;

          } 
          */
        }) ; 


        window.addEventListener( onJobsEvent,function(event) {
	         alert ( 'Clicked Jobs !!' ) ;
        }) ; 


        window.addEventListener( onLogsEvent ,function(event) {
	        alert ( 'Clicked Logs !!' ) ;
  	   }) ;

	   window.addEventListener( onClearLogsEvent ,function(event) {
	        
                   window.dispatchEvent ( new CustomEvent  ( onClearLogs , 
                                          {  bubbles: true , 
                                             composed: true
                                          } 
                                        ) );
  	   }) ;


           window.addEventListener( "coby-eventType-BuilderMode" ,function(event) {
	       
		            /*
                var x = window.matchMedia("(min-width:53em)") ;
                
                if (x.matches) { // If media query matches
                    alert( "min-width:53em" );
                } 
                */
		 

                var mode = event.detail.message  ; 
                var visibleContainer = document.getElementsByClassName('container')[0].offsetWidth > 0 && 
                                       document.getElementsByClassName('container')[0].offsetHeight > 0 ;
                
                if( visibleContainer ) {

                   displayComponent('container', ! visibleContainer, 0    , true ) ;
                   displayComponent('builder'  ,   visibleContainer, 1000 , false) ;
 
                   document.querySelector('article').style.gridTemplateColumns = "6fr";
                   document.querySelector('article').style.gridTemplateRows = "6fr";
                   
                   document.getElementById("coby-mode").innerHTML = " Build Mode";

                } else {

                   displayComponent('builder'  ,   visibleContainer, 0    , true ) ;
                   displayComponent('container', ! visibleContainer, 1000 , false) ;   
                   
                   document.querySelector('article').style.gridTemplateColumns = " 6fr 1fr";
                   document.querySelector('article').style.gridTemplateRows = ".2fr auto";    
                   
                   document.getElementById("coby-mode").innerHTML = " Pipeline Mode";
                }  window.removeEventListener( "onDisconnect", disco ) ;

  	   })  ;   
             

       
       
          window.addEventListener( "onDisconnect" ,function(event) {
                                   EventListenerService.amqp.on_disconnect();
                                   EventListenerService.amqp == null ;                                  
                                   Swal.fire ( {
                                        position: 'center',
                                        type: 'info',
                                        title: 'Signed out Successfully',
                                        showConfirmButton: false,
                                        timer: 2500
                                    }) ; 
         }) ;
         
        
        
      }
      
      
      removeInstance( instance)  {
         alert("remove instance");
         instance = null ;
     }     
     
  }

   
  function load_js(script)  {
      var head= document.getElementsByTagName('head')[0];
      var script= document.createElement('script');
      script.src= script;
      head.appendChild(script);
  }

  function displayComponent( clazz, visibleContainer, time, immediate )  {  

      if( visibleContainer ) {
        for ( let el of document.getElementsByClassName(clazz)) {
            if( immediate ) {
              el.style.display = '' ;
            } else {
              fadeIn(el, time);
            }
        }
      } else {
        for ( let el of document.getElementsByClassName(clazz)) {
           if( immediate ) {
              el.style.display = 'none' ;
            } else {
              fadeOut(el, time);
           }
         }
      }
    
  }

  function fade(what, duration) {
	  what.opct = 100;
	  what.ih = window.setInterval(function() {
	    what.opct--;
	    if(what.opct) {
	      what.MozOpacity = what.opct / 100;
	      what.KhtmlOpacity = what.opct / 100;
	      what.filter = "alpha(opacity=" + what.opct + ")";
	      what.opacity = what.opct / 100;
	    } else {
	      window.clearInterval(what.ih);
	      what.style.display = 'none';
	    }
	  }, 0.1 * duration);
 }

function fadeIn(el, time) {
  el.style.opacity = 0 ;
  el.style.display = '';
  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
    last = +new Date();
    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}


function fadeOut(el, time) {
  el.style.opacity = 1 ;
  var last = 0;
  var tick = function() {
    el.style.opacity = +el.style.opacity - last;
    last = last + 0.001 ;
    if (+el.style.opacity > 0) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    } else if (+el.style.opacity <= 0) {
        el.style.display = 'none'
    }
  };

  tick();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


 new EventListenerService() ;


