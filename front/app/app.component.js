System.register(['angular2/core', 'angular2/http', 'angular2/router', './new-to-do.component', './edit-to-do.component', './to-do-list.component', "./todo.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, new_to_do_component_1, edit_to_do_component_1, to_do_list_component_1, todo_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (new_to_do_component_1_1) {
                new_to_do_component_1 = new_to_do_component_1_1;
            },
            function (edit_to_do_component_1_1) {
                edit_to_do_component_1 = edit_to_do_component_1_1;
            },
            function (to_do_list_component_1_1) {
                to_do_list_component_1 = to_do_list_component_1_1;
            },
            function (todo_service_1_1) {
                todo_service_1 = todo_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = 'Welcome on To Do !';
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'templates/home.html',
                        styleUrls: ['resources/style.css'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, todo_service_1.ToDoService]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'ToDoList', component: to_do_list_component_1.ToDoListComponent, useAsDefault: true },
                        { path: '/todo', name: 'NewToDo', component: new_to_do_component_1.NewToDoComponent },
                        { path: '/todo/:id', name: 'EditToDo', component: edit_to_do_component_1.EditToDoComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent); // export class AppComponent
        }
    }
});
//# sourceMappingURL=app.component.js.map