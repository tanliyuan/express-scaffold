var swaggerJSDoc = require('../lib/swagger');
var path = require('path');


var swaggerDefinition = {
  info: { // API informations (required)
    title: 'Hello World', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A sample API', // Description (optional)
  },
  basePath: '/', // Base path (optional)
};

// Options for the swagger docs
var options = {
  // Import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // Path to the API docs
  apis: [path.resolve(__dirname, '../routes/*.js'), path.resolve(__dirname, '../swagger/*.yaml')],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
module.exports = swaggerJSDoc(options);

