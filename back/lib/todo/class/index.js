'use strict';

// Import libraries
const CfgManager       = require('node-config-manager');
const RequireDirectory = require('require-directory');
const internals        = {}; // Declare internals >> see: http://hapijs.com/styleguide

/* Private properties */
internals._routeDir = '../route';

/**
* Properties to store config files
*/
internals._pluginCfg = CfgManager.method.Plugin();
internals._routeCfg = CfgManager.method.Route();

/**
* Plugin Class definition
*/
class ToDo {

    constructor(lib, server, options, next) {

        // Store lib & options in private global property
        Object.assign(internals, { _lib: lib, _options: options });

        // Store end points in options
        Object.assign(internals._options, { endPoints: internals._routeCfg.endPoints });

        // Store server object
        Object.assign(internals._lib, { server: server });

        // Expose plugin methods
        internals._exposePluginMethods(server, internals._lib, internals._pluginCfg.expose.toDo, 'ToDo');

        // Plugin dependencies
        server.dependency('utils', internals._afterUtils);
        server.dependency('db', internals._afterDb);

        next();

    }

} // class ToDo

/**
* Function to expose plugin methods with configuration file
*
* @param server - HapiJS server instance in this plugin
* @param obj - Object where methods are implemented
* @param config - List of methods to expose
* @param pluginName - Plugin name for log
* @private
*/
internals._exposePluginMethods = (server, obj, config, pluginName) => {

    server.log(['debug'], 'START < ToDo.internals._exposePluginMethods >');

    if (config && config instanceof Array) {

        // Create object to expose
        const ObjToExpose = {};

        config.forEach((method) => {

            if (obj[method]) {
                server.log(['debug'], '< ToDo.internals._exposePluginMethods > Method `' + method + '` exists for plugin `' + pluginName + '`');

                ObjToExpose[method] = obj[method];
            }
            else {
                server.log(['debug'], '< ToDo.internals._exposePluginMethods > Method `' + method + '` doesn\'t exist for plugin `' + pluginName + '`');
            }

        });

        // Expose required methods for plugin
        ['server'].forEach((method) => {

            if (!ObjToExpose[method]) {
                if (!obj[method]) {
                    throw new ReferenceError('Missing required method `' + method + '` for plugin `' + pluginName + '`');
                }

                server.log(['debug'], '< ToDo.internals._exposePluginMethods > Method `' + method + '` exists for plugin `' + pluginName + '`');

                // Add method
                ObjToExpose[method] = obj[method];
            }
            else {
                server.log(['debug'], '< ToDo.internals._exposePluginMethods > Method `' + method + '` is already exposed for plugin `' + pluginName + '`');
            }
        });

        // Check if object has some methods to expose these
        if (Object.keys(ObjToExpose).length > 0) {
            server.log(['debug'], '< ToDo.internals._exposePluginMethods > Plugin `' + pluginName + '` has some methods to be exposed => ' +
            JSON.stringify(Object.keys(ObjToExpose)));

            Object.keys(ObjToExpose).forEach((key) => server.expose(key, ObjToExpose[key]));
        }
        else {
            server.log(['debug'], '< ToDo.internals._exposePluginMethods > Plugin `' + pluginName + '` has no methods to be exposed');
        }
    }
    else {
        server.log(['debug'], '< ToDo.internals._exposePluginMethods > Plugin `' + pluginName + '` has no methods to be exposed');
    }

    server.log(['debug'], 'END < ToDo.internals._exposePluginMethods >');

}; // internals._exposePluginMethods = (server, obj, config, pluginName)

/**
* Function after {Utils} plugin registration
*
* @param server - HapiJS server instance in this plugin
* @param next - Callback method
* @private
*/
internals._afterUtils = (server, next) => {

    server.log(['debug'], 'START < ToDo.internals._afterUtils >');

    // Store plugin object
    Object.assign(internals._lib, { utils: server.plugins.utils });

    server.log(['debug'], '< ToDo.internals._afterUtils > Store plugin in Lib');

    // Set schema in options
    Object.assign(internals._options, { schema: internals._lib.utils.schema });

    server.log(['debug'], '< ToDo.internals._afterUtils > Store schema in options for routes');

    // Load routes
    internals._registerRoutes(server, internals._lib, internals._options, internals._routeDir);

    server.log(['debug'], 'END < ToDo.internals._afterUtils >');

    next();

}; // internals._afterUtils = (server, next)

/**
* Function after {Db} plugin registration
*
* @param server - HapiJS server instance in this plugin
* @param next - Callback method
* @private
*/
internals._afterDb = (server, next) => {

    server.log(['debug'], 'START < ToDo.internals._afterDb >');

    // Store plugin object
    Object.assign(internals._lib, { db: server.plugins.db });

    server.log(['debug'], '< ToDo.internals._afterDb > Store plugin in Lib');

    server.log(['debug'], 'END < ToDo.internals._afterDb >');

    next();

}; // internals._afterDb = (server, next)

/**
* Function to register server routes - Recursive method
*
* @param server - HapiJS server instance in this plugin
* @param lib - Lib instance
* @param options - Options object to pass to each route instance
* @param path - Path to find new routes
* @private
*/
internals._registerRoutes = (server, lib, options, path) => {

    // Routes folder
    const routes = RequireDirectory(module, path);

    if (routes) {
        server.log(['debug'], '< ToDo.internals._registerRoutes > New routes folder found in "' + path + '"');

        for (const route in routes) {
            try {
                server.route(new routes[route](lib, options).definition());
                server.log(['debug'], '< ToDo.internals._registerRoutes > Route "' + route + '" in "' + path + '" - OK');
            }
            catch (e) {
                server.log(['debug'], '< ToDo.internals._registerRoutes > "' + route + '" is not a valid route - May be a folder');
                internals._registerRoutes(server, lib, options, path + '/' + route);
            }
        }

    }
    else {
        server.log(['debug'], '< ToDo.internals._registerRoutes > No routes found in "' + path + '" folder');
    }

}; // internals._registerRoutes = (server, lib, options, path)

/**
* Export class
*
* @type {ToDo}
*/
module.exports = ToDo;
