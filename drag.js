document.addEventListener('DOMContentLoaded', function () {
    const imageContainer = document.querySelector('.image-container');
    const draggableContainers = document.querySelectorAll('.container');

    // Load positions from local storage
    draggableContainers.forEach(container => {
        const savedPosition = localStorage.getItem(container.id);
        if (savedPosition) {
            const { left, top } = JSON.parse(savedPosition);
            container.style.left = left;
            container.style.top = top;
        }

        container.addEventListener('mousedown', dragMouseDown);
    });

    function dragMouseDown(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
            return;
        }

        e.preventDefault();
        const element = e.target.closest('.container');
        const offsetX = e.clientX - element.getBoundingClientRect().left;
        const offsetY = e.clientY - element.getBoundingClientRect().top;

        document.onmousemove = function (e) {
            const containerRect = imageContainer.getBoundingClientRect();
            const leftPercent = ((e.clientX - containerRect.left - offsetX) / containerRect.width) * 100;
            const topPercent = ((e.clientY - containerRect.top - offsetY) / containerRect.height) * 100;
            element.style.left = `${leftPercent}%`;
            element.style.top = `${topPercent}%`;
        };

        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;

            const left = element.style.left;
            const top = element.style.top;

            localStorage.setItem(element.id, JSON.stringify({ left, top }));
        };
    }

    document.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    // Adjust positions on window resize
    window.addEventListener('resize', adjustPositions);

    function adjustPositions() {
        draggableContainers.forEach(container => {
            const savedPosition = localStorage.getItem(container.id);
            if (savedPosition) {
                const { left, top } = JSON.parse(savedPosition);
                container.style.left = left;
                container.style.top = top;
            }
        });
    }
});
