System.register(['angular2/core', 'angular2/router', "./todo.service", './pipe.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, todo_service_1, pipe_component_1;
    var DetailToDoComponent;
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
            function (pipe_component_1_1) {
                pipe_component_1 = pipe_component_1_1;
            }],
        execute: function() {
            DetailToDoComponent = (function () {
                function DetailToDoComponent(_service, _router) {
                    this._service = _service;
                    this._router = _router;
                }
                /**
                 * Go to edit To Do page
                 */
                DetailToDoComponent.prototype.editToDo = function () {
                    this._router.navigate(['EditToDo', { id: this.todo.id }]);
                }; // editToDo()
                DetailToDoComponent = __decorate([
                    core_1.Component({
                        selector: 'detail-to-do',
                        templateUrl: 'templates/components/detail_to_do.html',
                        styleUrls: ['resources/style.css'],
                        providers: [todo_service_1.ToDoService],
                        inputs: ['todo'],
                        pipes: [pipe_component_1.UnicodeToDatePipe]
                    }), 
                    __metadata('design:paramtypes', [todo_service_1.ToDoService, router_1.Router])
                ], DetailToDoComponent);
                return DetailToDoComponent;
            })();
            exports_1("DetailToDoComponent", DetailToDoComponent); // export class DetailToDoComponent
        }
    }
});
//# sourceMappingURL=detail-to-do.component.js.map