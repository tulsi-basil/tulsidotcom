document.addEventListener('DOMContentLoaded', () => {
    const previewGif = document.getElementById('preview-gif');
    const projectItems = document.querySelectorAll('.project-list li');
    
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const gifPath = item.getAttribute('data-gif');
            previewGif.src = gifPath;
            previewGif.style.display = 'block';
        });
        
        item.addEventListener('mouseleave', () => {
            previewGif.style.display = 'none';
        });
    });
});

// Add to minimal.js
document.getElementById('standard-mode').addEventListener('click', () => {
    window.location.href = 'index.html';
});