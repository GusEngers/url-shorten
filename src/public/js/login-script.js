class Form {
  form = document.getElementById('login-form');
  username = document.getElementById('username');
  password = document.getElementById('password');
  btnRegister = document.getElementById('btn-login');
  __valid = {
    a: false,
    b: false,
  };

  btnDisabled() {
    this.btnRegister.disabled = !(this.__valid.a && this.__valid.b);
  }

  listen() {
    this.username.addEventListener('input', (e) => {
      const value = e.target.value;
      const msg = document.getElementById('u-error');

      if (value.length < 6) {
        msg.textContent =
          'El nombre de usuario debe contener un mínimo de 6 caracteres';
        this.__valid.a = false;
        this.btnDisabled();
      } else {
        msg.textContent = '';
        this.__valid.a = true;
        this.btnDisabled();
      }
    });

    this.password.addEventListener('input', (e) => {
      const value = e.target.value;
      const msg = document.getElementById('p-error');
      const exp = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

      if (!exp.test(value)) {
        msg.textContent =
          'La contraseña debe contener letras, números y un mínimo de 8 caracteres';
        this.__valid.b = false;
        this.btnDisabled();
      } else {
        msg.textContent = '';
        this.__valid.b = true;
        this.btnDisabled();
      }
    });

    this.form.addEventListener('submit', () => {
      this.btnRegister.outerHTML =
        '<span class="loading">Espere un momento por favor...</span>';
    });
  }
}

new Form().listen();
