import { getSession } from "@/utils";

export default function ReservationCard(
  reservation
) {
  //obtiene la session para validar permisos
  const user = getSession();

  const {
    id,
    workspace,
    date,
    startHour,
    endHour,
    reason,
    status,
  } = reservation;

  return `
    <article
      class="bg-white p-4 rounded-lg shadow border"
    >

      <h3 class="font-bold text-lg mb-2">
        ${workspace}
      </h3>

      <div class="space-y-1">

        <p>
          <strong>Fecha:</strong>
          ${date}
        </p>

        <p>
          <strong>Horario:</strong>
          ${startHour} - ${endHour}
        </p>

        <p>
          <strong>Motivo:</strong>
          ${reason}
        </p>

        <p>
          <strong>Estado:</strong>
          ${status}
        </p>

      </div>

      ${
        user?.role === "admin"
          ? `
            <div class="flex gap-2 mt-4">

              <button
                class="approveBtn bg-green-600 text-white px-3 py-1 rounded"
                data-id="${id}"
              >
                Aprobar
              </button>

              <button
                class="rejectBtn bg-yellow-600 text-white px-3 py-1 rounded"
                data-id="${id}"
              >
                Rechazar
              </button>

              <button
                class="deleteBtn bg-red-600 text-white px-3 py-1 rounded"
                data-id="${id}"
              >
                Eliminar
              </button>

            </div>
          `
          : ""
      }

    </article>
  `;
}