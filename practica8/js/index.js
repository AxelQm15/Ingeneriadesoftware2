document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario');
  const inputRadio = document.getElementById('valorRadio');
  const resultado = document.getElementById('resultado');
  const btnLimpiar = document.getElementById('btnLimpiar');

  const limpiarTodo = () => {
    form.reset();
    resultado.value = '';
    inputRadio.classList.remove('is-invalid', 'is-valid');
    inputRadio.focus();
  };

  // Validación en tiempo real
  inputRadio.addEventListener('input', () => {
    const r = parseFloat(inputRadio.value);
    if (!isNaN(r) && r > 0) {
      inputRadio.classList.remove('is-invalid');
      inputRadio.classList.add('is-valid');
    } else {
      inputRadio.classList.remove('is-valid');
    }
  });

  // Calcular área
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const r = parseFloat(inputRadio.value);

    if (isNaN(r) || r <= 0) {
      inputRadio.classList.add('is-invalid');
      resultado.value = '';
      inputRadio.focus();
      return;
    }

    const area = Math.PI * r * r; // A = πr²

    // Formato local MX, hasta 4 decimales si hace falta
    resultado.value = area.toLocaleString('es-MX', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4
    });

    inputRadio.classList.remove('is-invalid');
    inputRadio.classList.add('is-valid');
  });

  // Botón limpiar
  btnLimpiar.addEventListener('click', limpiarTodo);
});
