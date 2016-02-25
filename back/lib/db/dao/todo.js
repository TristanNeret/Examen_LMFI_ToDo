'use strict';

// Import libraries
const Dao        = require('../class/dao');
const internals  = {};

/* Private properties */
internals._instance = null;

/**
* Define {ToDoDao} class
*/
class ToDoDao extends Dao {

    constructor() {

        // Call super constructor
        super('ToDo');

    }

    /**
    * Returns singleton instance
    *
    * @returns {null|ToDoDao|*}
    */
    static getInstance() {

        // Singleton
        if (!(internals._instance instanceof ToDoDao)) {
            internals._instance = new ToDoDao();
        }

        return internals._instance;
    }

} // class ToDoDao extends Dao

/**
* Expose {ToDoDao} class
*
* @type {ToDoDao}
*/
module.exports = ToDoDao;
