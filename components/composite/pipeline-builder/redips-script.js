/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */

/* enable strict mode */
"use strict"; 

var rd = REDIPS.drag;	// reference to the REDIPS.drag lib

var redipsInit,			// define redipsInit variable
	//toggleAnimation,	enable / disable animation
	startPositions,		// remember initial positions of DIV elements
	pos = {} ;			// initial positions of DIV elements
	


// redips initialization
redipsInit = function () {
	// initialization
	rd.init();
        rd.hover.colorTd = '#9BB3DA';
	// enable shift animation
	rd.shift.animation = true;

	// save initial DIV positions to "pos" object (it should go after initialization)
	startPositions();
	// in a moment when DIV element is moved, set drop_option property (shift or single)
	rd.event.moved = function () {
		// find parent table of moved element
		var tbl = rd.findParent('TABLE', rd.obj);
		// if table id is table1
		if (tbl.id === 'table1') {
			rd.dropMode = 'shift';
		}
		else {
			rd.dropMode = 'single';
		}
	};

         rd.dropMode = 'shift';
	// when DIV element is double clicked return it to the initial position
	rd.event.dblClicked = function () {

                var tbl = rd.findParent('TABLE', rd.obj);
		if ( tbl.id === 'table2' ) return ;

		// set dblclicked DIV id
		var currentID = rd.obj.id;

                var parentID = currentID.match(/\d+$/);

		if (parentID) {
		    parentID = currentID.replace("c" + parentID[0],'' ) ;
                }


               if( parentID == null ) parentID = currentID ;
                
                //alert( pos[id]);
		// move DIV element to initial position

                var originClass = document.getElementById(parentID).getAttribute('class') ;

                if ( originClass.includes("climit2_0") )      {
                     originClass = originClass.replace("climit2_0", "") ;
		     originClass += " redips-clone climit2_1 "          ; 
                } 

		rd.moveObject({
			id: currentID,		// DIV element id
			target: pos[parentID]	,// target position
                        clone: false,
                        overwrite: true,
                        callback: function () {
                            //alert('Finished');
                             RemoveEmptyConsecutifRows('table1'); 

 			     document.getElementById(currentID)
                                     .id = parentID ;

                             document.getElementById(parentID)
                                     .className = originClass ;
                        }
		});
 
	       
	};

       // REDIPS.drag.shift.mode = 'vertical2';

	rd.event.moved  = function () {
		//alert( "Moved");
	};
	rd.event.notMoved = function () {
		//alert( "NotMoved");
	};

	rd.event.droppedBefore = function (targetCell) {

            var emptyCell = rd.emptyCell( targetCell, 'test' ) ;
 
            if ( ! emptyCell /* Shift */ ) {
               
               if( checkIfLastRowForTableIsEmpty('table1') ) 
                   insertEmptyLastRow('table1') ;               
            }

            // var pos = rd.getPosition()[1];
            // var totalEmptyCell = countEmptyCellForTableFromIndex('table1', pos) ;

            // if( totalEmptyCell < 1 ) insertEmptyLastRow('table1');

	};

};


// function scans DIV elements and saves their positions to the "pos" object
startPositions = function () {
	// define local varialbles
	var divs, id, i, position;
	// collect DIV elements from dragging area
	divs = document.getElementById('redips-drag').getElementsByTagName('div');
	// open loop for each DIV element
	for (i = 0; i < divs.length; i++) {
		// set DIV element id
		id = divs[i].id;
		// if element id is defined, then save element position 
		if (id) {
			// set element position
			position = rd.getPosition(divs[i]);
			// if div has position (filter obj_new) 
			if (position.length > 0) {
				pos[id] = position;
			}
		}
	}
};

/*
// enable / disable animation
toggleAnimation = function (chk) {
	REDIPS.drag.shift.animation = chk.checked;
};
*/

// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', redipsInit, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redipsInit);
}


function RemoveEmptyConsecutifRows(tableID ) {

    var table = document.getElementById(tableID);

    var consecutifEmptyRows = 0;

   // alert(table.rows.length - 3 );
//alert(table.rows[ table.rows.length - 3 ].cells.length);

    for( var i = table.rows.length - 1 ; i > 0; i-- ) {

	  if (table.rows[i].cells.length > 0 ) {
	    if( table.rows[i].cells[0].textContent.trim() == '') {
               consecutifEmptyRows = consecutifEmptyRows + 1 ;
            }
            else { // Init consecutifEmptyRows to 0
	      consecutifEmptyRows = 0 ;
            }
	  }

          if( consecutifEmptyRows == 3 ) {
	      table.deleteRow( i + 1) ;
	      table.deleteRow( i + 1) ;
              consecutifEmptyRows = 0 ;
          } 
     }
   
     // var empty = checkIfLastRowForTableIsEmpty(tableID) ;

     // if(empty) return;

     //  var table = document.getElementById(tableID);
     // var rowCount = table.rows.length;
     // table.deleteRow(rowCount -1);
}

function insertEmptyLastRow(tableID) {
      var table=document.getElementById(tableID);
      var rowCount = table.rows.length;
      var y = table.insertRow(rowCount).insertCell(0);
      y.innerHTML="";
}

function countEmptyCellForTable( tableID) {

     var totalEmptyCell = 0 ;

     var table = document.getElementById(tableID);
	
     for (var i = 1; i < table.rows.length; i++) {
	  if (table.rows[i].cells.length) {
	    if( table.rows[i].cells[0].textContent.trim() == '') totalEmptyCell++ ;
	  }
     }

     return totalEmptyCell ;
}

function checkIfLastRowForTableIsEmpty( tableID ) {
  var table = document.getElementById(tableID);
  var content = table.rows[ table.rows.length-1].cells[0].textContent.trim();
  return ( content.length  > 0 ) ;
}


function countEmptyCellForTableFromIndex( tableID, index ) {

     var totalEmptyCell = 0 ;

     var table = document.getElementById(tableID);
	
     for (var i = index; i < table.rows.length; i++) {
	  if (table.rows[i].cells.length) {
	    if( table.rows[i].cells[0].textContent.trim() == '') totalEmptyCell++ ;
	  }
     }

     return totalEmptyCell ;
}


function serialize( div ) {


   var DSL = "\n"       ;
   var INDENTATION = "" ;

   var BEGIN_LOOP = "Begin-" ;
   var END_LOOP   = "End-"   ;

   var table = document.getElementById("table1");
	
   for (var i = 0; i < table.rows.length; i++) {

        if (table.rows[i].cells.length)  {

           var JOB = table.rows[i].cells[0].textContent.trim() ;

           var JOB_PARAM = table.rows[i].cells[0].querySelector("input") ; 

           if ( startWith ( JOB , END_LOOP ) ||  startWith ( JOB , BEGIN_LOOP ) ) {
		   INDENTATION = "" ;                  
	   }

	   if( table.rows[i].cells[0].textContent.trim() !== '' ) {

               DSL += INDENTATION + JOB ;  

               if( JOB_PARAM !== null && JOB_PARAM.value !== '' ) {
 		   DSL += " : " + JOB_PARAM.value ; 
               }
              
               DSL += "\n\n" ;

               if ( startWith ( JOB , BEGIN_LOOP ) ) {
		   INDENTATION = "            " ;                
	       }
 
           }

	}
   }
  
   div.innerHTML  =  DSL ;

}


function startWith( value, regex ) {

  return value.startsWith(regex) ;
}


async function clearTable( tableID, keepTotalRows ) {
  
  var table = document.getElementById(tableID);

  /*let elems = [];*/

  var init = false ;

 /* var count =  table.rows.length - 1 ;*/

  //var map = new Map();

  for ( let i = 0; i < table.rows.length; i++ ) {

        if( table.rows[i].cells[0].querySelector("div") == null ) {
         /* count = count - 1 ;*/
          continue ; // if empty cell
        } ;

        var currentID = table.rows[i].cells[0].querySelector("div").id ;
 
        if( currentID == null ) {
         /* count = count - 1 ;*/
          continue ; // if empty cell
        }

        var parentID = currentID.match(/\d+$/);

	 parentID = currentID.replace("c" + parentID[0], '' ) ;        
 
        if( parentID == null ) { // no move
          /*count = count - 1 ;*/
          continue ; // if empty cell
        } ; 

        rd.moveObject({ 
	 		id: currentID ,	        // id of object to move
			clone: false,	        // clone option (if set to true then DIV element will be cloned)
			overwrite: false,       // overwrite target cell (if set to true, then content in target cell will be overwritten)
      target: pos[parentID],  // target position
      callback:  function (div)  {

			         var currentID = div.id ;
				 var parentID = currentID.match(/\d+$/);
				 parentID = currentID.replace("c" + parentID[0], '' ) ;        
	 
			         var originClass = document.getElementById(parentID).getAttribute('class') ;
					
				 if ( originClass.includes("climit2_0") )      {
				      originClass = originClass.replace("climit2_0", "") ;
				      originClass += " redips-clone climit2_1 "          ; 
                                      document.getElementById(parentID).className = originClass ;
                                      // rd.enableDrag(true, parentID);

                                      if( ! init ) {
                                        rd.enableDrag('init');
                                        init = true ;
                                      }
			  	 } 


                                div.remove(); 
                               /* count = count - 1 ; */         		        
                        }			
	});        

        await timer(100);
  }

  /*
  while ( count > 0 ) {
     await timer(100) ;
  }
  */

  removeAndKeepOnlyXRowsFromTable( tableID , keepTotalRows ) ;

}


async function removeAndKeepOnlyXRowsFromTable( tableID, keepTotalRows ) {

 var table = document.getElementById(tableID);	

 var rowCount = table.rows.length > keepTotalRows ;

 while( rowCount = table.rows.length > keepTotalRows ) {
   fadeOutRowInTable(table, table.rows.length - 1, 0.1 ) ;
   await timer(150) ;
 }
}

function fadeOutRowInTable( table, row, seconds )   {
  var element = table.rows[row];
  
  element.style.opacity = 1 ;
  element.style.background = "dimgray";
  element.style.transition = "opacity " + seconds + "s ease ";
  element.style.opacity = 0 ;
  setTimeout(function()     {   
    table.deleteRow( row )  ;
  }, seconds * 1000 ) ;
}

function timer(ms) {
 return new Promise(res => setTimeout(res, ms));
}


function fadeOutThenFadeInWithText( el , newText , speed ) {

    var seconds = speed/1000;
    el.style.transition = "opacity "+seconds+"s ease ";
    el.style.opacity = 0 ;
    setTimeout(function() {
        el.innerHTML = newText      ;
        fadeInDiv( el , speed * 5 ) ;
    }, speed ) ;
}


function fadeInDiv( el , speed ) {
  
  var seconds = speed/1000 ;
  el.style.transition = "opacity "+seconds+"s ease ";
  el.style.opacity = 1  ;
  setTimeout(function() {     
  }, speed ) ;
}

/*
function fadeInDiv(element, speed )   {
  var op = 0.1;  // initial opacity
  var timer = setInterval(function () {
      if (op >= 1){
          clearInterval(timer);
      }
      element.style.opacity = op ;
      op += 0.1;
  }, speed / 10 ) ;
}
*/


