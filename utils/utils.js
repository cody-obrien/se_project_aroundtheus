const modalPicture = document.querySelector(".modal-picture");

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("mousedown", closeModalByOutsideClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("mousedown", closeModalByOutsideClick);
}

function closeModalByEscape(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  }
}

function closeModalByOutsideClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.target);
  }
}

export {
  modalPicture,
  openModal,
  closeModal,
  closeModalByEscape,
  closeModalByOutsideClick,
};
