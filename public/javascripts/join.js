$(document).ready(function(){
	load();
});
var name = $('#groupTitle').html();
var rname = "r" + name;
var initname;
var socket = io();
var initial;

function load() {
	$.getJSON('/get/' + name, function(data) {
		if(data.length == 0){
			dne();
		}else{
			console.log(data);
      $('#loading').hide();
      initial = true;
		}
	});
}
function dne(){
	$('body').html('<h2>Poll Does Not Exist</h2>');
}

function vote(vote){
  socket.emit('vote', vote, name, initial);
  initial = false;
  if(vote == 1){ 
    $('#btn-yes').addClass('disabled');
    $('#btn-no').removeClass('disabled');
  }else{
    $('#btn-yes').removeClass('disabled');
    $('#btn-no').addClass('disabled');
  }
  return false;
}
socket.on(name, function(vote, init){
  if(init){
    if(vote == 1){
      $('#yes').html(parseInt($('#yes').html()) + 1);
    }else{
      $('#no').html(parseInt($('#no').html()) + 1);
    }
  }else{
    if(vote == 1){
      $('#yes').html(parseInt($('#yes').html()) + 1);
      $('#no').html(parseInt($('#no').html()) - 1);
    }else{
      $('#no').html(parseInt($('#no').html()) + 1);
      $('#yes').html(parseInt($('#yes').html()) - 1);
    }
  }
});

function zero(){
  socket.emit('reset', rname);
}

socket.on(rname, function(){
  initial = true;
  $('#btn-yes').removeClass('disabled');
  $('#btn-no').removeClass('disabled');
  $('#no').html(0);
  $('#yes').html(0);
});
