const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
  FirstName:{
    type: String
  },
  LastName: {
    type:String
  },
  Username: {
    type:String
  },
  Home_Airport: {
    type:String
  },
  Email: {
    type:String
  },
  Address: {
    type: Array
  },
  Phone_Number: {
    type: String
  },
  Profile_Image:{
      type: String
  },
  Joining_date: {
      type: Date
  }

}, {
  collection: 'Users'
})

module.exports = mongoose.model('User', User)