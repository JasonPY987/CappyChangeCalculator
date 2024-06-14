document.addEventListener('DOMContentLoaded', function () {
    const draggableContainers = document.querySelectorAll('.container');

    // Load positions from local storage
    draggableContainers.forEach(container => {
        const savedPosition = localStorage.getItem(container.id);
        if (savedPosition) {
            const { left, top } = JSON.parse(savedPosition);
            container.style.left = left;
            container.style.top = top;
        }
        
        // Disable drag functionality
        container.style.cursor = 'default';
    });
});
