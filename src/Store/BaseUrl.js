export const BaseUrl =
  import.meta.env.MODE === "development"
    ? "" // use Vite proxy in dev
    : import.meta.env.VITE_API_URL ?? "https://classpilot-chi.vercel.app";
