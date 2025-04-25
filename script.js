document.addEventListener('DOMContentLoaded', () => {
    let activeElement = null;
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Function to handle mouse move
    function onMouseMove(e) {
        if (!isDragging || !activeElement) return;

        // Prevent default browser actions (like text selection)
        e.preventDefault();

        // Calculate new position
        const newLeft = e.clientX - offsetX;
        const newTop = e.clientY - offsetY;

        // Apply new position
        activeElement.style.left = `${newLeft}px`;
        activeElement.style.top = `${newTop}px`;
    }

    // Function to handle mouse up
    function onMouseUp(e) {
        if (!isDragging) return;

        isDragging = false;
        if (activeElement) {
            activeElement.classList.remove('dragging'); // Remove dragging class
        }
        activeElement = null;

        // Remove global listeners
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    // Add listener to potential draggable elements container (or document)
    // Using event delegation on the body can be efficient if many elements
    document.body.addEventListener('mousedown', (e) => {
        // Check if the clicked element has the 'move' class
        if (e.target.classList.contains('move')) {
            isDragging = true;
            activeElement = e.target;
            activeElement.classList.add('dragging'); // Add dragging class

            // Calculate the offset from the element's top-left corner
            offsetX = e.clientX - activeElement.offsetLeft;
            offsetY = e.clientY - activeElement.offsetTop;

             // Important: Attach move and up listeners to the document
            // to capture mouse events outside the element
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            // Optional: Prevent default drag behavior (like image ghosting)
            // e.preventDefault(); // Be cautious, might prevent other desired behaviors
        }
    });

    // Prevent default dragstart event for elements with class 'move'
    // This stops the browser's native image drag behavior
    document.querySelectorAll('.move').forEach(el => {
        el.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    });
});