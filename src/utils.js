//guarda la informacion del usuario en localstorage
export const saveSession = (user) => {
  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );
};

//contiene la sesion almacenamiento
export const getSession = () => {
  return JSON.parse(
    localStorage.getItem("user")
  );
};

//elimina la sesion actual
export const removeSession = () => {
  localStorage.removeItem("user");
};

// verifica si existe una sesion activa 
export const isAuthenticated = () => {
  return !!getSession();
};

// valida si el usuario tiene rol administrador
export const isAdmin = () => {
  return getSession()?.role === "admin";
};