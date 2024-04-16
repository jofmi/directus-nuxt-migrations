import pkg from "../../package.json";
import examples from "../examples/examples";

import extensions_01 from "../schemas/extensions_01";

// Register extension on startup
export default defineNitroPlugin(() => {
  registerSchemaExtension({
    name: "directus-nuxt-migrations",
    description: pkg.description,
    version: pkg.version,
    schemas: [extensions_01],
    examples: examples,
  });
});
