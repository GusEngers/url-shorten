class PrivateForm {
  form = document.getElementById('private-form');
  url = document.getElementById('url-private');
  code = document.getElementById('code-private');
  btn = document.getElementById('btn-private');
  __valid = {
    a: false,
    b: false,
  };

  btnDisabled() {
    this.btn.disabled = !(this.__valid.a && this.__valid.b);
  }

  listen() {
    if (!!this.form) {
      this.url.addEventListener('input', (e) => {
        const value = e.target.value;
        const msg = document.getElementById('url-private-error');
        const reg = /^((http|https):\/\/)[-a-zA-Z0-9@:%._\+~#?&//=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\+~#?&//=]*)$/

        if (!reg.test(value)) {
          msg.textContent = 'No es una url válida o sobrepasa los 256 caracteres de longitud';
          this.__valid.a = false;
          this.btnDisabled();
        } else {
          msg.textContent = '';
          this.__valid.a = true;
          this.btnDisabled();
        }
      });

      this.code.addEventListener('input', (e) => {
        const value = e.target.value;
        const msg = document.getElementById('code-private-error');
        const exp = /^(?=.*[A-Za-z])(?=.*\d).{4,}$/;

        if (!exp.test(value)) {
          msg.textContent = 'La clave debe contener letras, números y un mínimo de 4 caracteres';
          this.__valid.b = false;
          this.btnDisabled();
        } else {
          msg.textContent = '';
          this.__valid.b = true;
          this.btnDisabled();
        }
      });

      this.form.addEventListener('submit', () => {
        this.btn.outerHTML = '<span class="loading">Espere...</span>';
      });
    }
  }
}

class PublicForm {
  form = document.getElementById('public-form');
  url = document.getElementById('url-public');
  btn = document.getElementById('btn-public');

  listen() {
    if (!!this.form) {
      this.url.addEventListener('input', (e) => {
        const value = e.target.value;
        const msg = document.getElementById('url-public-error');
        const reg = /^((http|https):\/\/)[-a-zA-Z0-9@:%._\+~#?&//=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\+~#?&//=]*)$/

        if (!reg.test(value)) {
          msg.textContent = 'No es una url válida o sobrepasa los 256 caracteres';
          this.btn.disabled = true;
        } else {
          msg.textContent = '';
          this.btn.disabled = false;
        }
      });

      this.form.addEventListener('submit', () => {
        this.btn.outerHTML = '<span class="loading">Espere...</span>';
      });
    }
  }
}

function deleteUrl(button, type) {
  button.disabled = true;
  fetch(`/del?id=${button.id}&type=${type}`, {
    method: 'DELETE',
  }).then((_) => {
    document.location.reload();
  });
}

function finishSession() {
  fetch('/session').then((_) => {
    document.location.replace('/');
  });
}

new PrivateForm().listen();
new PublicForm().listen();
