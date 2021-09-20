const d = document;
const $modalAll = d.querySelectorAll("[data-modal]");
let $modals = [];


export default function modal () {
  d.addEventListener("DOMContentLoaded", e => {
    $modalAll.forEach(el => {
      $modals.push(el.dataset.modal)
    })
  })
  
  d.addEventListener("click", e => {
    if (e.target.dataset.modal || e.target.matches("#modalClose")) {
      if (e.target.matches("#modalClose")) {
        let $modal = e.target.closest(".modal"); 
        let $modalContent = e.target.closest("#containerModal") || e.target.querySelector("#containerModal"); 
        $modalContent.classList.remove("container-modal-active")
        $modal.removeAttribute("style")
        setTimeout(() => {
          $modal.classList.remove("modal-active")
        },500)
        return;
      }
  
      if ($modals.find(el => el === `#${e.target.dataset.modal}`)) {
        let $modalSelect = d.querySelector(`[data-modal="#${e.target.dataset.modal}"]`);
        $modalSelect.classList.toggle("modal-active")
        $modalSelect.style.setProperty("background", "rgba(0, 0, 0, 0.568)")
        $modalSelect.querySelector("#containerModal").classList.toggle("container-modal-active")
      } else {
        console.error(`Se intenta activar el modal ${e.target.dataset.modal} al que no fue encontrado`)
      }
    }
  })
}