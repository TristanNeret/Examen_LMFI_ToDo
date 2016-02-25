'use strict';

// Import libraries
const Joi          = require('joi');
const BaseModel    = require('hapi-mongo-models').BaseModel;
const internals    = {};

/**
* List of RegExp to validate schema
*
* @type {RegExp}
* @private
*/
internals._regex = {
    identifier: /^[a-z\d\-\_]{1,}$/
};


/**
* Model Class definition
*/
internals.ToDoModel = BaseModel.extend({

    constructor: function (attrs) {
        // Override object attributes
        Object.assign(this, attrs);
    },
    response: function () {
        // Create response object
        const Data = {
            id: this._id.toString()
        };

        if (this.description) {
            Object.assign(Data, { description: this.description });
        }

        if (this.status) {
            Object.assign(Data, { status: this.status });
        }

        if (this.creationDate) {
            Object.assign(Data, { creationDate: this.creationDate });
        }

        if (this.modificationDate) {
            Object.assign(Data, { modificationDate: this.modificationDate });
        }

        if (this.endDate) {
            Object.assign(Data, { endDate: this.endDate });
        }

        return Data;
    }

});

/**
* Define collection name
*
* @type {string}
* @private
*/
internals.ToDoModel._collection = 'todo';

/**
* Define collection indexes
*
* @type {*[]}
*/
/*internals.ToDoModel.indexes = [
    {
        key: {
            'status': 1
        },
        name: 'toDo_status',
        background: true
    }
];*/

/**
* Define validation schema
*/
internals.ToDoModel.schema = Joi.object().keys({
    description: Joi.string().required(),
    status: Joi.string(),
    creationDate: Joi.date().iso().required(),
    modificationDate: Joi.date().iso(),
    endDate: Joi.date().iso()
}).required();

/**
* Export class
*
* @type {ToDoModel}
*/
module.exports = internals.ToDoModel;
