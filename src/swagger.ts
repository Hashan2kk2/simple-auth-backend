import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Simple Auth Backend API',
            version: '1.0.0',
            description: 'API documentation for the Simple Auth Backend',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    // Files containing OpenAPI annotations
    apis: ['./src/routes/*.ts'], // This tells swagger-jsdoc where to look for JSDoc annotations
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
    // Serve the Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Serve the raw JSON documentation
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log('Swagger UI available at http://localhost:3000/api-docs');
    console.log('Swagger JSON available at http://localhost:3000/api-docs.json');
};
