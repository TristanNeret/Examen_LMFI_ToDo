'use strict';

// Import libraries
const Boom      = require('boom');
const internals = {}; // Declare internals >> see: http://hapijs.com/styleguide

/**
* Controller Class definition
*/
class Controller {

    constructor(lib) {
        // Store data in private global property
        Object.assign(internals, { _lib: lib });
    }

    /**
    * Function to do controller process
    * @returns {*}
    */
    handler(request, reply) {

        // Get payload
        const payload = request.payload;

        request.log(['debug'], 'START < ToDo.Controller.handler.create > Params => ' + JSON.stringify(payload));

        // Call lib to create new toDo
        internals._lib.create(payload, (err, response) => {

            if (err) {
                request.log(['info'], '< ToDo.Controller.handler.create > An error occurred :');
                request.log(['error'], err);
                request.log(['debug'], 'END < ToDo.Controller.handler.create > with error');

                return reply(Boom.wrap(err));
            }

            request.log(['info'], '< ToDo.Controller.handler.create > New toDo successfully created');

            reply(response).code(201);

            request.log(['debug'], 'END < ToDo.Controller.handler.create >');
        });
    }

} // class Controller

/**
* Export class
*
* @type {Controller}
*/
module.exports = Controller;
