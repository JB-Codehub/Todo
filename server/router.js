const expressRouter = require("express").Router();
const config = require("./globalconfig");
const todoService = require("./business layer/todo");
const { body } = require("express-validator/check");

const headerValidator = (req, res, next) => {
  if (req.method === "POST") {
    if (req.headers["content-type"] == undefined) {
      res.status(415).send("Please add Content-Type header");
    } else {
      if (req.headers["content-type"] === "application/json") {

        console.log("header validation Successful");
        next();
      } else res.status(415).send("Please check the header");
    }
  }
};

const fieldChecker = fieldObj => {
    return [
      body("id", "Please provide valid email address").isNumeric(),
      body("status", "Password should be 5 to 10 charater").isString(),
      body("name")
        .isString()
        .withMessage("Password should be 5 to 10 charater")
    ];
};

const fieldValidator = (req, res, next) => {
  let err = req.validationErrors();
  //console.log("Err" + err);
  if (err) {
    res.status(400).send({
      statusCode: 0,
      validationResults: err.map(val => {
        return { param: val.param, message: val.msg };
      })
    });
  } else {
    console.log("Params Validation Passed");
    next();
  }
};
expressRouter.get("/todo", async (req, res) => {
  try {
    console.log("Retrieve Request");

    if (config.dbFlag) {
      let todoList = await todoService.getTodo({});
      // console.log(todoList.length);
      if (todoList.length > 0)
        res.status(200).send(
          todoList.map(data => {
            return { name: data.name, id: data.id, status: data.status };
          })
        );
      else res.status(401).send("No data");
    } else {
      res
        .status(503)
        .send("DB service is not available please try again later");
    }
  } catch (err) {
   // console.log(err);
    res.status(400).json({ msg: "Try again later" });
  }
});

expressRouter.post(
  "/todo",
  headerValidator,
  fieldChecker({ formType: "register" }),
  fieldValidator,
  async (req, res) => {
    console.log("Add Request");
    if (config.dbFlag) {
      let todoObj = {
        id: req.body.id,
        name: req.body.name,
        status: req.body.status
      };


    //  console.log(JSON.stringify(todoObj));
      let todoinsert = await todoService.addTodo(todoObj);
      let todoList = await todoService.getTodo({});
      if (todoList.length > 0)
        res.status(200).send(
          todoList.map(data => {
            return { name: data.name, id: data.id, status: data.status };
          })
        );
      else res.status(401).send("No data");
    } else {
      res
        .status(503)
        .send("DB service is not available. Please try again later");
    }
  }
);

expressRouter.post(
  "/Updatetodo",
  headerValidator,
  fieldChecker(),
  fieldValidator,
  async (req, res) => {
    console.log("update Request");
    if (config.dbFlag) {
      let todoObj = {
        id: req.body.id,
        name: req.body.name,
        status: req.body.status
      };
     // console.log(JSON.stringify(todoObj));
      let todoinsert = await todoService.updateTodo(todoObj);
      let todoList = await todoService.getTodo({});
      if (todoList.length > 0)
        res.status(200).send(
          todoList.map(data => {
            return { name: data.name, id: data.id, status: data.status };
          })
        );
      else res.status(401).send("No data");
    } else {
      res
        .status(503)
        .send("DB service is not available. Please try again later");
    }
  }
);
expressRouter.post(
  "/Deletetodo",
  headerValidator,
  fieldChecker(),
  fieldValidator,
  async (req, res) => {
    console.log("Delete Request");
    if (config.dbFlag) {
      let todoObj = {
        id: req.body.id,
        name: req.body.name,
        status: req.body.status
      };

      let todoinsert = await todoService.deleteTodo(todoObj);
      let todoList = await todoService.getTodo({});
      if (todoList.length > 0)
        res.status(200).send(
          todoList.map(data => {
            return { name: data.name, id: data.id, status: data.status };
          })
        );
      else res.status(401).send("No data");
    } else {
      res
        .status(503)
        .send("DB service is not available. Please try again later");
    }
  }
);

module.exports = expressRouter;
