import { createItem, deleteItems } from "@directus/sdk";

// This function can be used to create example data for your extension
export default async function examples() {
  const directus = await useDirectusAdmin();

  await directus.request(deleteItems("example_collection", { limit: 1000 }));

  await directus.request(
    createItem("example_collection", {
      example_field: "example_value",
    }),
  );
}
