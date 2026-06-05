import { http } from "@/api/http";

//obtiene todas las reservas
export const getReservations = () =>
  http.get("/reservations");

//crea una nueva reserva
export const createReservation = (data) =>
  http.post("/reservations", data);

//actualiza una reserva existente
export const updateReservation = (id, data) =>
  http.patch(`/reservations/${id}`, data);

//elimina una reserva
export const deleteReservation = (id) =>
  http.delete(`/reservations/${id}`);