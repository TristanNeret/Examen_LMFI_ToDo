'use strict';

// Import libraries
const Async     = require('async');
const Joi       = require('joi');
const Boom      = require('boom');
const internals = {};

/* Private properties */
internals._instance = null;
internals._constants = {
    toDo: 'todo',
    replaceToDoId: '{toDoId}'
};

/**
* Define {ToDoLib} class
*/
class ToDoLib {

    constructor() {}

    /**
    * Sets private _server property value
    *
    * @param value
    */
    set server(value) {

        this._server = value;
    }

    /**
    * Returns private _server property value
    *
    * @returns {*}
    */
    get server() {

        return this._server;
    }

    /**
    * Sets private _utils property value
    *
    * @param value
    */
    set utils(value) {

        this._utils = value;
    }

    /**
    * Returns private _utils property value
    *
    * @returns {*}
    */
    get utils() {

        return this._utils;
    }

    /**
    * Sets private _db property value
    *
    * @param value
    */
    set db(value) {

        this._db = value;
    }

    /**
    * Returns private _db property value
    *
    * @returns {*}
    */
    get db() {

        return this._db;
    }

    /**
    * Function to create new toDo in DB
    *
    * @param payload - Data to insert in DB
    * @param callback - Callback method
    */
    create(payload, callback) {

        this.server.log(['debug'], 'START < ToDo.Lib.create >');

        Async.waterfall([

            (cb) => {

                Joi.validate(payload, this.utils.schema.createToDoRequest, (err) => {

                    if (err) {
                        return cb(Boom.preconditionFailed(err.message));
                    }

                    cb();
                });
            },
            (cb) => {

                // Assign new variables
                const Data = {
                    description: payload.description,
                    creationDate : new Date()
                };

                if (payload.status) {
                    Object.assign(Data, { status: payload.status });
                }

                this.server.log(['debug'], '< ToDo.Lib.create > Data to insert in DB => ' + JSON.stringify(Data));

                // Create toDo in db
                this.db.todo.create(Data, (err, toDo) => {

                    if (err) {
                        return cb(Boom.wrap(err));
                    }

                    if (!toDo) {
                        return cb(Boom.badData('ToDo can\'t be created'));
                    }

                    cb(null, toDo.response());
                });
            },
            (toDo, cb) => {

                this.utils.getUrl(internals._constants.toDo, null,
                    [
                        {
                            replace: internals._constants.replaceToDoId,
                            value: toDo.id
                        }
                    ], (err, url) => {

                        if (err) {
                            return cb(Boom.wrap(err));
                        }

                        // Add link in response object
                        Object.assign(toDo, { link: url });

                        cb(null, toDo);
                    });
                }
            ],
            (err, response) => {

                if (err) {
                    this.server.log(['debug'], 'END < ToDo.Lib.create > with error');

                    return callback(err);
                }

                this.server.log(['debug'], 'END < ToDo.Lib.create >');

                callback(null, response);
            }
        );

    } // create(payload, callback)

    /**
    * Function to read all toDo in DB
    *
    * @param callback - Callback method
    */
    readAll(callback) {

        this.server.log(['debug'], 'START < ToDo.Lib.readAll >');

        Async.waterfall([

            (cb) => {

                // Read all toDo in db
                this.db.todo.readAll((err, toDo) => {

                    if (err) {
                        return cb(Boom.wrap(err));
                    }

                    if (!toDo || toDo.length === 0) {
                        this.server.log(['debug'], 'END < ToDo.Lib.readAll > without data');

                        return callback();
                    }

                    cb(null, toDo);
                });
            },
            (toDo, cb) => {

                // Create links array
                const links = [];

                // Build link for each toDo
                Async.each(toDo, (toDo, c) => {

                    this.utils.getUrl(internals._constants.toDo, null,
                        [
                            {
                                replace: internals._constants.replaceToDoId,
                                value: toDo._id.toString()
                            }
                        ], (err, url) => {

                            if (err) {
                                return c(Boom.wrap(err));
                            }

                            // Push url in links array
                            links.push(url);

                            c();
                        });
                    }, (err) => {

                        if (err) {
                            return cb(Boom.wrap(err));
                        }

                        cb(null, links);
                    });
                }
            ],
            (err, response) => {

                if (err) {
                    this.server.log(['debug'], 'END < ToDo.Lib.readAll > with error');

                    return callback(err);
                }

                this.server.log(['debug'], 'END < ToDo.Lib.readAll >');

                callback(null, response);
            }
        );

    } // readAll(callback)

    /**
    * Function to find a toDo
    *
    * @param params - route parameters
    * @param callback - callback function
    */
    read(params, callback) {

        this.server.log(['debug'], 'START < ToDo.Lib.read >');

        Async.waterfall([

            (cb) => {

                Joi.validate(params, this.utils.schema.toDoRequest, (err) => {

                    if (err) {
                        return cb(Boom.preconditionFailed(err.message));
                    }

                    cb();
                });
            },
            (cb) => {

                // Get toDo for current id
                this.db.todo.read(params.toDoId, (err, toDo) => {

                    if (err) {
                        return cb(Boom.wrap(err));
                    }

                    if (!toDo) {
                        return cb(Boom.notFound('No toDo found for _id `' + params.toDoId + '`'));
                    }

                    cb(null, toDo.response());
                });
            },
            (toDo, cb) => {

                this.utils.getUrl(internals._constants.toDo, null,
                    [
                        {
                            replace: internals._constants.replaceToDoId,
                            value: toDo.id
                        }
                    ], (err, url) => {

                        if (err) {
                            return cb(Boom.wrap(err));
                        }

                        // Add link in response object
                        Object.assign(toDo, { link: url });

                        cb(null, toDo);
                    });
                }
            ],
            (err, response) => {

                if (err) {
                    this.server.log(['debug'], 'END < ToDo.Lib.read > with error');

                    return callback(err);
                }

                this.server.log(['debug'], 'END < ToDo.Lib.read >');

                callback(null, response);
            }
        );

    } // read(params, callback)

    /**
    * Function to update a toDo
    *
    * @param params - route parameters
    * @param payload - route payload
    * @param callback - callback function
    */
    update(params, payload, callback) {

        this.server.log(['debug'], 'START < ToDo.Lib.update >');

        Async.waterfall([

            (cb) => {

                Joi.validate(params, this.utils.schema.toDoRequest, (err) => {

                    if (err) {
                        return cb(Boom.preconditionFailed(err.message));
                    }

                    cb();
                });
            },
            (cb) => {

                Joi.validate(payload, this.utils.schema.updateToDoRequest, (err) => {

                    if (err) {
                        return cb(Boom.preconditionFailed(err.message));
                    }

                    cb();
                });
            },
            (cb) => {

                // Create mongo update operator
                const operator = {
                    $set: {
                        description: payload.description,
                        status: payload.status,
                        modificationDate: new Date()
                    }
                };

                // Update toDo for current id
                this.db.todo.readAndUpdate(params.toDoId, operator, (err, toDo) => {

                    if (err) {
                        return cb(Boom.wrap(err));
                    }

                    if (!toDo) {
                        return cb(Boom.notFound('No toDo updated for _id `' + params.toDoId + '`'));
                    }

                    cb(null, toDo.response());
                });
            },
            (toDo, cb) => {

                this.utils.getUrl(internals._constants.toDo, null,
                    [
                        {
                            replace: internals._constants.replaceToDoId,
                            value: toDo.id
                        }
                    ], (err, url) => {

                        if (err) {
                            return cb(Boom.wrap(err));
                        }

                        // Add link in response object
                        Object.assign(toDo, { link: url });

                        cb(null, toDo);
                    });
                }
            ],
            (err, response) => {

                if (err) {
                    this.server.log(['debug'], 'END < ToDo.Lib.read > with error');

                    return callback(err);
                }

                this.server.log(['debug'], 'END < ToDo.Lib.read >');

                callback(null, response);
            }
        );

    } // update(params, payload, callback)

    /**
    * Function to delete a toDo
    * @param params - route parameters
    * @param callback - callback function
    */
    delete(params, callback) {

        this.server.log(['debug'], 'START < ToDo.Lib.delete >');

        Async.waterfall([

            (cb) => {

                Joi.validate(params, this.utils.schema.toDoRequest, (err) => {

                    if (err) {
                        return cb(Boom.preconditionFailed(err.message));
                    }
                    cb();
                });

            },
            (cb) => {

                // Delete toDo for current id
                this.db.todo.delete(params.toDoId, (err, count) => {

                    if (err) {
                        return cb(Boom.wrap(err));
                    }

                    if (!count) {
                        return cb(Boom.notFound('No toDo found for _id `' + params.toDoId + '`'));
                    }

                    cb(null, 'Number of ToDo removed : ' + count);

                });
            }],
            (err, count) => {

                if (err) {

                    this.server.log(['debug'], 'END < ToDo.Lib.delete > with error');
                    return callback(err);

                }

                this.server.log(['debug'], 'END < ToDo.Lib.delete >');
                callback(null, count);

            }
        );

    } // delete(params, callback)

    /**
    * Returns singleton instance
    *
    * @returns {null|ToDoLib|*}
    */
    static getInstance() {

        // singleton
        if (!(internals._instance instanceof ToDoLib)) {
            internals._instance = new ToDoLib();
        }

        return internals._instance;
    }

} // class ToDoLib

/**
* Expose {ToDoLib} class
*
* @type {ToDoLib}
*/
module.exports = ToDoLib;
