const API_URL =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  "http://localhost:3001";

const request = async (endpoint, options = {}) => {
  try {
    const headers = new Headers();
    
    // configura los encabezados basicos para las peticiones
    headers.set("Accept", "application/json");

    // agrega el content-type solo cuando no se envia un formulario
    if (!(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    // combina los encabezados enviados por el usuario 
    const incomingHeaders = new Headers(options.headers || {});
    incomingHeaders.forEach((value, key) => {
      headers.set(key, value);
    });

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    }); 

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    
    //valida si la respuesta fue exitosa
    if (!response.ok) {
      const errorBody = isJson
        ? await response.json().catch(() => null)
        : await response.text().catch(() => null);

      throw new Error(
        errorBody?.message ||
          errorBody?.error ||
          `HTTP Error ${response.status}`
      );
    }
    // retorna null cuando la respuesta no contiene contenido 
    if (response.status === 204) {
      return null;
    }

    return isJson ? await response.json() : await response.text();
  } catch (error) {
    console.error("[http]", error);
    throw error;
  }
};

export const http = {
  get: (endpoint) => request(endpoint),

  post: (endpoint, data) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: (endpoint, data) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: (endpoint, data) =>
    request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (endpoint) =>
    request(endpoint, {
      method: "DELETE",
    }),
};