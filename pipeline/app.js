
 class Notifications  extends HTMLElement {

   constructor() { 
	super()  ;
   }

   connectedCallback() {

	this.outData = document.getElementById("coby-textarea") ;

      	this.events = new EventSource('https://sse.now.sh');
        this.events.onopen  = (e) => console.log(e);

	this.events.onmessage = (e) => {

            this.innerHTML = e.data ;

	    this.outData.value += e.data + "\n";
                  document.getElementById("coby-textarea").scrollTop = 
                      document.getElementById("coby-textarea").scrollHeight ;
        }

	this.events.onerror = (error) => console.log(error) ;
   }
 }

 customElements.define("coby-notifications", Notifications ) ;

 
 for ( let i=0; i<10; i++ )     {
    setTimeout( function timer(){
      setCurrentStep(i) ;
    }, i*3000 );
 }


 function setCurrentStep( step ) {
  
  var steps = document.querySelectorAll('#coby ul li') ;

    for(  i = 0; i < steps.length; i++ ) {

      if ( i == step ) {
        steps[i].classList.add("active") ;
      } else {
        steps[i].classList.remove("active") ;
      }
    }

 }

/* Default open tab outout logs when loading the page */
document.getElementById("defaultOpenOutputLogs").click();

/* TAB */

function openTab(evt, type) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(type).style.display = "block";
  evt.currentTarget.className += " active";
}
