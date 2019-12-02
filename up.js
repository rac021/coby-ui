function selectionFile(evt) {
    
		var files = evt.target.files ;
		var fragmente = []           ;
        
		for (var i = 0, f; f = files[i]; i++) {
            
			fragmente.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ', f.size, ' bytes</li>') ;            
            
            var data = new FormData() ;
            data.append('file', f )   ;
               
            fetch('http://localhost:8080/start', {
               method: 'POST',
               body: data
            }) 
		}
		
		document.getElementById('_outFilesList')
		    	.innerHTML = '<ul>' + fragmente.join('') + '</ul>';
	}

document.addEventListener("DOMContentLoaded", function () {
	
	document.getElementById('_files')
		.addEventListener('change', selectionFile, false);
});
