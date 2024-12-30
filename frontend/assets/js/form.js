document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Mostrar alerta de "Enviando..." inmediatamente
    showAlert('Enviando mensaje...', 'info');

    // Realizamos la solicitud POST a nuestro servidor
    fetch('http://localhost:3000/enviar-correo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
        showAlert(data, 'success');  // Alerta de éxito
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('Hubo un error al enviar el mensaje', 'error');  // Alerta de error
    });
});

// Función para mostrar alertas
function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    
    // Creamos el div de la alerta
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert');
    
    // Dependiendo del tipo, asignamos la clase correspondiente
    if (type === 'success') {
        alertDiv.classList.add('success');
        alertDiv.innerHTML = `<span class="icon">✔</span>${message}`;  // Icono de éxito
    } else if (type === 'error') {
        alertDiv.classList.add('error');
        alertDiv.innerHTML = `<span class="icon">✘</span>${message}`;  // Icono de error
    } else if (type === 'info') {
        alertDiv.classList.add('info');
        alertDiv.innerHTML = `<span class="icon">ℹ</span>${message}`;  // Icono de info
    }

    // Añadir la alerta al contenedor
    alertContainer.appendChild(alertDiv);

    // Asegurarse de que la alerta se haga visible con la clase .show
    setTimeout(() => {
        alertDiv.classList.add('show');
    }, 10); // Se añade la clase 'show' después de un pequeño retraso

    // Opcional: Eliminar la alerta después de 5 segundos
    setTimeout(() => {
        alertDiv.classList.remove('show');  // Primero eliminamos la clase 'show'
        // Después de 0.3 segundos (tiempo de la transición) la eliminamos completamente
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 5000);
}
