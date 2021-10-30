import { closeModal, openModal } from "./modal";

function form(modalTimer) {
  // POST
  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner_50px.svg",
    success: "Loading successfully",
    failure: "Error",
  };

  forms.forEach((form) => {
    bindPostData(form);
  });

  const postDate = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });
    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formDate = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formDate.entries()));

      //   postDate("http://localhost:3000/requests", json)
      //     .then((data) => {
      //       console.log(data);
      //       showThanksModal(message.success);
      //       statusMessage.remove();
      //     })
      //     .catch(() => showThanksModal(message.failure))
      //     .finally(() => form.reset());
      // });

      axios
        .post("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => showThanksModal(message.failure))
        .finally(() => form.reset());
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal(".modal", modalTimer);
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
        <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal(".modal");
    }, 3000);
  }

  fetch("http://localhost:3000/menu").then((data) => data.json());
  // .then((res) => console.log(res));
}
export default form;
