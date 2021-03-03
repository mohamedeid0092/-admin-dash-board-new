const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Restaurant = new Schema({
    name:{
    type: String
  },
  image_path: {
    type:String
  },
  restaurant_features: {
    type: Array
  },
  establishment_type: {
    type: Array
  },
  meals: {
    type: Array
  },
  price_range: {
    type: String
  },
  cuisine: {
    type: Array
  },
  dietary_restrictions: {
    type: Array
  },
  location:{
      type:String
  },
  phone:{
    type:Number
},
// reviews:{
//     type:Array
// },
// stars:{
//     type:Number
// }
}, {
  collection: 'restaurants'
})

module.exports = mongoose.model('Restaurant', Restaurant)