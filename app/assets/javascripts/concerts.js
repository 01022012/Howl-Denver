/*
# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
*/

$('document').ready(function(){	
	
	$('#add_artist').click(function(){
		if($('#artist_autocomplete').val() != "" ){
		var artistName = $('#artist_autocomplete').val() ;
		var artistID = $('#temp_artist').val();
		
		if( artistID != ""){
			var hidden_artist_field = '<input type="hidden" name="concert[artist_ids][]" value="' + 
			artistID + '">' ;
		}//end if
		else{
			var hidden_artist_field = '<input type="hidden" name="artist_names[]" value="'+ artistName +'"></input>' ;
		}//end else
		
		var lineup_item_html = '<li>' + artistName + hidden_artist_field + '<a href="#" class="remove_artist red_link">Remove</a></li>' ;
		
		$(lineup_item_html).appendTo('.edit_concert_lineup') ;
		$('#artist_autocomplete').val(null) ;
		$('#temp_artist').val(null) ;}
	});//end add artist button code 
	
	//Remove artist
	$('.remove_artist').click(function(){		
		$(this).parent().remove() ;
	});

	//Artist Autocomplete
	$(function() {
		$( "#artist_autocomplete" ).autocomplete({
			minLength: 1,
			source: function( req, add ){
			$.getJSON("/artists/suggest/", req, function(data){
				var suggestions = [] ; 
				
				$.each( data, function( key, val ){
					artist = {} ;
					artist["value"] = val.id ;
					artist["label"] = val.name ;
					suggestions.push(artist) ;
				}); 
				
				add( suggestions );
			});
		},
			focus: function( event, ui ) {
				$( "#project" ).val( ui.item.label );
				return false;
			},
			select: function( event, ui ) {
				$( "#artist_autocomplete" ).val( ui.item.label );
				$( "#temp_artist").val(ui.item.value);

				return false;
			}, 
		}) 
		.data( "autocomplete" )._renderItem = function( ul, item ) {
			return $( "<li></li>" )
				.data( "item.autocomplete", item )
				.append( "<a>" + item.label + "</a>" )
				.appendTo( ul );
		};
	});
	
	//Venue Autocomplete
	$(function() {
		$( "#venue_autocomplete" ).autocomplete({
			minLength: 1,
			source: function( req, add ){
				$.getJSON("/venues/suggest/", req, function(data){
					var suggestions = [] ; 
				
					$.each( data, function( key, val ){
						venue = {} ;
						venue["name"] = val.name ;
						venue["address"] = val.address ;
						venue["id"] = val.id ;
						suggestions.push(venue) ;
					}); 
				
					add( suggestions );
				});
			},
			focus: function( event,ui ) {
				$( "#project" ).val( ui.item.label );
				return false;
			},
			select: function( event, ui ) {
				$('#venue_autocomplete').val( ui.item.name ) ;
				ui.item.address ;
				$('#temp_venue').val( ui.item.id ) ;
				return false;
			}
		})
		.data( "autocomplete" )._renderItem = function( ul, item ) {
			return $( "<li></li>" )
				.data( "item.autocomplete", item )
				.append( "<a>" + item.name + "<br>" + item.address + "</a>" )
				.appendTo( ul );
		};
	});
	
	//Select Venue
	
	$('#select_venue').click( function(){ 
		if($('#venue_autocomplete').val() != "" ){
			var venueName = $('#venue_autocomplete').val() ;
			var venueID = $('#temp_venue').val();
		
			alert( venueName + " " + venueID ) ; 
		
			var hidden_venue = '<input type="hidden" name ="concert[venue_id]" value="' + venueID + '">' ;
		
			var vHTML = hidden_venue + 
						venueName + 
						'<button id="change_venue" name="button" type="button">Change Venue</button>' ;
		
			$('#venue_area').html( vHTML ) ;
			$('#temp_venue').val(null) ; 
		} 
	}) ; 
	
	//Change Venue 
	$('#change_venue').click( function(){
		var vHTML = '<div class="suggest_field">' + 
						'<input id="venue_autocomplete"></input>' +
						'<button id="select_venue" name="button" type="button">Select Venue</button>'+
						'</div>' ;
						
		$('#venue_area').html( vHTML ) ;
	});
}) ;