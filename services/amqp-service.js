 
 class AmqpService {
     
     static instance ;
 
     constructor() {  
         // DON'T USE THIS.INSTANCE ( USE INSTANCE => STATIC )
         if ( AmqpService.instance) {           
            return AmqpService.instance;
         }
         
        // window.addEventListener( "onDisconnect" , event => this.on_disconnect(event) );    
 // alert("AmqpService instance ") ;
         window.addEventListener( "clear-logs-permanently" , event => this.on_clear_logs_permanently(event) ); 
         
         AmqpService.instance = this ;
       //  return this.instance ;
     
   }

  // promiseService() {
  //   return new Promise( () => this ) ;    
  // }
   
    tryConnect() {
  
     this.client.connect( this.username , this.password ,  () => this.on_connect(), err => this.on_connect_error(err), this.virtualHost ) ;
        
   }
   
   getConnectionState() {
      return this.CONNECTION_STATE ;     
   }
   
   
   connect( url, virtualHost, queue, username, password  ) {
   
        this.CONNECTION_STATE = "" ; // OK - KO
       
        // alert("AMQP_SERVICE_CONSTRUCTOR");
        this.url = url ; // "https://sse.now.sh" ;
        this.username = username ;
        this.password = password ;
  
                
    //  attachScript("https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.js") ;
    //  attachScript("https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.js") ; 
        
        // Use SockJS
    // Stomp.WebSocketClass = SockJS;
    
        // Connection parameters
        // this.mq_username = "admin" ;
    // this.mq_password = "admin" ;
    // this.mq_vhost    = "/"     ;
    // this.mq_url      = url     ;
        
        // The queue we will read. The /topic/ queues are temporary
        // queues that will be created when the client connects, and
        // removed when the client disconnects. They will receive
        // all messages published in the "amq.topic" exchange, with the
        // given routing key, in this case "mymessages"
        
        //  mq_queue    = "/exchange/coby-log-exchange";
        this.queue    = queue ;
        
        this.virtualHost = virtualHost ;
    
        this.ws = new WebSocket( this.url);
    
        this.client = Stomp.over(this.ws);       
        
        this.client.debug = ( str) => { 
          // console.log( str );
        } ;
        
        
        // this.connectedCallback() ; 
        
        this.tryConnect() ;
      
       
       
   }
      
   // static service( url, virtualHost, queue, username, password ) {
   //   return () => new AmqpService ( url, virtualHost, queue, username, password  )  ;
   // }
    
   on_connect() {

     
     this.subscription = this.client.subscribe( this.queue, this.on_message,  {'ack': 'client'} );
     
       /* Send data to textarea componenent wich is listening on the event $onRecievedDataLogsEvent */
       
        window.dispatchEvent( new Event( "clear-logs" , 
                                                  {  bubbles: true , 
                                                     composed: true } ) ) ;
                                                     
                                                     
      window.dispatchEvent( new CustomEvent ( onRecievedDataLogsEvent , 
                                         {  bubbles: true    , 
                                            composed: true   ,
                                            detail: {
                                              message: 'Connected to RabbitMQ-Web-Stomp'
                                            } 
                                         } 
                               ) ) ;
                               
     
     this.CONNECTION_STATE = "OK" ;   
    // alert("OK ON CONNECT IN ON CONNECT ");
 
   //  alert(" this connected => " + this.CONNECTION_STATE );
                               
    }
    
   async on_clear_logs_permanently() {
     
        if( this.CONNECTION_STATE === "" || this.CONNECTION_STATE  === "KO" ) {        
            alert( " Not Already Connected ! ");
            return ;
        }
        
        else if( this.username != "admin" ) {
            alert( " Sory, the User " + this.username + " In not Authorized !! ");
            return ;
        }
        else {
              
        // curl -XDELETE -u admin http://admin:admin@localhost:8181/api/queues/%2f/test/contents

        var headers = new Headers();
        headers.append("Authorization", "Basic " + btoa("admin" + ':' + "admin"));
        headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1');
        headers.append("Origin", "http://127.0.0.1");
       // headers.append("Access-Control-Allow-Credentials", "true");
       // headers.append("Access-Control-Request-Method", "DELETE");
       // headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");        
       // headers.append("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
       // headers.append("Access-Control-Request-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
        
        
        Swal.fire({
        title: 'Are you sure ?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Purge Queue !'
        }).then((result) => {
        if (result.value) {
            
           this.on_disconnect() ;
            
           const rawResponse = fetch("http://127.0.0.1:8181/api/queues/%2f/coby-log-root-queue/contents", {
             method: "DELETE" ,
             mode: "cors",
             headers: headers,
           }).then(res =>   
                           Swal.fire (
                               res.ok.toString() ,
                               res.statusText + " ( Status : " + res.status  + " ) ",                             
                               'success'
            ) ) ;
            
            this.connect(  this.url, this.virtualHost, this.queue, this.username, this.password ) ;            
        }
        }) ;
                    
        
        
         
         
        }
        
       
    }
    
    
    on_disconnect() {
       // alert("Disconnect");
        if( this.CONNECTION_STATE === "OK") {
        
            this.subscription.unsubscribe();
            
            this.client.disconnect( function()  {
                console.log("See you next time!"); 
            });
            
            this.ws.close();
          
            window.dispatchEvent( new Event( "clear-logs" , 
                                              {  bubbles: true , 
                                                 composed: true } ) ) ;
                                                     
            this.CONNECTION_STATE = "" ;
            // alert("DISSCONNECTED FROM ON_DOSCONNECT");
            
        }
       
    }
    
   on_connect_error( er) {
        this.CONNECTION_STATE = "KO"  ;
        window.dispatchEvent( new CustomEvent ( onRecievedDataLogsEvent , 
                                            {  bubbles: true    , 
                                                composed: true   ,
                                                detail: {
                                                message: 'Connection failed!' + er
                                                }
                                            } 
                                ) ) ;
                                
                                //alert(" KO FROM ERROR");
      
    }
    
    // This will be called upon arrival of a message
    on_message(message) {
        // console.log(message) ;
        // console.log('message received'); 
        const log = JSON.parse(message.body);

        /* Send data to textarea componenent wich is listening on the event $onRecievedDataLogsEvent */
        window.dispatchEvent( new CustomEvent ( onRecievedDataLogsEvent , 
                                            {  bubbles: true    , 
                                                composed: true   ,
                                                detail: {
                                                message: log.message
                                                } 
                                            } 
                                ) ) ;
                                
        // message.ack();
    }
  
  
  
 }
 
 
