const envelope = document.querySelector('.envelope-wrapper');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');

// Abrir el sobre al hacer clic (Solo abrir)
envelope.addEventListener('click', () => {
    envelope.classList.add('open');
});

// Botón Sí
yesBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evitar cualquier propagación
    celebration.classList.remove('hidden');
    
    // Disparar confeti
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
});

// Función para mover el botón No con límites calculados
function moveButton() {
    // Dimensiones de la ventana
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Dimensiones del botón
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Margen de seguridad para que no quede pegado al borde o fuera
    const margin = 20; // 20px de margen

    // Calcular el espacio disponible (área segura)
    const maxX = windowWidth - btnWidth - margin;
    const maxY = windowHeight - btnHeight - margin;
    
    // Asegurar que minX/minY no sean mayores que maxX/maxY (por si la pantalla es muy pequeña)
    const safeMaxX = Math.max(margin, maxX);
    const safeMaxY = Math.max(margin, maxY);

    // Posición aleatoria dentro de los límites
    const newX = Math.random() * (safeMaxX - margin) + margin;
    const newY = Math.random() * (safeMaxY - margin) + margin;
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
}

// Eventos para el botón No (PC y Móvil)
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    moveButton(); // Si logran clickear, se mueve
});
noBtn.addEventListener('touchstart', (e) => {
    // e.preventDefault(); // Comentado para permitir scroll si no tocan el boton exactamente, pero el boton se ira
    moveButton();
});