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
  
  def show
    @concert = Concert.find(params[:id])
  end
  
  def new
    @concert = Concert.new
  end
  
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
  
  def edit 
    @concert = Concert.find(params[:id])
  end
  
  def update
    @concert = Concert.find(params[:id])
    
    unless params[:concert][:artist_ids].present?
      params[:concert][:artist_ids] = []
    end
    
    if params[:artist_names].present?        
        params[:concert][:artist_ids] += Artist.create_many_artists( params[:artist_names] )
    end
     
    if @concert.update_attributes params[:concert] 
      redirect_to @concert 
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
