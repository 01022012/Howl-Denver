
/*
# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
*/

$('document').ready( function(){
	
	//EVENT BINDINGS
	$('.lineup').on('click', 'a', remove_artist) ;

  
  $(function(){
    $('#new_artist_form').dialog({
        autoOpen: false,
        width: 400,
        height: 500,
        modal: true
    }) ;
  }); 
	
	function add_artist( name, id){
    if( id == -1 ){
      $('#new_artist_form').dialog('open') ;
 				/* var hidden_artist_field = '<input type="hidden" name="concert[artist_ids][]" value="' + 
				artistID + '">' ; */
		}//end if
		else{
				var hidden_artist_html = '<input type="hidden" name="artist_names[]" value="'+ name +'"></input>' ;
		}//end else
		
		var lineup_item_html = '<li>' + name + hidden_artist_html + '<a href="#" class="remove_artist red-button">Remove</a></li>' ;
		
		$(lineup_item_html).appendTo('.lineup') ;
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
							
							var newoption = {} ;
							newoption["id"] = -1 ;
              newoption["name"] = "<img src='/assets/plus.png'> New Artist" ;
              suggestions.push( newoption ) ;
				
							$.each( data, function( key, val ){
								artist = {} ;
								artist["id"] = val.id ;
								artist["name"] = val.name ;
								suggestions.push(artist) ;
							}); //end each
				
							add( suggestions );
						});//end getJSON
			},//end function
			select: function( event, ui ) {
				  add_artist( ui.item.name, ui.item.id);
				return false;
			}, //end function
		})//end autocomplete 
		.data( "autocomplete" )._renderItem = function( ul, item ) {
			return $( "<li></li>" )
				.data( "item.autocomplete", item )
				.append( "<a>" + item.name + "</a>" )
				.appendTo( ul );
		};//end .data
	});//end artist_autocomplete 

	//Venue Autocomplete
	$(function(){
		$( "#venue_autocomplete" ).autocomplete({
			minLength: 1,
			source: function( req, add ){
				$.getJSON("/venues/suggest/", req, function(data){
					var suggestions = [] ; 
					
					var newoption = {} ;
              newoption["name"] = "<img src='/assets/plus.png'> New Venue" ;
              newoption["id"] = -1 ;
              suggestions.push( newoption ) ;
				
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
			  select_venue( ui.item.name, ui.item.address, ui.item.id)
			  return false ;
			}
		})
		.data( "autocomplete" )._renderItem = function( ul, item ) {
		  if(item.id == -1 ){
		    return $( "<li></li>" )
          .data( "item.autocomplete", item )
          .append( "<a>" + item.name + "</a>" )
          .appendTo( ul );
		  }//end if
		  else{
			 return $( "<li></li>" )
				  .data( "item.autocomplete", item )
				  .append( "<a>" + item.name + "<br>" + item.address + "</a>" )
				  .appendTo( ul );
			}//end else
		};  
	});//end venue_autocomplete
   
  
	function select_venue(name, address, id){ 
	  if( id == -1 ){
	    alert( 'New Venue' )
	  }//end if
	  else{
	    var hidden_venue = '<input type="hidden" name ="concert[venue_id]" value="' + id + '">' ;
	    
	    var vHTML = hidden_venue + 
            '<span class="red">' + name + '</span>'  ;
	  }//end else	
		$('#venue_area').html( vHTML ) ;
	}//end select_venue
}) ;
