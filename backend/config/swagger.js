import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

console.log("í³¦ Module Swagger chargÃ©");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MERN E-commerce API",
      version: "1.0.0",
      description: "Documentation Swagger de l'API produits et utilisateurs",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Serveur de dÃ©veloppement",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

console.log("âš™ï¸  Options Swagger configurÃ©es");

const swaggerSpec = swaggerJSDoc(options);
console.log("âœ… Spec Swagger gÃ©nÃ©rÃ©");
console.log("í³Š Nombre de paths:", Object.keys(swaggerSpec.paths || {}).length);

const setupSwaggerDocs = (app) => {
  console.log("íº€ DÃ©but setup Swagger UI...");
  
  app.use("/api-docs", swaggerUi.serve);
  app.get("/api-docs", swaggerUi.setup(swaggerSpec, { explorer: true }));
  
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  
  console.log("âœ… Swagger UI configurÃ© sur /api-docs");
};

export default setupSwaggerDocs;
