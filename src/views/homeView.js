import Sidebar from "@/components/Sidebar";
import { getSession } from "@/utils";
import { homeController } from "@/controllers/home.controller";

export default function homeView() {
  const user = getSession();

  setTimeout(() => {
    homeController();
  });

  return `
    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 p-6 bg-slate-100 min-h-screen">

        <div class="mb-6">

          <h1 class="text-sm font-bold">
            Bienvenido ${user?.name}
          </h1>

          <p class="text-orange-900">
            Rol: ${user?.role}
          </p>

        </div>

        ${
          user?.role === "admin"
            ? `
              <section
                class="bg-white p-5 rounded-lg shadow mb-6"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Administrador
                </h2>

                <p>
                  Puedes visualizar todas las reservas.
                </p>

                <button
                  id="manageReservationsBtn"
                  class="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Gestionar Reservas
                </button>

              </section>
            `
            : `
              <section
                class="bg-white p-5 rounded-lg shadow mb-6"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Usuario
                </h2>

                <p>
                  Puedes visualizar únicamente tus reservas.
                </p>

                <button
                  id="newReservationBtn"
                  class="mt-3 bg-green-600 text-white px-4 py-2 rounded"
                >
                  Nueva Reserva
                </button>

              </section>
            `
        }

        <section
          class="bg-white p-5 rounded-lg shadow"
        >

          <div
            class="flex justify-between items-center mb-4"
          >
            <h2 class="font-bold text-xl">
              Reservas
            </h2>

            <span
              class="text-sm text-slate-500"
            >
              ${
                user?.role === "admin"
                  ? "Mostrando todas las reservas"
                  : "Mostrando únicamente tus reservas"
              }
            </span>
          </div>

          <div
            id="reservationsContainer"
            class="grid gap-4 md:grid-cols-2"
          >
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-emerald-800">
                Cargando reservas ...
              </p>
            </div>
          </div>

        </section>

        <div
          id="reservationModal"
          class="hidden fixed inset-0 bg-black/50 flex justify-center items-center"
        >

          <form
            id="reservationForm"
            class="bg-white p-6 rounded-lg w-96"
          >

            <h2 class="text-xl font-bold mb-4">
              Nueva Reserva
            </h2>

            <input
              type="text"
              name="workspace"
              placeholder="Espacio de trabajo"
              class="border w-full p-2 mb-3 rounded"
              required
            >

            <input
              type="date"
              name="date"
              class="border w-full p-2 mb-3 rounded"
              required
            >

            <input
              type="time"
              name="startHour"
              class="border w-full p-2 mb-3 rounded"
              required
            >

            <input
              type="time"
              name="endHour"
              class="border w-full p-2 mb-3 rounded"
              required
            >

            <input
              type="text"
              name="reason"
              placeholder="Motivo"
              class="border w-full p-2 mb-4 rounded"
              required
            >

            <div class="flex gap-2">

              <button
                type="submit"
                class="bg-green-600 text-white px-4 py-2 rounded"
              >
                Guardar
              </button>

              <button
                type="button"
                id="closeModal"
                class="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  `;
}