class ArtistsController < ApplicationController
  def index
    @artists = Artist.order(:name)
  end
  
  def show
    @artist = Artist.find(params[:id])
    @upcoming_concerts = @artist.concerts.where( 'concert_date >= ?', Date.today ).order('concert_date')
  end
  
  def new
    @artist = Artist.new

   end
  
  def create
    @artist = Artist.new(params[:artist])
    
    if @artist.save 
      redirect_to(@artist)
    else
      render :action => "new"
    end
  end
  
  def edit
    @artist = Artist.find(params[:id])
  end
  
  def update
    @artist = Artist.find(params[:id])
    
    if @artist.update_attributes(params[:artist])
      redirect_to @artist
    else
      render :action => "show"
    end
  end
  
  #auto suggest code for Artists
  def suggest
    @result = Artist.search( params[:term] )
    
    respond_to do |format|
        format.html
        format.json { render :json => @result }
    end
  end
end
