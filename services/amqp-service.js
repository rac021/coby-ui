 
 class AmqpService {
     
     static instance ;
 
     constructor() {  
         
         if ( this.instance) {
            return this.instance;
         }
         
         this.instance = this ;
     
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
   
        // alert("AMQP_SERVICE_CONSTRUCTOR");
        this.url = url ; // "https://sse.now.sh" ;
        this.username = username ;
        this.password = password ;

        this.CONNECTION_STATE = "" ; // OK - KO  
                
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
     
        //alert("Attach Event to disconnect" );
       window.addEventListener( "onDisconnect" , event => this.on_disconnect(event) );    
       
       window.addEventListener( "clear-logs-permanently" , event => this.on_clear_logs_permanently(event) ); 
       
       
       
   }
      
   // static service( url, virtualHost, queue, username, password ) {
   //   return () => new AmqpService ( url, virtualHost, queue, username, password  )  ;
   // }
    
   on_connect() {

     this.subscription = this.client.subscribe( this.queue, this.on_message,  {'ack': 'client'} );
     
     this.CONNECTION_STATE = "OK" ;   
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
    
 
   //  alert(" this connected => " + this.CONNECTION_STATE );
                               
    }
    
   async on_clear_logs_permanently() {
     
        if( this.CONNECTION_STATE === "" || this.CONNECTION_STATE  === "KO" ) {
        
            alert( " Not ALready Connected ! ");
            return ;
        }
        
        else if( this.username != "admin" ) {
            alert( " Can't do this ! ");
            return ;
        }
        else {
            
        alert("OK CLEAR LOGS " ) ;
           
        // curl -XDELETE -u admin http://admin:admin@localhost:8181/api/queues/%2f/test/contents

        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa("admin" + ':' + "admin"));
        headers.append('Access-Control-Allow-Origin', '*');
      //  headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        

         const rawResponse = await fetch('http://127.0.0.1:8181/api/queues/%2f/coby-log-root-queue/contents', {
           method: 'DELETE' ,
           mode: "cors",
           headers: headers,
        }).then(res=>res.json())
         .then(res => alert(res));;
            

        }
        
        
    }
    on_disconnect() {
        
        if( this.CONNECTION_STATE === "OK") {
        
            this.subscription.unsubscribe();
            
            this.client.disconnect( function()  {
                console.log("See you next time!"); 
            });
            
            this.ws.close();
          
            window.dispatchEvent( new Event( "clear-logs" , 
                                              {  bubbles: true , 
                                                 composed: true } ) ) ;
                                                     
            this.CONNECTION_STATE = "KO" ;
                                                       
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
  

  
   // This will be called upon arrival of a message
   on_message_with_remove_perm(message) {
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
 
 
