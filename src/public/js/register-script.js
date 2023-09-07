class Form {
  form = document.getElementById('register-form');
  username = document.getElementById('username');
  prePassword = document.getElementById('pre-password');
  password = document.getElementById('password');
  btnRegister = document.getElementById('btn-register');
  __prePassword = '';
  __valid = {
    a: false,
    b: false,
    c: false,
  };

  btnDisabled() {
    this.btnRegister.disabled = !(
      this.__valid.a &&
      this.__valid.b &&
      this.__valid.c
    );
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

    this.prePassword.addEventListener('input', (e) => {
      const value = e.target.value;
      const msg = document.getElementById('pp-error');
      const msg2 = document.getElementById('p-error');
      const exp = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

      if (this.password.disabled || !value.length) {
        msg2.textContent = '';
      }

      if (!exp.test(value)) {
        msg.textContent =
          'La contraseña debe contener letras, números y un mínimo de 8 caracteres';
        this.__valid.b = false;
        this.password.disabled = true;
        this.btnDisabled();
      } else {
        msg.textContent = '';
        this.__prePassword = value;
        this.password.disabled = false;
        this.__valid.b = true;
        this.btnDisabled();
      }
    });

    this.password.addEventListener('input', (e) => {
      const value = e.target.value;
      const msg = document.getElementById('p-error');

      if (this.password.disabled) {
        msg.textContent = '';
      }

      if (this.__prePassword !== value) {
        msg.textContent = 'Las contraseñas no coinciden';
        this.__valid.c = false;
        this.btnDisabled();
      } else {
        msg.textContent = '';
        this.__valid.c = true;
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
