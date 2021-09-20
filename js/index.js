const d = document;

import definirFecha from "./dom/fecha_hora.js";
import modal from "./dom/modal.js";
import modalNew from "./dom/modal_create.js";
import menuDespegable from "./dom/nav.js";
import notify from "./dom/notification.js";
import temporizador from "./dom/temporizador.js";

d.addEventListener("DOMContentLoaded", e => {
  menuDespegable(".section-contain__right", ".section-contain__left", "(min-width: 1024px)");
  temporizador("hour-now", "Alarm/recursos/alarm.mp3"); 
  modalNew()
})

definirFecha(".left__clock__now");
notify()
modal()
