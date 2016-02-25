'use strict';

// Import libraries
const Hoek       = require('hoek');
const Controller = require('../../controller/create');
const internals  = {}; // Declare internals >> see: http://hapijs.com/styleguide

/**
* Route Class definition
*/
class Route {

    constructor(lib, options) {

        // Check options
        Hoek.assert(options, 'options are required for token routes'); // pre-auth checks
        Hoek.assert(options.endPoints, 'options must contain endPoints function to have good schema'); // no schema
        Hoek.assert(options.endPoints.todos, 'endPoints must contain ToDo function to have good schema'); // no schema
        Hoek.assert(options.schema, 'options must contain schema function to have good schema'); // no schema
        Hoek.assert(options.schema.createToDoRequest, 'schema must contain createToDoRequest value to have good schema'); // no schema
        Hoek.assert(options.schema.toDoResponse, 'schema must contain toDoResponse value to have good schema'); // no schema

        // Store data in private global property
        Object.assign(internals, {
            _lib: lib,
            _method: 'POST',
            _path: options.endPoints.todos,
            _schema: {
                request: options.schema.createToDoRequest,
                response: options.schema.toDoResponse
            },
            _controller: new Controller(lib)
        });

    }

    /**
    * Function to return new instance of HapiJS route object
    *
    * @returns {{method: string, path: string, handler: handler, config: {validate: {payload: *},
    *            response: {status: {201: *}}, payload: {output: string, allow: string, parse: boolean}}}}
    */
    definition() {

        return {
            method: internals._method,
            path: internals._path,
            handler: (request, reply) => {

                return internals._controller.handler(request, reply);
            },
            config: {
                validate:
                {
                    payload: internals._schema.request
                },
                response: {
                    status: {
                        201: internals._schema.response
                    }
                },
                payload:
                {
                    output: 'data',
                    allow: 'application/json',
                    parse: true
                }
            }
        };

    }

} // class Route

/**
* Export class
*
* @type {Route}
*/
module.exports = Route;
