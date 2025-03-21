let highestZIndex = 1000;


// Keep your existing makeDraggable function
function makeDraggable(element, handleElement = null) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const dragHandle = handleElement || element;
    
    dragHandle.addEventListener('mousedown', dragMouseDown);

    function dragMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    // Bring dragged element to front
    if (element.classList.contains('window')) {
        highestZIndex += 1;
        element.style.zIndex = highestZIndex;
    }
    
    document.addEventListener('mouseup', closeDragElement);
    document.addEventListener('mousemove', elementDrag);
}

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        const targetElement = handleElement ? element : element;
        
        // Calculate new position
        let newTop = targetElement.offsetTop - pos2;
        let newLeft = targetElement.offsetLeft - pos1;
        
        // Get bottom bar height (including any margins you want to maintain)
        const bottomBarHeight = 40; // Adjust this value based on your bottom bar height
        
        // Prevent dragging into bottom bar area
        if (newTop + targetElement.offsetHeight > window.innerHeight - bottomBarHeight) {
            newTop = window.innerHeight - bottomBarHeight - targetElement.offsetHeight;
        }

        // Apply new position
        targetElement.style.position = 'absolute';
        targetElement.style.top = newTop + "px";
        targetElement.style.left = newLeft + "px";
    }

    function closeDragElement() {
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
    }
}

// Replace your existing background code with this
const backgroundStates = [
    { 
        name: 'day',
        images: ['day4.jpg', 'day2.jpg'],
        buttonText: 'night mode',
        currentImageIndex: 0
    },
    { 
        name: 'night',
        images: ['night2.png', 'night3.png', 'night.jpeg'],
        buttonText: 'sunset mode',
        currentImageIndex: 0
    },
    { 
        name: 'sunset',
        images: ['sunset.jpg', 'sunset2.png'],
        buttonText: 'dawn mode',
        currentImageIndex: 0
    },
    { 
        name: 'dawn',
        images: ['dawn.png'],
        buttonText: 'day mode',
        currentImageIndex: 0
    }
];

let currentStateIndex = 0;

function changeBackground() {
    // Get current state
    const previousState = backgroundStates[currentStateIndex];
    
    // Move to next state
    currentStateIndex = (currentStateIndex + 1) % backgroundStates.length;
    const currentState = backgroundStates[currentStateIndex];
    
    // Reset previous state's image index for next time we cycle back to it
    previousState.currentImageIndex = (previousState.currentImageIndex + 1) % previousState.images.length;
    
    // Set background to first image of new state
    document.body.style.backgroundImage = `url('${currentState.images[currentState.currentImageIndex]}')`;
    
    // Update button text
    document.getElementById('change-bg').textContent = currentState.buttonText;
}

// Add folder content configuration
const folderContents = {
    'xr-ai': [
        { icon: 'Wisp-App-Icon.png', gif: 'wisp.gif', name: 'Wisp' },
        { icon: 'parabrain-icon.png', gif: 'parabrain.gif', name: 'Parabrain' },
        { icon: 'interaction-icon.png', gif: 'hmd.gif', name: 'Interaction' }
    ],
    'web': [
        { icon: 'juggernaut-icon.png', gif: 'juggernaut.gif', name: 'Juggernaut' },
        { icon: 'aux-icon.png', gif: 'aux.gif', name: 'AUX' },
        { icon: 'yuber-icon.png', gif: 'yuber.gif', name: 'Yuber' }
    ],
    'research': [
        { icon: 'ad-icon.png', gif: 'gzd.gif', name: 'Ads & stuff' },
        { icon: 'cnn-icon.png', gif: 'cnn.gif', name: 'CNN' }
    ],
    'personal': [
        { icon: 'homescreen-icon.png', gif: 'homescreen.gif', name: 'Homescreen' },
        { icon: 'websites-icon.png', gif: 'websites.gif', name: 'Website' },
        { icon: 'visual-icon.png', gif: 'art.gif', name: 'Visual' },
        { icon: 'writing-icon.png', gif: 'writing.gif', name: 'Writing' }
    ],
    'more': [
        { icon: 'fancy-icon.png', gif: 'fancybear.gif', name: 'Fancy Bear' },
        { icon: 'eye-con.png', gif: 'thesis.gif', name: 'Thesis' }
    ]
};

function createFolderWindow(category) {
    const folderWindow = document.createElement('div');
    folderWindow.className = 'window folder-window';
    folderWindow.id = `${category}-window`;
    
    // Set border color based on category
    const colors = {
        'xr-ai': '#C3F400',
        'web': '#7C82F9',
        'research': '#3D8421',
        // 'personal': '#ffffff',
        'more': '#000000'
    };
    
    folderWindow.style.borderColor = colors[category];

    folderWindow.innerHTML = `
    <div class="window-header" style="border-bottom-color: ${colors[category]}; background-color: ${colors[category]}">
        <button class="minimize-btn">—</button>
        <div class="window-title">${category}</div>
        <button class="close-btn">×</button>
    </div>
        <div class="window-content">
            <div class="project-grid">
                ${folderContents[category].map(project => `
                    <div class="project-item" data-gif="${project.gif}">
                        <img src="${project.icon}" alt="${project.name}">
                        <span>${project.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    document.querySelector('.folder-windows').appendChild(folderWindow);
    makeDraggable(folderWindow, folderWindow.querySelector('.window-header'));
    
    // Add minimize functionality
    folderWindow.querySelector('.minimize-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        folderWindow.classList.toggle('minimized');
        
        // Store original dimensions before minimizing
        if (!folderWindow.classList.contains('minimized')) {
            const originalWidth = folderWindow.dataset.originalWidth;
            if (originalWidth) {
                folderWindow.style.width = originalWidth;
            }
        } else {
            folderWindow.dataset.originalWidth = folderWindow.style.width;
        }
    });

    // Add after minimize button event listener
    folderWindow.querySelector('.close-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    folderWindow.style.display = 'none';
});

    return folderWindow;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make windows draggable by their headers
    document.querySelectorAll('.window').forEach(window => {
        const header = window.querySelector('.window-header');
        if (header) makeDraggable(window, header);
        // Add this inside your DOMContentLoaded event listener
        // Set initial background and button text
        const initialState = backgroundStates[0];
        document.body.style.backgroundImage = `url('${initialState.images[initialState.currentImageIndex]}')`;
        document.getElementById('change-bg').textContent = initialState.buttonText;
     });

    // Make folders draggable
    // Set up folder click handlers
document.querySelectorAll('.folder').forEach(folder => {
    if (folder.classList.contains('selected-project')) return;
    
    folder.addEventListener('click', (e) => {
        e.stopPropagation();
        const category = folder.getAttribute('data-category');
        let folderWindow = document.getElementById(`${category}-window`);
        
        if (!folderWindow) {
            folderWindow = createFolderWindow(category);
        }
        
        folderWindow.style.display = 'block';
        const windowWidth = 400;
        const windowHeight = 300;
        folderWindow.style.top = `${(window.innerHeight - windowHeight) / 2}px`;
        folderWindow.style.left = `${(window.innerWidth - windowWidth) / 2}px`;
        
        // Bring window to front
        highestZIndex += 1;
        folderWindow.style.zIndex = highestZIndex;
    });
});

// After making folders draggable, set their initial positions
document.querySelectorAll('.folder:not(.selected-project)').forEach(folder => {
    const category = folder.getAttribute('data-category');
    switch(category) {
        case 'xr-ai':
            folder.style.top = '0';
            folder.style.right = '0';
            break;
        case 'web':
            folder.style.top = '120px';
            folder.style.right = '0';
            break;
        case 'research':
            folder.style.top = '0';
            folder.style.right = '120px';
            break;
        case 'personal':
            folder.style.top = '120px';
            folder.style.right = '120px';
            break;
        case 'more':
            folder.style.top = '240px';
            folder.style.right = '0px';
            break;
    }
});



    // Set up folder click handlers - MOVED OUTSIDE THE forEach
    document.querySelectorAll('.folder').forEach(folder => {
        folder.addEventListener('click', (e) => {
            e.stopPropagation();
            const category = folder.getAttribute('data-category');
            let folderWindow = document.getElementById(`${category}-window`);
            
            if (!folderWindow) {
                folderWindow = createFolderWindow(category);
            }
            
            folderWindow.style.display = 'block';
            const windowWidth = 400;
            const windowHeight = 300;
            folderWindow.style.top = `${(window.innerHeight - windowHeight) / 2}px`;
            folderWindow.style.left = `${(window.innerWidth - windowWidth) / 2}px`;
        });
    });

    // MOVED background change event listener outside the folder click handler
    document.getElementById('change-bg').addEventListener('click', changeBackground);

    // Create and add preview element
    const preview = document.createElement('img');
    preview.className = 'project-preview';
    document.body.appendChild(preview);

    // Rest of your event listeners...
    document.addEventListener('mousemove', (e) => {
        if (preview.classList.contains('active')) {
            preview.style.left = `${e.pageX + 20}px`;
            preview.style.top = `${e.pageY + 20}px`;
        }
    });

    document.addEventListener('mouseover', (e) => {
        const projectItem = e.target.closest('.project-item');
        if (projectItem) {
            preview.src = projectItem.dataset.gif;
            preview.classList.add('active');
        }
    });

    document.addEventListener('mouseout', (e) => {
        const projectItem = e.target.closest('.project-item');
        if (projectItem) {
            preview.classList.remove('active');
        }
    });

    document.addEventListener('click', (e) => {
        const projectItem = e.target.closest('.project-item');
        if (projectItem) {
            const projectName = projectItem.querySelector('span').textContent;
            window.location.href = `./projects/${projectName.toLowerCase()}.html`;
        }
    });

    // Add show works event listener
    document.getElementById('show-works').addEventListener('click', toggleSelectedProjects);
});
//------- selected works ----------------------------------------------------------------------------

// Add to your existing JavaScript
const selectedProjects = [
    {
        name: 'Wisp',
        icon: 'Wisp-App-Icon.png',
        gif: 'wisp.gif',
        originalFolder: 'xr-ai'
    },
    {
        name: 'Juggernaut',
        icon: 'juggernaut-icon.png',
        gif: 'juggernaut.gif',
        originalFolder: 'ux design'
    },
    {
        name: 'Thesis',
        icon: 'eye-con.png',
        gif: 'thesis.gif',
        originalFolder: 'more'
    },
    {
        name: 'Parabrain',
        icon: 'parabrain-icon.png',
        gif: 'parabrain.gif',
        originalFolder: 'xr-ai'
    }
    // Add more selected projects here
];

let selectedProjectsVisible = false;

function toggleSelectedProjects() {
    const button = document.getElementById('show-works');
    const foldersContainer = document.querySelector('.folders-container');
    
    if (!selectedProjectsVisible) {
        selectedProjects.forEach(project => {
            const projectIcon = document.createElement('div');
            projectIcon.className = 'folder selected-project';
            projectIcon.setAttribute('data-gif', project.gif);
            projectIcon.setAttribute('data-category', 'selected');
            
            projectIcon.innerHTML = `
                <img src="${project.icon}" alt="${project.name}">
                <span>${project.name}</span>
            `;
            
            foldersContainer.insertBefore(projectIcon, foldersContainer.firstChild);
            makeDraggable(projectIcon);
            
            // Add click handler for selected projects
            projectIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                window.location.href = `./projects/${project.name.toLowerCase()}.html`;
            });
        });
        
        // Change button style to black with green text
        button.textContent = 'hide selected works';
        button.style.backgroundColor = '#000000';
        button.style.color = '#C3F400'; // Bright green matching bottom bar
    } else {
        document.querySelectorAll('.selected-project').forEach(project => project.remove());
        
        // Reset button style
        button.textContent = 'show selected works';
        button.style.backgroundColor = 'transparent';
        button.style.color = '#000000'; // Reset to default text color
    }
    selectedProjectsVisible = !selectedProjectsVisible;
}

// Add to your DOMContentLoaded event listener
document.getElementById('show-works').addEventListener('click', toggleSelectedProjects);