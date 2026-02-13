const envelope = document.querySelector('.envelope-wrapper');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');

// Abrir el sobre al hacer clic
envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');
});

// Botón Sí
yesBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evitar que se cierre el sobre al hacer clic en el botón
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
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
});

// Botón No (Escurridizo)
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

noBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    alert('¡Esa opción no está disponible! Intenta atraparme jaja ❤️');
});