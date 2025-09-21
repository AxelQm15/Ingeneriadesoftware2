const estado       = document.getElementById("estado");
const fecha        = document.getElementById("fecha");
const form         = document.getElementById("formulario");
const pass1        = document.getElementById("contrasena1");
const pass2        = document.getElementById("contrasena2");

estado.value = "11";

(function setToday() {
  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm   = String(hoy.getMonth() + 1).padStart(2, "0");
  const dd   = String(hoy.getDate()).padStart(2, "0");
  fecha.value = `${yyyy}-${mm}-${dd}`;
})();

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)\S{8,}$/;

function setInvalid(input, message) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  const feedback = input.nextElementSibling;
  if (feedback && feedback.classList.contains("invalid-feedback")) {
    feedback.textContent = message;
  }
}

function setValid(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
}

function validatePasswords() {
  let ok = true;
  const p1 = pass1.value.trim();
  const p2 = pass2.value.trim();

  if (!passwordRegex.test(p1)) {
    setInvalid(
      pass1,
      "La contraseña debe tener mínimo 8 caracteres, al menos una mayúscula, un número y no debe contener espacios."
    );
    ok = false;
  } else {
    setValid(pass1);
  }

  if (p2 === "" || p2 !== p1) {
    setInvalid(pass2, "Las contraseñas no coinciden.");
    ok = false;
  } else {
    setValid(pass2);
  }

  return ok;
}

pass1.addEventListener("input", validatePasswords);
pass2.addEventListener("input", validatePasswords);

form.addEventListener("submit", (e) => {
  const contrasenasOK = validatePasswords();

  if (!form.checkValidity() || !contrasenasOK) {
    e.preventDefault();
    e.stopPropagation();
  }

  form.classList.add("was-validated");
});
