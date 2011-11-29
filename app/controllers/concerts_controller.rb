class ConcertsController < ApplicationController
  # Retrieves all Concerts into an array variable and makes it available to the index.html.erb view.
  def index
    if params[:week].blank? 
      @week = Date.today.cweek 
      @year = Date.today.cwyear
    else
      @week = params[:week].to_i
      @year = params[:year].to_i
      
      if @week > 52
        @week = 1 
        @year += 1
      end 
      if @week < 1 
        @week = 52
        @year -= 1
      end
    end
    
    @concerts = Concert.week @week, @year
  end
  
  # Retrieves a single Concert and makes it available to the show.html.erb view.
  def show
    @concert = Concert.find(params[:id])
  end
  
  # Creates a new instance of Concert and makes it available to the new.html.erb view.
  def new
    @concert = Concert.new
  end
  
  # Creates a new show and redirects the user to concert page
  def create
    @concert = Concert.new(params[:concert])   
    
    if params[:artist_names].present?
        params[:artist_names].each do |a_name|
          artist = Artist.create( :name => a_name )
          @concert.artists << artist 
        end # /to delete
     end
    
     #to delete
    if @concert.save(params[:concert])
      redirect_to(@concert)
    else
      render :action => 'new'
    end
  end
  
  # Retrieves a single Concert and makes it available to the edit view
  def edit 
    @concert = Concert.find(params[:id])
  end
  
  # Updates the attributes of a Concert. If update fails, render the edit action.
  def update
    @concert = Concert.find(params[:id])
    
    if params[:concert][:artist_ids].blank?
      params[:concert][:artist_ids] = []
    end
    
    #to delete
    if @concert.update_attributes(params[:concert])
      if params[:artist_names].present?
        Artist.add_new_artists_to_concert params[:artist_names], @concert
      end
    
      redirect_to(@concert)
    else
      render :action => 'edit'
    end
  end
  
  def destroy
    @concert = Concert.find( params[:id] )
    @concert.destroy 
    
    redirect_to concerts_path
  end
end
