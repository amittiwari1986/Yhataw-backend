/**
 * Maintain DB Connection With Mongo Atlas With PoolSize
 * @author Amit Kumar
 * @copyright Amit
 * @version 1.0
 * @summary Connection File
 */

const mongoose = require("mongoose");
const dbOptions = {
  useNewUrlParser: true,
  //  poolSize:process.env.POOL_SIZE
};
// mongoose.connect("mongodb://localhost:27017/Yhataw", dbOptions, (err) => {
//   if (err) {
//     console.log("DB Error", err);
//   } else {
//     console.log("Connected to DB");
//   }
// });

// mongoose.connect("mongodb://yhatawAdmin:yhatawAdmin-qa@3.110.159.174:27017/Yhataw-qa", dbOptions, (err) => {

mongoose.connect("mongodb://Amit:amitUsers1221@65.2.182.125:27017/test", dbOptions, (err) => {
  if (err) {
    console.log("DB Error", err);
  } else {
    console.log("Connected to DB");
  }
});

module.exports = mongoose;
