const d = document;
const $modal = d.querySelector(".modal")

export default function modalNew () {
  d.addEventListener("click", e => {
    if (e.target.matches(".contain-edit-btn, .contain-edit-btn *")) {
      for (let el = 1; el <= 24; el++) {
        let $option = d.createElement("option");
        $option.textContent = el.toString().length === 1  ? `0${el.toString()} horas` : `${el} horas`;
        $modal.querySelector(".form__select-hour").appendChild($option)
      }

      for (let el = 0; el < 60; el ++) {
        let $option = d.createElement("option");
        $option.textContent = el.toString().length === 1  ? `0${el.toString()} minutos` : `${el} minutos`;
        $modal.querySelector(".form__select-minutes").appendChild($option)
      }
      
      for (let el = 5; el < 30; el ++) {
        let $option = d.createElement("option");
        $option.textContent = el.toString().length === 1  ? `0${el.toString()} minutos` : `${el} minutos`;
        $modal.querySelector(".form__select-descanso").appendChild($option)
      }
    }
  })
}
