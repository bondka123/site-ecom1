const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.post(`${backendUrl}/api/auth/login`, { email, password });
