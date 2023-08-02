
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserTeamSchema = new Schema({
        team_id:{type:Schema.Types.String,required:true,ref: "teams"},
        user_id:{type:Schema.Types.String,required:true,ref: "users"},
        role_id:{type:Schema.Types.String,required:true,ref: "roles"},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const user_team= connection.model('user_team',UserTeamSchema);
 module.exports = user_team;