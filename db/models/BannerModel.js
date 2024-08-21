
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const BannerSchema = new Schema({
       title:{type:Schema.Types.String},
       description:{type:Schema.Types.String},
       image:{type:Schema.Types.String},
       status:{type:Schema.Types.String},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const banner= connection.model('banner',BannerSchema);
 module.exports = banner;