
/*
# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
*/

$('document').ready( function(){
	
	//EVENT BINDINGS
	$(document).on('click', '#select_venue', select_venue ) ; 
	$(document).on('click', '#change_venue', change_venue ) ;
	$(document).on('click', '#add_artist', add_artist ) ;
	$(document).on('click','#venue_autocomplete', venue_autocomplete) ;
	$(document).on('click','#next_week', next_week ) ;
	$('.edit_concert_lineup').on('click', 'a', remove_artist) ;

	function next_week(){
		var responseText = $.ajax()
	}

	function add_artist(){
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
			$('#temp_artist').val(null) ;
		}//end if
	}//end add_artist 

	function remove_artist(){		
		$(this).parent().remove() ;
	}//end remove_artist
   
	$(function(){
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
							}); //end each
				
							add( suggestions );
						});//end getJSON
			},//end function
			select: function( event, ui ) {
				$( "#artist_autocomplete" ).val( ui.item.label );
				$( "#temp_artist").val(ui.item.value);

				return false;
			}, //end function
		})//end autocomplete 
		.data( "autocomplete" )._renderItem = function( ul, item ) {
			return $( "<li></li>" )
				.data( "item.autocomplete", item )
				.append( "<a>" + item.label + "</a>" )
				.appendTo( ul );
		};//end .data
	});//end artist_autocomplete 

	//Venue Autocomplete
	function venue_autocomplete(){
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
	}//end venue_autocomplete
   
  
	function select_venue(){ 
		if($('#venue_autocomplete').val() != "" ){
			var venueName = $('#venue_autocomplete').val() ;
			var venueID = $('#temp_venue').val();
					
			var hidden_venue = '<input type="hidden" name ="concert[venue_id]" value="' + venueID + '">' ;
		
			var vHTML = hidden_venue + 
						venueName + 
						'<button id="change_venue" name="button" type="button">Change Venue</button>' ;
		
			$('#venue_area').html( vHTML ) ;
			$('#temp_venue').val(null) ; 
		}//end if 
	}//end select_venue
 
	function change_venue(){
		
		var vHTML = '<div class="suggest_field">' + 
						'<input id="venue_autocomplete"></input>' +
						'<button id="select_venue" name="button" type="button">Select Venue</button>' +
						'</div>' ;
						
		$('#venue_area').html( vHTML ) ; 
	}//end change_venue
	
}) ;
