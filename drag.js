document.addEventListener('DOMContentLoaded', function () {
    // Select the main image container and all draggable containers
    const imageContainer = document.querySelector('.image-container');
    const draggableContainers = document.querySelectorAll('.container');

    // Load positions from local storage
    draggableContainers.forEach(container => {
        const savedPosition = localStorage.getItem(container.id);
        if (savedPosition) {
            // Parse the saved position and set the container's position
            const { left, top } = JSON.parse(savedPosition);
            container.style.left = left;
            container.style.top = top;
        }

        // Add mousedown event listener to each container for dragging
        container.addEventListener('mousedown', dragMouseDown);
    });

    function dragMouseDown(e) {
        // Prevent dragging if the target is an input or button element
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
            return;
        }

        e.preventDefault(); // Prevent default behavior
        const element = e.target.closest('.container'); // Get the closest container element
        const offsetX = e.clientX - element.getBoundingClientRect().left; // Calculate offset X
        const offsetY = e.clientY - element.getBoundingClientRect().top; // Calculate offset Y

        // Add mousemove event listener to document for dragging
        document.onmousemove = function (e) {
            const containerRect = imageContainer.getBoundingClientRect(); // Get the bounding rect of the image container
            const leftPercent = ((e.clientX - containerRect.left - offsetX) / containerRect.width) * 100; // Calculate left position in percentage
            const topPercent = ((e.clientY - containerRect.top - offsetY) / containerRect.height) * 100; // Calculate top position in percentage
            element.style.left = `${leftPercent}%`; // Set the left position
            element.style.top = `${topPercent}%`; // Set the top position
        };

        // Add mouseup event listener to document to stop dragging
        document.onmouseup = function () {
            document.onmousemove = null; // Remove mousemove event listener
            document.onmouseup = null; // Remove mouseup event listener

            const left = element.style.left; // Get the left position
            const top = element.style.top; // Get the top position

            // Save the new position to local storage
            localStorage.setItem(element.id, JSON.stringify({ left, top }));
        };
    }

    // Prevent default dragover behavior
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    // Adjust positions on window resize
    window.addEventListener('resize', adjustPositions);

    function adjustPositions() {
        draggableContainers.forEach(container => {
            const savedPosition = localStorage.getItem(container.id);
            if (savedPosition) {
                // Re-apply saved position on resize
                const { left, top } = JSON.parse(savedPosition);
                container.style.left = left;
                container.style.top = top;
            }
        });
    }
});