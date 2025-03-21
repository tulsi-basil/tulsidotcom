document.addEventListener('DOMContentLoaded', () => {
    const trailContainer = document.createElement('div');
    trailContainer.className = 'cursor-trail-container';
    document.body.appendChild(trailContainer);

    let trails = [];
    const maxTrails = 5;  // Reduced from 10
    const trailLifetime = 200;  // Reduced from 500

    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        trail.textContent = '*';  // Using asterisk instead of empty div
        trail.style.opacity = '0.7';
        trailContainer.appendChild(trail);
        trails.push(trail);

        if (trails.length > maxTrails) {
            const oldestTrail = trails.shift();
            oldestTrail.remove();
        }

        setTimeout(() => {
            trail.style.opacity = '0';
            setTimeout(() => {
                trail.remove();
                trails = trails.filter(t => t !== trail);
            }, 200);  // Faster cleanup
        }, trailLifetime);
    });
});