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

        request.log(['debug'], 'START < ToDo.Controller.handler.read.all >');

        // Call lib to read all toDo
        internals._lib.readAll((err, response) => {

            if (err) {
                request.log(['info'], '< ToDo.Controller.handler.read.all > An error occurred :');
                request.log(['error'], err);
                request.log(['debug'], 'END < ToDo.Controller.handler.read.all > with error');

                return reply(Boom.wrap(err));
            }

            if (!response) {
                request.log(['info'], '< ToDo.Controller.handler.read.all > No toDo found');

                request.log(['debug'], 'END < ToDo.Controller.handler.read.all >');

                return reply().code(204);
            }

            request.log(['info'], '< ToDo.Controller.handler.read.all > All toDo successfully retrieved');

            reply(response);

            request.log(['debug'], 'END < ToDo.Controller.handler.read.all >');
        });
    }

} // class Controller

/**
* Export class
*
* @type {Controller}
*/
module.exports = Controller;
