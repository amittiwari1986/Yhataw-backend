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
mongoose.connect("mongodb://3.110.92.156:27017/task", dbOptions, (err) => {
  if (err) {
    console.log("DB Error", err);
  } else {
    console.log("Connected to DB");
  }
});

module.exports = mongoose;
