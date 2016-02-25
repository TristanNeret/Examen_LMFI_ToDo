import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {DetailToDoComponent} from './detail-to-do.component';
import {NewToDoComponent} from './new-to-do.component';
import {ToDoService} from "./todo.service";
import {ToDo} from './todo';

@Component({
    selector: 'to-do-list',
    templateUrl: './templates/components/to_do_list.html',
    styleUrls: ['./resources/style.css'],
    directives: [DetailToDoComponent, NewToDoComponent],
    providers: [ToDoService]
})
// Show the To Do list
export class ToDoListComponent implements OnInit {

    public todos: ToDo[];
    public order: string;
    public selectedToDo: ToDo;
    public errorMessage: string;

    constructor(private _service:ToDoService, private _router:Router) {

        this.todos = [];

    } // constructor(private _service:ToDoService, private _router:Router)

    /**
     * Call on component initialization
     */
    ngOnInit() {

        this.getToDos();
        this.sortByDate();

    } // ngOnInit()

    /**
     * Get the To Do list from the service
     */
    getToDos() {

        this._service.getToDos()
            .subscribe(
                todos => this.todos = todos,
                error =>  this.errorMessage = <any>error);

    } // getToDos()

    /**
     * Sort To Do by name
     */
    sortByName() {

        this.todos = this.todos.sort((a,b) => {
            if (a.description > b.description) {
                return 1;
            } else {
                return -1;
            }});
        this.order = "name";

    }

    /**
     * Sort To Do by name
     */
    sortByStatus() {

        this.todos = this.todos.sort((a,b) => {
            if (a.status < b.status) {
                return 1;
            } else {
                return -1;
            }});
        this.order = "status";

    }

    /**
     * Sort To Do by date
     */
    sortByDate() {

        this.todos = this.todos.sort((a,b) => {
            if (a.creationDate > b.creationDate) {
                return 1;
            } else {
                return -1;
            }});
        this.order = "date";

    }

    /**
     * Show selected To Do informations
     */
    onSelect(todo: ToDo) {

        this.selectedToDo = todo;

    } // onSelect(todo: ToDo)

    /**
     * Show the page to add a To Do
     */
    clickNewToDo() {

        this._router.navigate( ['NewToDo'] );

    } // clickNewToDo()


} // export class ToDoListComponent implements OnInit
