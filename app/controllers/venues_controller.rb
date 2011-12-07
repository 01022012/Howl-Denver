class VenuesController < ApplicationController
  def index
    @venues = Venue.order(:venue_type)
  end
  
  def show
    @venue = Venue.find(params[:id])
    @upcoming_concerts = @venue.concerts.where( 'Concerts.concert_date >= ?', Date.today )
  end
  
  def new
    @venue = Venue.new
  end
  
  def create
    @venue = Venue.new(params[:venue])
    
    if @venue.save
      redirect_to(@venue)
    else 
      render :action => 'new'
    end
  end
  
  def edit
    @venue = Venue.find(params[:id])
  end
  
  def update
    @venue = Venue.find(params[:id])

    if @venue.update_attributes(params[:venue])
      redirect_to(@venue)
    else
      render :action => 'edit'
    end
  end
  
  def suggest
    @result = Venue.search( params[:term] )
    
    respond_to do |format|
        format.html
        format.json { render :json => @result }
    end
  end
  
  def destroy
    
  end
end
