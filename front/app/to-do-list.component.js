System.register(['angular2/core', 'angular2/router', './detail-to-do.component', './new-to-do.component', "./todo.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, detail_to_do_component_1, new_to_do_component_1, todo_service_1;
    var ToDoListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (detail_to_do_component_1_1) {
                detail_to_do_component_1 = detail_to_do_component_1_1;
            },
            function (new_to_do_component_1_1) {
                new_to_do_component_1 = new_to_do_component_1_1;
            },
            function (todo_service_1_1) {
                todo_service_1 = todo_service_1_1;
            }],
        execute: function() {
            ToDoListComponent = (function () {
                function ToDoListComponent(_service, _router) {
                    this._service = _service;
                    this._router = _router;
                    this.todos = [];
                } // constructor(private _service:ToDoService, private _router:Router)
                /**
                 * Call on component initialization
                 */
                ToDoListComponent.prototype.ngOnInit = function () {
                    this.getToDos();
                    this.sortByDate();
                }; // ngOnInit()
                /**
                 * Get the To Do list from the service
                 */
                ToDoListComponent.prototype.getToDos = function () {
                    var _this = this;
                    this._service.getToDos()
                        .subscribe(function (todos) { return _this.todos = todos; }, function (error) { return _this.errorMessage = error; });
                }; // getToDos()
                /**
                 * Sort To Do by name
                 */
                ToDoListComponent.prototype.sortByName = function () {
                    this.todos = this.todos.sort(function (a, b) {
                        if (a.description > b.description) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    });
                    this.order = "name";
                };
                /**
                 * Sort To Do by name
                 */
                ToDoListComponent.prototype.sortByStatus = function () {
                    this.todos = this.todos.sort(function (a, b) {
                        if (a.status < b.status) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    });
                    this.order = "status";
                };
                /**
                 * Sort To Do by date
                 */
                ToDoListComponent.prototype.sortByDate = function () {
                    this.todos = this.todos.sort(function (a, b) {
                        if (a.creationDate > b.creationDate) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    });
                    this.order = "date";
                };
                /**
                 * Show selected To Do informations
                 */
                ToDoListComponent.prototype.onSelect = function (todo) {
                    this.selectedToDo = todo;
                }; // onSelect(todo: ToDo)
                /**
                 * Show the page to add a To Do
                 */
                ToDoListComponent.prototype.clickNewToDo = function () {
                    this._router.navigate(['NewToDo']);
                }; // clickNewToDo()
                ToDoListComponent = __decorate([
                    core_1.Component({
                        selector: 'to-do-list',
                        templateUrl: './templates/components/to_do_list.html',
                        styleUrls: ['./resources/style.css'],
                        directives: [detail_to_do_component_1.DetailToDoComponent, new_to_do_component_1.NewToDoComponent],
                        providers: [todo_service_1.ToDoService]
                    }), 
                    __metadata('design:paramtypes', [todo_service_1.ToDoService, router_1.Router])
                ], ToDoListComponent);
                return ToDoListComponent;
            })();
            exports_1("ToDoListComponent", ToDoListComponent); // export class ToDoListComponent implements OnInit
        }
    }
});
//# sourceMappingURL=to-do-list.component.js.map