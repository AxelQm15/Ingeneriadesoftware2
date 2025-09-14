// Utilidad: mostrar una alerta Bootstrap
function showAlert(message, type = 'danger') {
  const cont = document.getElementById('alertas');
  cont.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
}

function clearAlert() {
  const cont = document.getElementById('alertas');
  cont.innerHTML = '';
}

function setInvalid(input, msg) {
  input.classList.add('is-invalid');
  const feedback = input.parentElement.querySelector('.invalid-feedback') || input.nextElementSibling;
  if (feedback) feedback.textContent = msg;
}

function clearInvalid(...inputs) {
  inputs.forEach(i => i.classList.remove('is-invalid'));
}

// Normaliza comas -> puntos y recorta espacios
function normalizeNumberStr(str) {
  return (str || '').toString().trim().replace(/,/g, '.');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calc-form');
  const n1 = document.getElementById('numero1');
  const n2 = document.getElementById('numero2');
  const op = document.getElementById('operacion');
  const res = document.getElementById('resultado');
  const btnLimpiar = document.getElementById('btn-limpiar');

  // Si alguno no existe, probablemente cambiaste IDs o el JS no carga
  if (!form || !n1 || !n2 || !op || !res) {
    console.error('Revisa que los IDs del HTML coincidan y que app.js se cargue al final del <body>.');
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAlert();
    clearInvalid(n1, n2, op);

    const v1 = normalizeNumberStr(n1.value);
    const v2 = normalizeNumberStr(n2.value);
    const vop = op.value;

    let valid = true;
    if (v1 === '' || isNaN(Number(v1))) { setInvalid(n1, 'Por favor, escribe un número válido.'); valid = false; }
    if (!vop) { setInvalid(op, 'Elige una operación.'); valid = false; }
    if (v2 === '' || isNaN(Number(v2))) { setInvalid(n2, 'Por favor, escribe un número válido.'); valid = false; }
    if (!valid) { res.value = ''; return; }

    const a = parseFloat(v1);
    const b = parseFloat(v2);
    let resultado;

    switch (vop) {
      case 'suma':            resultado = a + b; break;
      case 'resta':           resultado = a - b; break;
      case 'multiplicacion':  resultado = a * b; break;
      case 'division':
        if (b === 0) {
          showAlert('No se puede dividir entre cero. Cambia el Número 2.', 'warning');
          setInvalid(n2, 'No se puede dividir entre 0.');
          res.value = '';
          return;
        }
        resultado = a / b; break;
      default:
        showAlert('Selecciona una operación válida.');
        return;
    }

    // Mostrar resultado (hasta 10 decimales sin notación científica)
    const formatted = Number.isFinite(resultado)
      ? resultado.toLocaleString('es-MX', { maximumFractionDigits: 10, useGrouping: false })
      : '';
    res.value = formatted;
  });

  btnLimpiar.addEventListener('click', () => {
    form.reset();
    clearAlert();
    clearInvalid(n1, n2, op);
    res.value = '';
    n1.focus();
  });
});
