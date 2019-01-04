const mongooseObj = require("mongoose");
const dbConst = require("./dbConfig");

module.exports = {
  dbConnection: async () => {
    try {
      console.log("Connection URL:" + dbConst.url());
      return await mongooseObj.connect(
        dbConst.url(),
        { user: dbConst.dbuser, pass: dbConst.dbpwd, useNewUrlParser: true }
      );
    } catch (err) {
      console.log("error Occured " + err);
      throw Error("DB issues");
      // return new Error("DB Not Connected");
    }
  }
};

// try {
//     console.log(module.exports.dbConnection());
// }
// catch (e) {
//     console.log("Error :->" + e);

// }
// module.exports.dbConnection().then(res => {
//     console.log("promise value:" + res);
// }).catch(err => {
//     console.log("Promise Error :" + err);
// });
