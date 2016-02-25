import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {NewToDoComponent} from './new-to-do.component';
import {EditToDoComponent} from './edit-to-do.component';
import {ToDoListComponent} from './to-do-list.component';
import {ToDoService} from "./todo.service";

@Component({
    selector: 'my-app',
    templateUrl: 'templates/home.html',
    styleUrls: ['resources/style.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, ToDoService]
})
@RouteConfig([
    {path:'/', name: 'ToDoList', component: ToDoListComponent, useAsDefault: true},
    {path:'/todo', name: 'NewToDo', component: NewToDoComponent},
    {path:'/todo/:id', name: 'EditToDo', component: EditToDoComponent}
])
// Homepage of the application
export class AppComponent {

    public title = 'Welcome on To Do !';

} // export class AppComponent
