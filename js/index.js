const d = document;

import definirFecha from "./dom/fecha_hora.js";
import menuDespegable from "./dom/nav.js";
import notify from "./dom/notification.js";
import temporizador from "./dom/temporizador.js";

d.addEventListener("DOMContentLoaded", e => {
  menuDespegable(".section-contain__right", ".section-contain__left", "(min-width: 1024px)");
  temporizador("hour-now", "../../recursos/alarm.mp3"); 
})

definirFecha(".left__clock__now");
notify()