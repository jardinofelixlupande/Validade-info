const sanitizeInput = (input) =>
  input.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
const loginButton = document.getElementById("login-btn");
const errorMessageEmail = document.getElementById("error-message-email");
const errorMessagePassword = document.getElementById("error-message-password");

//Varuável para controlar o número de tentativas
let attempts = 0;
let maxAttempts = 10;
const lockoutTime = 30000 * 2; //(60 segundos)

function login() {
  const attempsMessage = document.getElementById("attempts-message");

  //Verificar se o número de tentativas excedeu o limite
  if (attempts >= maxAttempts) {
    attempsMessage.textContent = `Por questao de segurança, você foi bloqueado temporariamente. Tente novamente em ${lockoutTime} segundos.`;
    attempsMessage.style.display = "block";
    loginButton.disabled = true;

    setTimeout(() => {
      attempts = 0; // Reseta as tentativas
      loginButton.disabled = false; // Reativa o botão
      attempsMessage.style.display = "none"; // Esconde a mensagem
    }, lockoutTime);

    return;
  }

  //Entrada de dados
  const email = sanitizeInput(document.getElementById("email").value);
  const password = sanitizeInput(document.getElementById("password").value);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  let hasError = false;

  //Validação de email
  if (email.length === 0) {
    errorMessageEmail.textContent = "Email é obrigatório";
    errorMessageEmail.style.display = "block";
    hasError = true;
  } else if (!emailRegex.test(email)) {
    errorMessageEmail.textContent = "Email inválido";
    errorMessageEmail.style.display = "block";
    hasError = true;
  } else {
    errorMessageEmail.style.display = "none";
  }

  //Validação de senha
  if (password.length === 0) {
    errorMessagePassword.textContent = "A senha é obrigatória";
    errorMessagePassword.style.display = "block";
    hasError = true;
  } else if (password.length < 6) {
    errorMessagePassword.textContent =
      " Senha deve conter no mínimo 6 caracteres";
    errorMessagePassword.style.display = "block";
    hasError = true;
  } else if (!passwordRegex.test(password)) {
    errorMessagePassword.textContent =
      "A senha deve ter no mínimo 6 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.";
    errorMessagePassword.style.display = "block";
    hasError = true;
  } else {
    errorMessagePassword.style.display = "none";
  }

  //Se houver erros, incrementa o número de tentativas
  if (hasError) {
    attempts++;
    const remainingAttempts = maxAttempts - attempts;
    if (remainingAttempts > 0) {
      attempsMessage.textContent = `Você tem ${remainingAttempts} tentativas restantes.`;
      attempsMessage.style.display = "block";
    }
  }

  return;
}
