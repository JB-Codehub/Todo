import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { TodoObj } from './app.todo.class';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  url = 'http://localhost:8080/v1/';
  constructor(private http: HttpClient) {}
  public getTodoService(): Observable<TodoObj[]> {

    return this.http.get<TodoObj[]>(this.url + 'todo');
  }
  public addTodoService(todo: TodoObj): Observable<TodoObj[]> {
    const httpheader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const option = {
      headers: httpheader
    };
    return this.http.post<TodoObj[]>(this.url + 'todo', todo, option);
  }  public updateTodoService(todo: TodoObj): Observable<TodoObj[]> {
    const httpheader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const option = {
      headers: httpheader
    };
    return this.http.post<TodoObj[]>(this.url + 'Updatetodo', todo, option);
  }  public deleteTodoService(todo: TodoObj): Observable<TodoObj[]> {
    const httpheader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const option = {
      headers: httpheader
    };
    return this.http.post<TodoObj[]>(this.url + 'Deletetodo', todo, option);
  }
}

