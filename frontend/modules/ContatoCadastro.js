import validator from 'validator';

export default class ContatoCadastro {
  constructor(formControl) {
    this.form = document.querySelector(formControl);
    this.telefoneInput = null;
  }

  init() {
    if (!this.form) return;

    // pega o input de telefone
    this.telefoneInput = this.form.querySelector('input[name="telefone"]');

    this.events();
    this.maskTelefone();
  }

  events() {
    if (!this.form) return;

    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.validate(e);
    });
  }

  maskTelefone() {
    if (!this.telefoneInput) return;
    this.telefoneInput.addEventListener('input', () => {
      let valor = this.telefoneInput.value.replace(/\D/g, ""); // só números
      // limita a 11 dígitos
      if (valor.length > 11) valor = valor.slice(0, 11);

      // (XX) 99999-9999 ou (XX) 9999-9999
      if (valor.length <= 10) {
        valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
        valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
      } else {
        valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
      }

      this.telefoneInput.value = valor;
    });
  }
 validate(e) {
  const el = e.target;
  const emailInput = el.querySelector('input[name="email"]');
  const telefoneInput = el.querySelector('input[name="telefone"]');
  const errorContainer = el.querySelector('.error-messages'); // pega o container
  errorContainer.innerHTML = ''; // limpa erros anteriores

  let error = false;

  // valida email
  if (!validator.isEmail(emailInput.value.trim())) {
    errorContainer.innerHTML += '<p>E-mail inválido</p>';
    error = true;
  }

  // valida telefone
  const telRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  if (!telRegex.test(telefoneInput.value.trim())) {
    errorContainer.innerHTML += '<p>Telefone inválido</p>';
    error = true;
  }
if (!telRegex.test(telefoneInput.value)) {
  alert('Número inválido');
}

  if (!error) {
    el.submit();
  }
}
}