import { readItems } from "@directus/sdk";
import { compareVersions } from "compare-versions";

// Return list of registered extensions
export default defineEventHandler(async (_event) => {
  // verifyNuxtApiToken(event);
  const registeredExtensions = [];
  const directus = await useDirectusAdmin();
  const exts_db = [];
  let migrationsCollectionExists = false;

  try {
    const res = await directus.request(readItems("schema_extensions"));

    migrationsCollectionExists = true;

    for (const item of res) {
      exts_db.push(item);
    }
  } catch (error) {
    console.error("Error reading extensions from db", error);
  }

  for (const ext of getRegisteredExtensions()) {
    // find in exts_db if exists
    const ext_db = exts_db.find(
      (ext_db) => ext_db.extensions_name === ext.name,
    );

    console.log("ext", ext);
    console.log("ext_db", ext_db);

    // get latest version from ext.schemas
    const latest_version =
      ext.schemas?.sort((a, b) => compareVersions(a.version, b.version))[0]
        .version || "0.0.0";

    console.log("latest_version", latest_version);

    const payload: any = {
      name: ext.name,
      ext_version: ext.version,
      schema_version_pushed: ext_db
        ? ext_db.extensions_schema_version
        : "0.0.0",
      schema_version_latest: latest_version,
    };

    payload.schema_is_latest = compareVersions(
      latest_version,
      payload.schema_version_pushed,
    );

    registeredExtensions.push(payload);
  }

  return {
    migrationsCollectionExists: migrationsCollectionExists,
    registeredExtensions: registeredExtensions,
  };
});
