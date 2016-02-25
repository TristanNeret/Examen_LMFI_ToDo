'use strict';

// import libraries
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

        // Get payload & params
        const payload = request.payload;
        const params = request.params;

        request.log(['debug'], 'START < ToDo.Controller.handler.update > Params => ' + JSON.stringify(params) +
        ' | Payload => ' + JSON.stringify(payload));

        // Call lib to update toDo
        internals._lib.update(params, payload, (err, response) => {

            if (err) {

                request.log(['info'], '< ToDo.Controller.handler.update > An error occurred :');
                request.log(['error'], err);
                request.log(['debug'], 'END < ToDo.Controller.handler.update > with error');

                return reply(Boom.wrap(err));
                
            }

            request.log(['info'], '< ToDo.Controller.handler.update > New toDo successfully updated');
            reply(response);
            request.log(['debug'], 'END < ToDo.Controller.handler.update >');

        });

    } // handler(request, reply)

} // class Controller

/**
* Export class
*
* @type {Controller}
*/
module.exports = Controller;
