'use strict';

// Import libraries
const Db              = require('./class');
const CfgManager      = require('node-config-manager');
const HapiMongoModels = require('hapi-mongo-models');
const internals       = {}; // Declare internals >> see: http://hapijs.com/styleguide

/**
* Properties to store config files
*/
internals._mongoCfg = CfgManager.method.Mongo();

// Definition of plugin
internals.definition = {
    register: (server, options, next) => {

        return new Db(HapiMongoModels, internals._mongoCfg, server, options, next);
    }
};

// Register attributes
internals.definition.register.attributes = {
    pkg: require('./package')
};

// Export plugin
module.exports = internals.definition;
