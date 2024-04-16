// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    apiToken: process.env.NUXT_API_TOKEN || "badToken",
    directusAdminEmail: process.env.DIRECTUS_ADMIN_EMAIL || "api@example.com",
    directusAdminPassword: process.env.DIRECTUS_ADMIN_PASSWORD || "d1r3ctu5",
    public: {
      directusUrl: process.env.DIRECTUS_URL || "http://localhost:8055",
    },
  },
});
