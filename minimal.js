document.addEventListener('DOMContentLoaded', () => {
    const previewGif = document.getElementById('preview-gif');
    const projectItems = document.querySelectorAll('.project-list li');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Preview functionality
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
    
    // Category filtering functionality
    const filterWords = document.querySelectorAll('.filter-word');
    
    filterWords.forEach(word => {
        word.addEventListener('click', () => {
            const category = word.getAttribute('data-category');
            
            // Toggle active state
            if (word.classList.contains('active')) {
                // If already active, deactivate and show all in default color
                word.classList.remove('active');
                projectItems.forEach(item => {
                    item.classList.remove('highlighted');
                });
            } else {
                // Deactivate all other words
                filterWords.forEach(w => w.classList.remove('active'));
                
                // Activate clicked word
                word.classList.add('active');
                
                // Clear all highlights first
                projectItems.forEach(item => {
                    item.classList.remove('highlighted');
                });
                
                // Highlight projects in selected category
                projectItems.forEach(item => {
                    if (item.getAttribute('data-category') === category) {
                        item.classList.add('highlighted');
                    }
                });
            }
        });
    });
    
    // Back to standard mode
    document.getElementById('standard-mode').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});