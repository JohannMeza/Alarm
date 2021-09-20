const d = document;
const $form = d.getElementById("form")


export default function temporizador (id, linkAudio) {
  const $clock = d.getElementById(id),
        $alarm = d.createElement("audio");
        $alarm.src = linkAudio;
        $alarm.loop = true;
        $alarm.volume = 0.01;

  /*===== DEFINIR SEGUNDOS =========*/
  let s = 1,
      min = s * 60,
      h = min * 60,
      day = h * 24;
  /*====== DEFINIR FECHA EN MS =====*/
  let timems;
  /*====== DEFINIR set time out =====*/
  let tempo,
      restart,
      stop;

  /*====== DEFINIR INPUTS ====*/
  let timeInputHour,
      timeInputMin,
      timeInputSeg,
      timeRestant;
  /*======= DEFINIR TIEMPO TOTAL Y EL INPUT ===============*/  
  let timeInput,
  timeLimit;

  /*======= DEFINIR DESCANSO Y TIEMPO ===============*/  
  let desTemp,
    hourTemp,    
    minTemp,
    titleTemp,    
    messageTemp;    

  let tempoCalc;

  d.addEventListener("submit", e => {
    if (e.target === $form) {
      e.preventDefault()
      hourTemp = parseInt(e.target.hour.value.substring(0,2))
      minTemp = parseInt(e.target.min.value)
      desTemp = parseInt(e.target.descanso.value.substring(0,2))
      titleTemp = e.target.title.value
      messageTemp = e.target.message.value
      tempoCalc = `${hourTemp.toString().length === 1  ? `0${hourTemp.toString()}` : hourTemp}:${minTemp.toString().length === 1  ? `0${minTemp.toString()}` : minTemp}:00`;
      if ($clock.textContent === "Iniciar") {
        d.getElementById("hour-now").textContent = tempoCalc
        d.querySelector(".btnSpan").textContent = "Editar"
        d.querySelector(".contain-start-btn").classList.remove("disabled")
      } else {
        alert("Se actualizará cuando acabe el tiempo estimado")
      }
    }
  })

  if (!Notification) {
    alert("Las notifcaciones no soportan en tu navegador")
    return  
  }

  if (Notification.permission !== "granted") 
    Notification.requestPermission();

  function notificar () {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    } else {
      let notificacion = new Notification(titleTemp,{
        body: messageTemp
      })
    } 
  }

  const tempory = () => {
    tempo = setInterval(() => {
      let timeStart = new Date().getTime();
      timeRestant = (timeLimit - timeStart) / 1000;
      let clockH = ("0" + Math.floor(timeRestant / h)),
          clockM = ("0" + Math.floor((timeRestant % h) / min)).slice(-2),
          clockS = ("0" + Math.ceil(timeRestant % 60)).slice(-2);
      
      if (clockH < 0 || clockM < 0 || clockS < 0) {
        $clock.innerHTML = `00 : 00 : 00`;
      } else {
        $clock.innerHTML = `${clockH} : ${clockM} : ${clockS}`;
      }
      
      if (timeRestant < 0) {
        notificar();
        $alarm.loop = false; 
        $alarm.play()
        d.querySelector(".contain-accept-btn").classList.remove("disabled")
        d.querySelector(".contain-accept-btn").classList.add("btn-blue")
        d.querySelector(".contain-stop-btn").classList.add("disabled")
        d.querySelector(".contain-stop-btn").classList.remove("btn-red")
        clockRestart(timeRestant, clockH, clockM, clockS);
      }
    },1000)
  }

  function clockRestart (timeRestant, clockH, clockM, clockS) {
    timeRestant = 0;
    $clock.classList.remove("alert-clock")
    $clock.classList.add("aviso")
    clearInterval(tempo)
    restart = setInterval(() => {
      timeRestant++;
      clockH = ("0" + Math.floor(timeRestant / h)).slice(-2),
      clockM = ("0" + Math.floor((timeRestant % h) / min)).slice(-2),
      clockS = ("0" + Math.floor((timeRestant % min))).slice(-2);
      $clock.innerHTML = `${clockH} : ${clockM} : ${clockS}`;
      /*====== DEFINIR DESCANSO ====*/
      if (clockM == desTemp) {
        $alarm.loop = false;
        $alarm.play()
        $clock.classList.add("alert-clock")
        $clock.classList.remove("aviso")
      }
    },1000)
  } 

  d.addEventListener("click", e => {
    if (e.target.matches(".start-btn") && !d.querySelector(".contain-start-btn").matches(".disabled")) {
      /*====== DEFINIR FECHA EN MS =====*/
      timems = new Date().getTime()
      /*====== DEFINIR INPUTS ====*/
      timeInputHour = hourTemp * h * 1000,
      timeInputMin = minTemp * min * 1000,
      timeInputSeg = 0 * 1000,
      timeRestant;
      /*======= DEFINIR TIEMPO TOTAL Y EL INPUT ===============*/  
      timeInput = timeInputHour + timeInputMin + timeInputSeg,
      timeLimit = timems + timeInput;
      d.querySelector(".contain-start-btn").classList.add("disabled")
      d.querySelector(".contain-stop-btn").classList.add("btn-red")
      d.querySelector(".contain-stop-btn").classList.remove("disabled")
      tempory()
    }

    if (e.target.matches(".accept-btn") && !d.querySelector(".contain-accept-btn").matches(".disabled")) {
      const $clockHour = d.createElement("span"),
            $clockweather = d.createElement("span"),
            $clockRetarted = d.createElement("span"),
            $clockContain = d.createElement("span");
      
      /*== AGREGAR TEXT ===*/
      $clockHour.innerHTML =  new Date().toLocaleTimeString();
      $clockweather.innerHTML =  tempoCalc
      $clockRetarted.innerHTML =  $clock.textContent;
      
      /*====== DEFINIR INPUTS ====*/
      timeInputHour = hourTemp * h * 1000,
      timeInputMin = minTemp * min * 1000,
      timeInputSeg = 0 * 1000,
      timeRestant;
      /*======= DEFINIR TIEMPO TOTAL Y EL INPUT ===============*/  
      timeInput = timeInputHour + timeInputMin + timeInputSeg,
      timeLimit = timems + timeInput;

      /*== AGREGAR CLASES ===*/
      $clockContain.classList.add("clock-weather")
      
      /*== AGREGAR HIJO AL CONTAIN ===*/
      $clockContain.append($clockHour);
      $clockContain.append($clockweather);
      $clockContain.append($clockRetarted);
    
      d.querySelector(".right__weather").prepend($clockContain)
      timeLimit = new Date().getTime() + timeInput;
      d.querySelector(".contain-accept-btn").classList.add("disabled")
      d.querySelector(".contain-accept-btn").classList.remove("btn-blue")
      d.querySelector(".contain-stop-btn").classList.remove("disabled")
      d.querySelector(".contain-stop-btn").classList.add("btn-red")
      $clock.classList.remove("aviso")
      $clock.classList.remove("alert-clock")
      $alarm.pause();
      $alarm.currentTime = 0;
      clearInterval(restart)
      tempory()
    }

    if (e.target.matches(".stop-btn") && !d.querySelector(".contain-stop-btn").matches(".disabled")) {
      if (confirm("¿Estas seguro de eliminar el temporizador?")) {
        alert("Has eliminado el temporizador")
        clearInterval(tempo)
        $clock.innerHTML = "Iniciar";
        d.querySelector(".btnSpan").textContent = "Agregar"
  
        d.querySelector(".contain-start-btn").classList.add("disabled")
        d.querySelector(".contain-stop-btn").classList.add("disabled")
        d.querySelector(".contain-stop-btn").classList.remove("btn-red")
      }
    }
  })
}
