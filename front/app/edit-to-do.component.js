System.register(['angular2/core', 'angular2/router', "./todo.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, todo_service_1;
    var EditToDoComponent;
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
            }],
        execute: function() {
            EditToDoComponent = (function () {
                function EditToDoComponent(_service, _router, _routeParams) {
                    this._service = _service;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.status = ['TO DO', 'IN PROGRESS', 'DONE'];
                }
                /**
                 * Call on component initialization
                 */
                EditToDoComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = this._routeParams.get('id');
                    this._service.getToDoById(id)
                        .subscribe(function (todo) { return _this.todo = todo; }, function (error) { return _this.errorMessage = error; });
                }; // ngOnInit()
                /**
                 * Update To Do
                 */
                EditToDoComponent.prototype.updateToDo = function () {
                    var _this = this;
                    this._service.updateToDo(this.todo)
                        .subscribe(function (todo) { return _this.todo = todo; }, function (error) { return _this.errorMessage = error; }, function () { return _this.cancel(); });
                }; // updateToDo()
                /**
                 * Delete To Do
                 */
                EditToDoComponent.prototype.deleteToDo = function () {
                    var _this = this;
                    this._service.deleteToDo(this.todo.id)
                        .subscribe(function (response) { return _this.response = response; }, function (error) { return _this.errorMessage = error; }, function () { return _this.cancel(); });
                }; // deleteToDo()
                /**
                 * Cancel To Do update
                 */
                EditToDoComponent.prototype.cancel = function () {
                    this._router.navigate(['ToDoList']);
                }; // cancel()
                EditToDoComponent = __decorate([
                    core_1.Component({
                        selector: 'edit-to-do',
                        templateUrl: 'templates/components/edit_to_do.html',
                        styleUrls: ['resources/style.css'],
                        providers: [todo_service_1.ToDoService],
                        inputs: ['todo']
                    }), 
                    __metadata('design:paramtypes', [todo_service_1.ToDoService, router_1.Router, router_1.RouteParams])
                ], EditToDoComponent);
                return EditToDoComponent;
            })();
            exports_1("EditToDoComponent", EditToDoComponent); // export class EditToDoComponent implements OnInit
        }
    }
});
//# sourceMappingURL=edit-to-do.component.js.map