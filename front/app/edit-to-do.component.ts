import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {ToDoListComponent} from './to-do-list.component';
import {ToDoService} from "./todo.service";
import {ToDo} from './todo';

@Component({
    selector: 'edit-to-do',
    templateUrl: 'templates/components/edit_to_do.html',
    styleUrls: ['resources/style.css'],
    providers: [ToDoService],
    inputs: ['todo']
})
// Page to edit a To Do
export class EditToDoComponent {

    public todo: ToDo;
    public response: string;
    public errorMessage: string;
    public status = ['TO DO', 'IN PROGRESS', 'DONE'];

    constructor(private _service:ToDoService, private _router:Router, private _routeParams:RouteParams) {}

    /**
     * Call on component initialization
     */
    ngOnInit() {

        let id = this._routeParams.get('id');
        this._service.getToDoById(id)
            .subscribe(
                todo => this.todo = todo,
                error =>  this.errorMessage = <any>error);

    } // ngOnInit()

    /**
     * Update To Do
     */
    updateToDo() {

        this._service.updateToDo(this.todo)
            .subscribe(
                todo => this.todo = todo,
                error => this.errorMessage = <any>error,
                () => this.cancel());

    } // updateToDo()

    /**
     * Delete To Do
     */
    deleteToDo() {

        this._service.deleteToDo(this.todo.id)
            .subscribe(
                response => this.response = response,
                error => this.errorMessage = <any>error,
                () => this.cancel());

    } // deleteToDo()

    /**
     * Cancel To Do update
     */
    cancel() {

        this._router.navigate( ['ToDoList'] );

    } // cancel()

} // export class EditToDoComponent implements OnInit
