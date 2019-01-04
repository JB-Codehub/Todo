const db = require("../db/mongoose");
const todoSchema = require("../model/todoSchema");
module.exports = {
  getTodo: userobj => {
    return new Promise((resolve, reject) => {
      todoSchema
        .find(userobj)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  addTodo: userObj => {
    return new Promise((resolve, reject) => {
     // console.log("Input received in  serivce" + userObj);
      todoSchema
        .create(userObj)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateTodo: userObj => {
    return new Promise((resolve, reject) => {
    //  console.log("Input received in  serivce" + userObj);
      let query = { id: userObj.id };
      todoSchema
        .update(query, userObj)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },deleteTodo: userObj => {
    return new Promise((resolve, reject) => {
    //  console.log("Input received in  serivce" + JSON.stringify(userObj));
      let query = { id: userObj.id };
      todoSchema
        .deleteOne(query)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
