document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const sectionName = this.getAttribute('data-scroll');
        const targetSection = document.querySelector(`[data-section="${sectionName}"]`);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
