const d = document,
  w = window;

export default function menuDespegable (selector, section, mq) {
  const $btn = d.querySelectorAll(".btn-nav i"),
      $nav = d.querySelector(selector),
      $section = d.querySelector(section);
  let breakpoint = w.matchMedia(mq);

  const mediaquery = e => {
    if (e.matches) {
      ($section.matches("filtro-blur"))
      ? $section.classList.remove("filtro-blur")
      : $section.classList.remove("filtro-blur")
    } else {
      ($nav.matches(".regresar-menu"))
      ? $section.classList.add("filtro-blur")
      : $section.classList.remove("filtro-blur")
    }
  }

  breakpoint.addListener(mediaquery);
  mediaquery(breakpoint);

  d.addEventListener("click", e => {
    $btn.forEach(el => {
      if (e.target === el || e.target === el.closest("span")) {
        $nav.classList.toggle("regresar-menu")
        $section.classList.toggle("filtro-blur")
      }
    })   
  })
}