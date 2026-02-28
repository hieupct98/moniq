import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST interceptor — attach auth token here later
api.interceptors.request.use(
  config => {
    // TODO: attach Supabase auth token when auth is added
    // const { data: { session } } = await supabase.auth.getSession()
    // if (session?.access_token) {
    //   config.headers.Authorization = `Bearer ${session.access_token}`
    // }
    return config;
  },
  error => Promise.reject(error)
);

// RESPONSE interceptor — global error handling
api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;

    if (status === 401) {
      // TODO: redirect to login when auth is added
      console.warn("Unauthorized");
    }

    if (status >= 500) {
      console.error("Server error. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default api;
