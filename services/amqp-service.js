 
 class AmqpService {
 
    client = "bar"
      "use strict";
    
    constructor( url ) {  
      this.url = url ; // "https://sse.now.sh" ;
      
      
  //  attachScript("https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.js") ;
  //  attachScript("https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.js") ; 
    
    // Use SockJS
   // Stomp.WebSocketClass = SockJS;
 
    // Connection parameters
    this.mq_username = "admin" ;
    this.mq_password = "admin" ;
    this.mq_vhost    = "/"     ;
    this.mq_url      = url     ;
    
    // The queue we will read. The /topic/ queues are temporary
    // queues that will be created when the client connects, and
    // removed when the client disconnects. They will receive
    // all messages published in the "amq.topic" exchange, with the
    // given routing key, in this case "mymessages"
    
    //  mq_queue    = "/exchange/log-exchange";
    this.mq_queue    = "log-queue" ;
    
   
    this.ws = new WebSocket( this.mq_url);
 
    this.client = Stomp.over(this.ws);
    
    this.client.debug = ( str) => { 
       console.log( str );
    } ;
       
    this.connectedCallback() ; 
    
   }

   connectedCallback() {
        this.client.connect( this.mq_username,  this.mq_password, () => this.on_connect(), err => this.on_connect_error(err), this.mq_vhost );            
   }
   
   on_connect() {

    this.client.subscribe( this.mq_queue, this.on_message,  {'ack': 'client'} );
      
       /* Send data to textarea componenent wich is listening on the event $onRecievedDataLogsEvent */
      window.dispatchEvent( new CustomEvent ( onRecievedDataLogsEvent , 
                                         {  bubbles: true    , 
                                            composed: true   ,
                                            detail: {
                                              message: 'Connected to RabbitMQ-Web-Stomp'
                                            } 
                                         } 
                               ) ) ;
                               
     
    }
    
   on_connect_error( er) {

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
  

 }
 
 
