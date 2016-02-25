import {Injectable} from "angular2/core";
import {Http, Response} from 'angular2/http';
import {ToDo} from './todo';
import {Observable} from 'rxjs/Observable';
import {Headers, RequestOptions} from 'angular2/http';

@Injectable()
export class ToDoService {

    constructor (private _http: Http) {}

    private _todosUrl = 'http://127.0.0.1:4000/api/v1/todos';
    private _todoUrl = 'http://127.0.0.1:4000/api/v1/todo/';

    /**
     * Return the To Do list from REST Api
     */
    getToDos() : Observable<ToDo[]>  {

        return this._http.get(this._todosUrl)
            .map(res => {
                if(res.status === 200)
                    return <string[]> res.json();
                else
                    return <string[]>[];
            })
            .flatMap(links => Observable.forkJoin(links.map((link) => this.getToDo(link))))
            .catch(this._handleError);

    } // getToDos() : Observable<ToDo[]>

    /**
     * Return a To Do from it's id from REST Api
     */
    getToDoById(id: string) : Observable<ToDo>  {

        return this._http.get(this._todoUrl + id)
            .map(res => <ToDo> res.json())
            .catch(this._handleError);

    } // getToDoById(id: string) : Observable<ToDo>

    /**
     * Return the To Do corresponding to the id
     */
    getToDo(url: string) : Observable<ToDo> {

        return this._http.get(url)
            .map(res => <ToDo> res.json())
            .catch(this._handleError);

    } // getToDo(url: string) : Observable<ToDo>

    /**
     * Post a new To Do
     */
    postToDo(todo: ToDo) : Observable<ToDo>  {

        const body = JSON.stringify({ description: todo.description, status: todo.status });
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http.post(this._todosUrl, body, options)
            .map(res =>  <ToDo> res.json())
            .catch(this._handleError);

    } // postToDo(todo: ToDo) : Observable<ToDo>

    /**
     * Update a To Do
     */
    updateToDo(todo: ToDo) : Observable<ToDo>  {

        const body = JSON.stringify({ description: todo.description, status: todo.status });
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http.put(this._todoUrl + todo.id, body, options)
            .map(res =>  <ToDo> res.json())
            .catch(this._handleError);

    } // updateToDo(todo: ToDo) : Observable<ToDo>

    /**
     * Delete a To Do
     */
    deleteToDo(id: string) : Observable<string>  {

        return this._http.delete(this._todoUrl + id)
            .map(res => <string> res.text())
            .catch(this._handleError);

    } // deleteToDo(id: string) : Observable<string>

    /**
     * Catch REST To Do Api error
     */
    private _handleError(error: Response) {

        // In a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.text() || 'Server error');

    } // _handleError(error: Response)

} // export class ToDoService
