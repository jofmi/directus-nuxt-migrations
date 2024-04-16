import pkg from "../../package.json";
import example_schema_01 from "../schemas/example_schema_01";
import examples from "../examples/examples";

// Register extension on startup
export default defineNitroPlugin(() => {
  registerSchemaExtension({
    name: "example",
    description: pkg.description,
    version: pkg.version,
    schemas: [example_schema_01],
    examples: examples,
  });
});
