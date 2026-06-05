import { removeSession } from "@/utils";
import { navigateTo } from "@/router/router";

export default function Sidebar() {

  //agrega el evento para cerrar sesion
  setTimeout(() => {
    document
      .querySelector("#logoutBtn")
      ?.addEventListener("click", () => {
        removeSession();
        navigateTo("/");
      });
  });

  return `
    <aside
      class="w-64 bg-slate-900 text-white h-screen p-5"
    >
      <h2 class="text-2xl font-bold mb-8">
        Workspace SPA
      </h2>

      <nav class="flex flex-col gap-4">

        <a
          href="/home"
          class="px-3 py-2 bg-slate-700 rounded"
          data-link
        >
          Home
        </a>

        <button
          id="logoutBtn"
          class="text-left bg-red-600 px-3 py-2 rounded"
        >
          Cerrar sesión
        </button>

      </nav>

    </aside>
  `;
}