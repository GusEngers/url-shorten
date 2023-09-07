class CheckForm {
  form = document.getElementById('check-form');
  code = document.getElementById('code');
  btn = document.getElementById('btn-code');

  listen() {
    if (!!this.form) {
      this.code.addEventListener('input', (e) => {
        const value = e.target.value;
        const msg = document.getElementById('code-error');
        const exp = /^(?=.*[A-Za-z])(?=.*\d).{4,}$/;

        if (!exp.test(value)) {
          msg.textContent =
            'La clave debe contener letras, números y un mínimo de 4 caracteres';
          this.btn.disabled = true;
        } else {
          msg.textContent = '';
          this.btn.disabled = false;
        }
      });

      this.form.addEventListener('submit', () => {
        this.btn.outerHTML = '<span class="loading">Espere un momento por favor...</span>';
      });
    }
  }
}

new CheckForm().listen();
