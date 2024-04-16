// This function creates an empty schema for version 0.0.1 of the example extension
// A schema can be used to declaratively define the structure of the database
const schema = initSchema("example", "0.0.1");

export default schema;

// Here you can define collections for your database
// If no schema is passed, it will be interpreted as a folder
// See https://docs.directus.io/reference/system/collections.html
schema.collections = [
  {
    collection: "example_folder",
    meta: {},
  },
  {
    collection: "example_collection",
    schema: { name: "example_collection" },
    meta: { group: "example_folder" },
  },
];

// Here you can define fields for your collections
// See https://docs.directus.io/reference/system/fields.html
schema.fields = [
  ...directusSystemFields("example_collection"),
  {
    collection: "example_collection",
    field: "example_field",
    type: "string",
    schema: {},
    meta: {},
  },
];

// Here you can define automated workflows
// The following flow will call the api/example script
// whenever an item in the example_collection is updated
// See https://docs.directus.io/reference/system/flows.html
schema.createNuxtHook(
  {
    name: "example_flow",
    status: "active",
    accountability: "all",
    trigger: "event",
    options: {
      type: "action",
      scope: ["items.update"],
      collections: ["example_collection"],
    },
  },
  "api/example",
);

// Here you can define custom translations
// See https://docs.directus.io/reference/system/translations.html
schema.translations = [
  { language: "de-DE", key: "example", value: "Beispiel" },
];

// To create relations, you can use the following helper functions
// schema.createM2ORelation();
// schema.createM2MRelation();
// schema.createM2ARelation();
