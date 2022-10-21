const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
    // set mode classes
    initDefaultClasses();

    // set css variables
    setSizes();
    window.addEventListener('resize', setSizes);

    // animation
    let anBlocks = document.querySelectorAll('.an');
    function animatedBlocks() {
        let Y = window.scrollY;
        let visibleHeight = window.innerHeight - 100;
        anBlocks.forEach((block) => {
            if (!block.classList.contains('--loaded')) {
                let timeout = block.getAttribute('data-timeout');
                if (timeout) {
                    block.style.transitionDelay = timeout;
                }
                if (block.getBoundingClientRect().top < visibleHeight) {
                    block.classList.add('--loaded');
                }
            }
        });
    }
    setTimeout(() => {
        animatedBlocks();
        document.addEventListener('scroll', () => {
            animatedBlocks();
        });
    }, 500);
});

function initDefaultClasses() {
    if (!window._CLASS) {
        window._CLASS = {};
        window._CLASS.error = '--error';
        window._CLASS.filled = '--filled';
        window._CLASS.selected = '--selected';
        window._CLASS.checked = '--checked';
    }
}

function setSizes() {
    const windowWidth = window.screen.width,
        windowHeight = window.screen.height,
        documentWidth = body.offsetWidth,
        documentHeight = body.offsetHeight;

    body.style.setProperty('--w-w', windowWidth + 'px');
    body.style.setProperty('--w-h', windowHeight + 'px');

    body.style.setProperty('--d-w', documentWidth + 'px');
    body.style.setProperty('--d-h', documentHeight + 'px');
}