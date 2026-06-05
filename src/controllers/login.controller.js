import { saveSession } from "@/utils";
import { navigateTo } from "@/router/router";
import { http } from "@/api/http";

export const loginController = () => {
  const form = document.querySelector("#loginForm");

  //escucha el envio del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    //valida que los campos esten completos
    if (!email || !password) {
      alert("Complete todos los campos");
      return;
    }

    try {
      //busca el usuario en la api
      const users = await http.get(
        `/users?email=${email}&password=${password}`
      );

      if (!users.length) {
        alert("Credenciales incorrectas");
        return;
      }

      //guarda la sesion del usuario autenticado
      saveSession({
        id: users[0].id,
        name: users[0].name,
        role: users[0].role,
      });

      navigateTo("/home");
    } catch (error) {
      console.error(error);
      alert("Error conectando con la API");
    }
  });
};