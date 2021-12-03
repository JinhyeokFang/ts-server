import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const config = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "ts-server",
        version: "4.0.0",
        description:
          "ts boilerplate",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "",
          url: "",
          email: "",
        },
      },
      servers: [
        {
          url: "http://localhost:3000/",
        },
      ],
    },
    apis: [path.join(__dirname, '../../../src/**/*.controller.ts')],
};
  

export default swaggerJSDoc(config);