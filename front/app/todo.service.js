System.register(["angular2/core", 'angular2/http', 'rxjs/Observable'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1, http_2;
    var ToDoService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            ToDoService = (function () {
                function ToDoService(_http) {
                    this._http = _http;
                    this._todosUrl = 'http://127.0.0.1:4000/api/v1/todos';
                    this._todoUrl = 'http://127.0.0.1:4000/api/v1/todo/';
                }
                /**
                 * Return the To Do list from REST Api
                 */
                ToDoService.prototype.getToDos = function () {
                    var _this = this;
                    return this._http.get(this._todosUrl)
                        .map(function (res) {
                        if (res.status === 200)
                            return res.json();
                        else
                            return [];
                    })
                        .flatMap(function (links) { return Observable_1.Observable.forkJoin(links.map(function (link) { return _this.getToDo(link); })); })
                        .catch(this._handleError);
                }; // getToDos() : Observable<ToDo[]>
                /**
                 * Return a To Do from it's id from REST Api
                 */
                ToDoService.prototype.getToDoById = function (id) {
                    return this._http.get(this._todoUrl + id)
                        .map(function (res) { return res.json(); })
                        .catch(this._handleError);
                }; // getToDoById(id: string) : Observable<ToDo>
                /**
                 * Return the To Do corresponding to the id
                 */
                ToDoService.prototype.getToDo = function (url) {
                    return this._http.get(url)
                        .map(function (res) { return res.json(); })
                        .catch(this._handleError);
                }; // getToDo(url: string) : Observable<ToDo>
                /**
                 * Post a new To Do
                 */
                ToDoService.prototype.postToDo = function (todo) {
                    var body = JSON.stringify({ description: todo.description, status: todo.status });
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this._http.post(this._todosUrl, body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this._handleError);
                }; // postToDo(todo: ToDo) : Observable<ToDo>
                /**
                 * Update a To Do
                 */
                ToDoService.prototype.updateToDo = function (todo) {
                    var body = JSON.stringify({ description: todo.description, status: todo.status });
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this._http.put(this._todoUrl + todo.id, body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this._handleError);
                }; // updateToDo(todo: ToDo) : Observable<ToDo>
                /**
                 * Delete a To Do
                 */
                ToDoService.prototype.deleteToDo = function (id) {
                    return this._http.delete(this._todoUrl + id)
                        .map(function (res) { return res.text(); })
                        .catch(this._handleError);
                }; // deleteToDo(id: string) : Observable<string>
                /**
                 * Catch REST To Do Api error
                 */
                ToDoService.prototype._handleError = function (error) {
                    // In a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.text() || 'Server error');
                }; // _handleError(error: Response)
                ToDoService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ToDoService);
                return ToDoService;
            })();
            exports_1("ToDoService", ToDoService); // export class ToDoService
        }
    }
});
//# sourceMappingURL=todo.service.js.map