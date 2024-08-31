import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      description:
        "This is an ecommerce API which provides the results about various products available, you can add a product, delete a product, update a product.",
      version: "1.0.0",
      contact: {
        name: "Shaik Suhail",
        email: "suhailshaik975@gmail.com",
        url: "https://github.com/suhailshaik99",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Ecommerce API Server",
      },
    ],
  },
  apis: ["./src/resources/*/*-route.js"],
};
const swaggerSpecs = swaggerJSDoc(swaggerOptions);
export default swaggerSpecs;
