System.register(['angular2/core', 'angular2/router', "./todo.service", './todo'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, todo_service_1, todo_1;
    var NewToDoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (todo_service_1_1) {
                todo_service_1 = todo_service_1_1;
            },
            function (todo_1_1) {
                todo_1 = todo_1_1;
            }],
        execute: function() {
            NewToDoComponent = (function () {
                function NewToDoComponent(_service, _router) {
                    this._service = _service;
                    this._router = _router;
                    this.status = ['TO DO', 'IN PROGRESS', 'DONE'];
                }
                /**
                 * Call on component initialization
                 */
                NewToDoComponent.prototype.ngOnInit = function () {
                    this.todo = new todo_1.ToDo(null, null);
                    this.todo.status = 'TO DO';
                }; // ngOnInit()
                /**
                 * Update a To DO
                 */
                NewToDoComponent.prototype.postToDo = function () {
                    var _this = this;
                    this._service.postToDo(this.todo)
                        .subscribe(function (todo) { return _this.todo = todo; }, function (error) { return _this.errorMessage = error; }, function () { return _this.goToDoList(); });
                }; // postToDo()
                /**
                 * Go to To Do list
                 */
                NewToDoComponent.prototype.goToDoList = function () {
                    this._router.navigate(['ToDoList']);
                }; // goToDoList()
                NewToDoComponent = __decorate([
                    core_1.Component({
                        selector: 'new-to-do',
                        templateUrl: 'templates/components/new_to_do.html',
                        styleUrls: ['resources/style.css'],
                        providers: [todo_service_1.ToDoService]
                    }), 
                    __metadata('design:paramtypes', [todo_service_1.ToDoService, router_1.Router])
                ], NewToDoComponent);
                return NewToDoComponent;
            })();
            exports_1("NewToDoComponent", NewToDoComponent); // export class NewToDoComponent implements OnInit
        }
    }
});
//# sourceMappingURL=new-to-do.component.js.map