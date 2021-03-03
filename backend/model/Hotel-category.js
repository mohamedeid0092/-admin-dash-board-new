const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let HotelCategory = new Schema({
    
safety:{
    type: Object
  },
  deals:{
      type: Array
  },
  popular: {
    type: Array
  },
  distance: {
    type: Array
  },
  amenities: {
    type: Array
  },
  hotelClass: {
    type: Array
  },
  languageSpoken: {
    type: Array
  }
 
}, {
  collection: 'hotel category'
})

module.exports = mongoose.model('HotelCategory', HotelCategory)