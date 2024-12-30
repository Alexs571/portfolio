const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);
  
    toggle.addEventListener('click', () => {
        // Agregar o quitar la clase 'show-menu' al menú
        nav.classList.toggle('show-menu');
  
        // Agregar o quitar la clase 'show-icon' al icono del menú
        toggle.classList.toggle('show-icon');
  
        
    });
}

showMenu('nav-toggle', 'nav-menu');
