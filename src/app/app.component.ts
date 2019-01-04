import { Component, OnInit } from "@angular/core";
import { TodoObj } from "./app.todo.class";
import { HttpServiceService } from "./http-service.service";
import { isRegExp } from "util";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  todoSearch = "";
  newTodo = "";
  i: number;
  todoNewobj = [];
  text: string;
  regobj: RegExp = new RegExp("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$");
  todoList: TodoObj[];
  constructor(private todoService: HttpServiceService) {
    this.todoService.getTodoService().subscribe(res => {
      this.todoList = res.map(val => {
        return new TodoObj(val.id, val.name, val.status);
      });
    });
  }
  sortAsc = (a, b) => {
    if (a.id > b.id) {
      return -1;
    } else {
      return 1;
    }
  };
  ngOnInit() {
    // console.log(this.todoList);
    if (this.todoList != undefined) this.todoList.sort(this.sortAsc);
  }
  addTodo = (newTodo: string):void => {
    if (newTodo.length > 0) {
      if (this.todoList != undefined) this.todoList.sort(this.sortAsc);
      this.todoSearch = "";
      this.todoService
        .addTodoService(
          new TodoObj(
            this.todoList == undefined ? 1 : this.todoList.length + 1,
            newTodo,
            "NotYet"
          )
        )
        .subscribe(res => {
          this.todoList = res
            .map(val => {
              // console.log(JSON.stringify(val));
              return new TodoObj(val.id, val.name, val.status);
            })
            .sort(this.sortAsc);
        });
    } else {
      console.log("Please provide some value");
    }
  };
  removeTodo = (todo: TodoObj) => {
    this.todoService.deleteTodoService(todo).subscribe(res => {
      this.todoList = res
        .map(val => {
          // console.log(JSON.stringify(val));
          return new TodoObj(val.id, val.name, val.status);
        })
        .sort(this.sortAsc);
    });
  };
  updatetodo = (todo: TodoObj) => {
    this.todoService.updateTodoService(todo).subscribe(res => {
      this.todoList = res
        .map(val => {
          // console.log(JSON.stringify(val));
          return new TodoObj(val.id, val.name, val.status);
        })
        .sort(this.sortAsc);
    });
  };
  validate = ():boolean => {
    if (this.todoSearch.length < 100) {
      return this.regobj.test(this.todoSearch) === true ? true : false;
    } else {
      return false;
    }
  };
  error = ():void => {
    // console.log("Erro");
  };

  // tracebyID = (index: number, todoObj) => {
  //   return todoObj;
  // }
}
