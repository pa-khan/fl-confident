import IMask from 'imask';

const html = document.querySelector('html');
const body = document.body;
const wrap = document.querySelector('.wrap');

document.addEventListener('DOMContentLoaded', () => {
    //  header menu
    let menuHam = document.querySelector('.ham');
    let menuNav = document.querySelector('.header__nav');

    if (menuHam) {
        for (let i = 0; i < 4; i++) {
            let div = document.createElement('div');
            menuHam.append(div);
        }

        menuHam.addEventListener('click', () => {
            menuHam.classList.toggle('--toggle');
            menuNav.classList.toggle('--toggle');
            html.classList.toggle('overflow-disable');
            body.classList.toggle('overflow-disable');
            wrap.classList.toggle('overflow-disable');
        });
    }

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


    const fields = document.querySelectorAll('.field');
    fields.forEach((field) => {
        field.area = field.querySelector('.field__area');

        if (field.classList.contains('--phone')) {
            IMask(field.area, {
                mask: '+ {7} (000) 000-00-00'
            })
        }


        field.area.addEventListener('focusin', () => {
            field.classList.remove('--error');
        });

    });
});