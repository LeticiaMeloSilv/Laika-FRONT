import { verificarUsuarioExistente } from "./exports.js"

const idPerfil = localStorage.getItem('idUsuarioLaika')
if (!idPerfil) {
  document.getElementById('login').classList.remove('hidden')
} else {
  const perfilExistente = await verificarUsuarioExistente(idPerfil)
  if (perfilExistente) {
    const userIcon = document.getElementById('userIcon')
    function isValidUrl(string) {
      try {
        new URL(string);
        return true;
      } catch (err) {
        return false;
      }
    }
    if (isValidUrl(perfilExistente.img)) {
      userIcon.src = link
    } else {
      userIcon.src = '../img/usuario.png'
    }
    userIcon.classList.remove('hidden')
    userIcon.addEventListener('click', () => { window.location.href = "./perfil.html" })
  } else {
    document.getElementById('login').classList.remove('hidden')
  }
}

