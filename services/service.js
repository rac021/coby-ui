 
 class Service  {

   constructor( url ) { 

        this.url = url ; // "https://sse.now.sh" ;
	this.connectedCallback() ;       
   }

   connectedCallback() {

	this.events = new EventSource(this.url) ;

        this.events.onopen  = (e) => console.log(e) ;

	this.events.onmessage = (e) => {

           /* Send data to textarea componenent wich is listening on the event $onRecievedDataLogsEvent */
           window.dispatchEvent( new CustomEvent ( onRecievedDataLogsEvent , 
                                         {  bubbles: true    , 
                                            composed: true   ,
                                            detail: {
						message: e.data						
					    } 
                                         } 
                               ) ) ;

           /* Send data to textarea componenent wich is listening on the event $onRecievedDataJobsEvent */
           window.dispatchEvent( new CustomEvent ( onRecievedDataJobsEvent , 
                                         {  bubbles: true    , 
                                            composed: true   ,
                                            detail: {
						message: " JOBS : " + e.data						
					    } 
                                         } 
                               ) ) ;

        }

   }
 }


