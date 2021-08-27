const d = document;

export default function definirFecha (selector) {
  const $selector = d.querySelector(selector);

  setInterval(() => {
    let fecha = new Date()
    $selector.innerHTML = `${fecha.getDate()}/${fecha.getMonth() + 1} | ${fecha.toLocaleTimeString()}`
  },1000)
}