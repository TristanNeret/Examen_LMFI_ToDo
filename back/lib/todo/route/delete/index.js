'use strict';

// Import libraries
const Hoek       = require('hoek');
const Controller = require('../../controller/delete');
const internals  = {}; // Declare internals >> see: http://hapijs.com/styleguide

/**
* Route Class definition
*/
class Route {

    constructor(lib, options) {

        // Check options
        Hoek.assert(options, 'options are required for token routes'); // pre-auth checks
        Hoek.assert(options.endPoints, 'options must contain endPoints function to have good schema'); // no schema
        Hoek.assert(options.endPoints.todo, 'endPoints must contain toDo function to have good schema'); // no schema
        Hoek.assert(options.schema, 'options must contain schema function to have good schema'); // no schema
        Hoek.assert(options.schema.toDoRequest, 'schema must contain toDoRequest value to have good schema'); // no schema
        Hoek.assert(options.schema.toDoResponse, 'schema must contain toDoResponse value to have good schema'); // no schema

        // Store data in private global property
        Object.assign(internals, {
            _lib: lib,
            _method: 'DELETE',
            _path: options.endPoints.todo,
            _schema: {
                request: options.schema.toDoRequest
            },
            _controller: new Controller(lib)
        });

    }

    /**
    * Function to return new instance of HapiJS route object
    * @returns {{method: (string|string), path: *, handler: handler, config: {response: {status: {200: *}}}}}
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
                    params: internals._schema.request
                },
                response: {
                    status: {
                        200: internals._schema.response
                    }
                }
            }
        };

    }

} // class Route

/**
* Export class
* @type {Route}
*/
module.exports = Route;
