import loginView from "@/views/loginView";
import homeView from "@/views/homeView";
import NotFoundView from "@/views/notFound";

const routes = {
  "/": loginView,
  "/home": homeView,
};

//cambia la ruta actual sin recargar la pagina
export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

export const router = () => {
  const app = document.querySelector("#app");

  const path = window.location.pathname;

  //busca la vista correspondiente o muestra la pagina 404
  const view =
    routes[path] || NotFoundView;

  app.innerHTML = view();

  //permite regresar al inicio desde la vista 404
  document
    .querySelector("#goHome")
    ?.addEventListener("click", () => {
      navigateTo("/");
    });
};

//escucha la navegacion del navegador
window.addEventListener(
  "popstate",
  router
);