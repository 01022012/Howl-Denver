# Model for concerts.

class Concert < ActiveRecord::Base
  validates :concert_date, :description, :venue_id, :presence => true
 
  has_and_belongs_to_many :artists
  belongs_to :venue 

  def self.week wnum, ynum
    wstart = Date.commercial( ynum.to_i, wnum.to_i, 1 )
    
    wnum = 0 unless wnum < 52
    wend = Date.commercial( ynum.to_i, wnum.to_i + 1 , 1)
    self.where('concert_date >= ? AND concert_date < ?' , wstart, wend ).order('concert_date')
  end
end