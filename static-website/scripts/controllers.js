document.addEventListener("DOMContentLoaded", function () {
    // Select directional arrows by their unique IDs
    const arrows = document.querySelectorAll("#up, #down, #left, #right");

    // Add hover effect to each arrow
    arrows.forEach(arrow => {
        arrow.addEventListener("mouseenter", () => {
            arrow.style.transform = "scale(1.2)";
            arrow.style.zIndex = "2"; // Bring to the front when hovered
        });

        arrow.addEventListener("mouseleave", () => {
            arrow.style.transform = "scale(1)";
            arrow.style.zIndex = "1"; // Reset z-index after hover
        });
    });
});
