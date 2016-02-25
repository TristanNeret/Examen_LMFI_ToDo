import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {ToDoListComponent} from './to-do-list.component';
import {ToDoService} from "./todo.service";
import {ToDo} from './todo';

@Component({
    selector: 'new-to-do',
    templateUrl: 'templates/components/new_to_do.html',
    styleUrls: ['resources/style.css'],
    providers: [ToDoService]
})
// Page to add a To Do
export class NewToDoComponent implements OnInit {

    public todo: ToDo;
    public errorMessage: string;
    public status = ['TO DO', 'IN PROGRESS', 'DONE'];

    constructor(private _service:ToDoService, private _router:Router) { }

    /**
     * Call on component initialization
     */
    ngOnInit() {

        this.todo = new ToDo(null,null);
        this.todo.status = 'TO DO';

    } // ngOnInit()


    /**
     * Update a To DO
     */
    postToDo() {

        this._service.postToDo(this.todo)
            .subscribe(
                todo => this.todo = todo,
                error =>  this.errorMessage = <any>error,
                () => this.goToDoList());

    } // postToDo()

    /**
     * Go to To Do list
     */
    goToDoList() {

        this._router.navigate( ['ToDoList'] );

    } // goToDoList()

} // export class NewToDoComponent implements OnInit
