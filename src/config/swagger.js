import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const swaggerPath = path.resolve(__dirname, "swagger.yaml");

// Load and the YAML file
const swaggerDocument = yaml.load(fs.readFileSync(swaggerPath, "utf8"));

export { swaggerUi, swaggerDocument };
