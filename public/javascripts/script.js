function join() {
	var name = $('#joinName').val();
	window.location = name;
}

function create(){
	var name = $('#createPoll').val();
	var duration = $('#createDuration').val();
	var now = Date.now();
	var expires = now + (duration * 60 * 60 * 1000);
	var failed = false;
	$.getJSON('/get/' + name, function(data) {
		if(data.length == 0){
			create();
		}else{
			alert("Poll Already Exists");
		}
	});
	function create(){
		$.ajax({
			url: '/create/',
			type: 'POST',
			dataType: 'JSON',
			data: {
				name: name,
				expires: expires,
				yes: 0,
				no: 0
			},
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			alert("error creating the session");
			failed = true;
		})
		.always(function() {
			if(!failed){
				window.location = name;
			}
		});
	}
}