import ReservationCard from "@components/ReservationCard";

import {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} from "@services/reservation.service";

import { getSession } from "@/utils";

export const homeController = async () => {

  //contenedor donde se mostraran las reservas
  const container = document.querySelector(
    "#reservationsContainer"
  );

  try {
    //obtine la sesion actual
    const user = getSession();

    //Carga las reservas desde la api
    const reservations =
      await getReservations();

    //filtra las reservas dependiendo del rol
    const filteredReservations =
      user.role === "admin"
        ? reservations
        : reservations.filter(
            (reservation) =>
              reservation.userId === user.id
          );
    
    //renderiza las reservas encontradas
    container.innerHTML =
      filteredReservations.length
        ? filteredReservations
            .map((reservation) =>
              ReservationCard(reservation)
            )
            .join("")
        : `
          <div class="w-full text-center py-8 col-span-2">
            <p class="text-slate-500">
              No hay reservas disponibles
            </p>
          </div>
        `;
  } catch (error) {
    console.error(error);

    //elementos del modal de reservas
    container.innerHTML = `
      <div class="w-full text-center py-8 col-span-2">
        <p class="text-red-500">
          Error cargando reservas
        </p>
      </div>
    `;
  }

  const modal =
    document.querySelector("#reservationModal");

  const openBtn =
    document.querySelector("#newReservationBtn");

  const closeBtn =
    document.querySelector("#closeModal");

  const form =
    document.querySelector("#reservationForm");

  //abre el formulario de nueva reserva 
  openBtn?.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // cierra el formulario
  closeBtn?.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  //crea una nueva reserva
  form?.addEventListener(
    "submit",
    async (e) => {
      e.preventDefault();

      const user = getSession();

      const reservation = {
        userId: user.id,
        workspace: form.workspace.value,
        date: form.date.value,
        startHour: form.startHour.value,
        endHour: form.endHour.value,
        reason: form.reason.value,
        status: "pending",
      };

      try {
        await createReservation(
          reservation
        );

        alert(
          "Reserva creada correctamente"
        );

        window.location.reload();
      } catch (error) {
        console.error(error);

        alert(
          "Error creando la reserva"
        );
      }
    }
  );

  //aprueba una reserva
  document
    .querySelectorAll(".approveBtn")
    .forEach((button) => {
      button.addEventListener(
        "click",
        async () => {
          const id =
            button.dataset.id;

          await updateReservation(
            id,
            {
              status: "approved",
            }
          );

          window.location.reload();
        }
      );
    });

  //rechaza una reserva
  document
    .querySelectorAll(".rejectBtn")
    .forEach((button) => {
      button.addEventListener(
        "click",
        async () => {
          const id =
            button.dataset.id;

          await updateReservation(
            id,
            {
              status: "rejected",
            }
          );

          window.location.reload();
        }
      );
    });

  //elimina una reserva seleccionada
  document
    .querySelectorAll(".deleteBtn")
    .forEach((button) => {
      button.addEventListener(
        "click",
        async () => {
          const id =
            button.dataset.id;

          const confirmDelete =
            confirm(
              "¿Eliminar reserva?"
            );

          if (!confirmDelete) return;

          await deleteReservation(id);

          window.location.reload();
        }
      );
    });
  
  // permite desplazarse rapidamente a la seccion de reservas
  const manageBtn =
    document.querySelector(
      "#manageReservationsBtn"
    );

  manageBtn?.addEventListener(
    "click",
    () => {
      document
        .querySelector(
          "#reservationsContainer"
        )
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }
  );
};