const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Hotel = new Schema({
    images:{
    type: Array
  },
  deals:{
      type: Array
  },
  amenities:{
    type:Array
  },
  style: {
    type: Array
  },
  description: {
    type: Object
  },
  name: {
    type: String
  },
  booking:{
    type:Array
  },
 map: {
    type: Object
  },
  rooms: {
    type: Number
  },
  distance:{
    type: Object
  },
  reviews: {
    type: Array
  },
  likes: {
    type: Number
  },
  Pricedeals:{
      type:Array
  },
  langaugeSpoken:{
    type:Array
},
rating:{
    type:Array
},
class:{
  type:mongoose.Schema.Types.ObjectId
},
popular:{
  type:Array
}  
}, {
  collection: 'hotels1'
})

module.exports = mongoose.model('Hotel', Hotel)