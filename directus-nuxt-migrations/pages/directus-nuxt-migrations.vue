<script setup lang="ts">
const extensions = ref();
const migrationsCollectionExists = ref();

async function loadExtensions() {
  extensions.value = null;
  const res = await fetch("/api/extensions");
  const res_json = await res.json();
  extensions.value = res_json.registeredExtensions;
  migrationsCollectionExists.value = res_json.migrationsCollectionExists;
}

async function migrateToLatest() {
  await fetch("/api/migrate", {
    method: "POST",
  });

  loadExtensions();
}

loadExtensions();
</script>

<template>
  <div id="directus-nuxt-migrations">
    <h1>Directus Nuxt Migrations</h1>
    <p>
      Directus Nuxt Migrations is an experimental framework to declare database
      schemas in Nuxt Layers (extensions) and migrate them to a Directus
      database.
    </p>
    <button @click="migrateToLatest">Run migrations</button>

    <h2>Installed schema extensions</h2>
    <button @click="loadExtensions">Reload</button>
    <div id="extension-list">
      <div v-for="(extension, i) in extensions" :key="i">
        <p>
          <b>{{ extension.name }}</b> <br />

          <span>Extension version: {{ extension.ext_version }}</span
          ><br />
          <span>Schema version: {{ extension.schema_version_pushed }} </span>
          <span v-if="extension.schema_is_latest == 0"> (latest)</span>
          <span v-if="extension.schema_is_latest == 1">
            (can be updated to {{ extension.schema_version_latest }})
          </span>
          <span v-if="extension.schema_is_latest == -1"> (error)</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#directus-nuxt-migrations {
  margin: 50px;
  max-width: 600px;
  font-family: Arial, Helvetica, sans-serif;

  h1 {
    font-size: 2rem;
  }
}
</style>
