import {OpenApiSpec} from '@loopback/rest';

export const spec: OpenApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'CRM Client Management API',
    description: 'API for managing clients in a CRM system',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
  paths: {
    '/clients': {
      get: {
        summary: 'Get a list of all clients',
        responses: {
          '200': {
            description: 'A list of clients',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Client',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new client',
        requestBody: {
          description: 'Client object that needs to be added to the CRM',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Client',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Client created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Client',
                },
              },
            },
          },
        },
      },
    },
    '/clients/{clientId}': {
      get: {
        summary: 'Get a client by ID',
        parameters: [
          {
            name: 'clientId',
            in: 'path',
            required: true,
            description: 'ID of the client to retrieve',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'A single client',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Client',
                },
              },
            },
          },
          '404': {
            description: 'Client not found',
          },
        },
      },
      put: {
        summary: 'Update a client by ID',
        parameters: [
          {
            name: 'clientId',
            in: 'path',
            required: true,
            description: 'ID of the client to update',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          description: 'Updated client object',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Client',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Client updated',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Client',
                },
              },
            },
          },
          '404': {
            description: 'Client not found',
          },
        },
      },
      delete: {
        summary: 'Delete a client by ID',
        parameters: [
          {
            name: 'clientId',
            in: 'path',
            required: true,
            description: 'ID of the client to delete',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '204': {
            description: 'Client deleted',
          },
          '404': {
            description: 'Client not found',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Client: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier for the client',
          },
          name: {
            type: 'string',
            description: 'Name of the client',
          },
          email: {
            type: 'string',
            description: 'Email address of the client',
          },
          phone: {
            type: 'string',
            description: 'Phone number of the client',
          },
          address: {
            type: 'string',
            description: 'Address of the client',
          },
        },
        required: ['name', 'email'],
      },
    },
  },
};
