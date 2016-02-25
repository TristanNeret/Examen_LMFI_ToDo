import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {ToDoService} from "./todo.service";
import {ToDo} from './todo';
import {UnicodeToDatePipe} from './pipe.component';

@Component({
    selector: 'detail-to-do',
    templateUrl: 'templates/components/detail_to_do.html',
    styleUrls: ['resources/style.css'],
    providers: [ToDoService],
    inputs: ['todo'],
    pipes: [UnicodeToDatePipe]
})
// Page to view To Do details
export class DetailToDoComponent {

    public todo: ToDo;

    constructor(private _service:ToDoService, private _router:Router) {}

    /**
     * Go to edit To Do page
     */
    editToDo() {

        this._router.navigate( ['EditToDo', { id: this.todo.id } ] );

    } // editToDo()

} // export class DetailToDoComponent
