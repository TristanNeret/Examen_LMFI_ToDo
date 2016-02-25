'use strict';

// Import libraries
const ToDo     = require('./class');
const ToDoLib  = require('./lib');
const internals = {}; // Declare internals >> see: http://hapijs.com/styleguide

// Definition of plugin
internals.definition = {
    register: (server, options, next) => {

        return new ToDo(ToDoLib.getInstance(), server, options, next);
    }
};

// Register attributes
internals.definition.register.attributes = {
    pkg: require('./package')
};

// Export plugin
module.exports = internals.definition;
