

//====================================
// POPUP
//====================================

const popup = document.getElementById("popup");

const openButtons =
    document.querySelectorAll(".open-popup");

const closeButton =
    document.querySelector(".popup-close");

const overlay =
    document.querySelector(".popup-overlay");

const successPopup =
document.getElementById(
    'successPopup'
);

const successBtn =
document.getElementById(
    'successBtn'
);
function openSuccessPopup(){

    successPopup.classList.add(
        'active'
    );

}

function closeSuccessPopup(){

    successPopup.classList.remove(
        'active'
    );

}

if(successBtn){

    successBtn.addEventListener(
        'click',
        closeSuccessPopup
    );

}




openButtons.forEach(button => {

    button.addEventListener("click", () => {

        popup.classList.add("active");
       

        document.body.style.overflow = "hidden";

    });

});

function closePopup() {

    popup.classList.remove("active");

    document.body.style.overflow = "";

}

if (closeButton) {

    closeButton.addEventListener(
        "click",
        closePopup
    );

}

if (overlay) {

    overlay.addEventListener(
        "click",
        closePopup
    );

}



//====================================
// PHONE VALIDATION
//====================================

const phoneInput =
    document.querySelector(
        'input[name="phone"]'
    );

if (phoneInput) {

    phoneInput.addEventListener(
        "input",
        function () {

            this.value = this.value
                .replace(/\D/g, "")
                .slice(0, 10);

        }
    );

}




/* =========================================
GOOGLE APPS SCRIPT
========================================= */

const scriptURL =
'https://script.google.com/macros/s/AKfycbyLQRhmIG9tGoLRoC15h9yQzM33NGginsbAN9udVwn0OYIRpA6Jkus-xoJVOageJv1sIw/exec';


/* =========================================
CONTACT FORM
========================================= */

const contactForm =
document.getElementById('contactForm');

let currentSource = 'Unknown';


if (contactForm) {

    const phoneInput =
    contactForm.querySelector(
        'input[name="phone"]'
    );


    /* =========================================
    LƯU NGUỒN FORM
    ========================================= */

    document
    .querySelectorAll('.open-popup')
    .forEach(button => {

        button.addEventListener(
            'click',
            function(){

                currentSource =
                this.dataset.source || 'Unknown';

            }
        );

    });


    /* =========================================
    CHỈ CHO NHẬP SỐ ĐIỆN THOẠI
    ========================================= */

    phoneInput.addEventListener(
        'input',
        function(){

            this.value = this.value
                .replace(/\D/g,'')
                .slice(0,10);

        }
    );


    /* =========================================
    SUBMIT FORM
    ========================================= */

    contactForm.addEventListener(
        'submit',
        async function(e){

            e.preventDefault();


            const name =
            contactForm
            .querySelector(
                'input[name="name"]'
            )
            .value
            .trim();


            const phone =
            phoneInput.value.trim();


            const email =
            contactForm
            .querySelector(
                'input[name="email"]'
            )
            .value
            .trim();


            /* ================================
            KIỂM TRA SĐT
            ================================= */

            if (!/^0\d{9}$/.test(phone)) {

                alert(
                    'Số điện thoại phải gồm 10 số và bắt đầu bằng số 0.'
                );

                phoneInput.focus();

                return;

            }


            const submitButton =
            contactForm.querySelector(
                '.btn-submit'
            );


            const originalHTML =
            submitButton.innerHTML;


            submitButton.disabled = true;

submitButton.innerHTML = `
    <span class="spinner"></span>
    ĐANG GỬI...
`;


            try {

                await fetch(
                    scriptURL,
                    {

                        method: 'POST',

                        mode: 'no-cors',

                        headers: {

                            'Content-Type':
                            'text/plain;charset=utf-8'

                        },

                        body:
                        JSON.stringify({

                            name: name,

                            phone: phone,

                            email: email,

                            source: currentSource

                        })

                    }
                );


                /* =========================
                GA4 EVENT
                ========================= */

                if (
                    window.dataLayer
                ) {

                    window.dataLayer.push({

                        event: 'form_submit'

                    });

                }


                contactForm.reset();


               submitButton.disabled =
false;

submitButton.innerHTML =
originalHTML;

                closePopup();

                openSuccessPopup();

            } catch (error) {

                console.error(error);


                submitButton.disabled =
                false;

                submitButton.textContent =
                originalText;


                alert(
                    'Có lỗi xảy ra. Vui lòng thử lại.'
                );

            }

        }
    );

}

/* =========================================
COUNTDOWN
========================================= */

const targetDate = new Date(
    "2026-09-30T23:59:59"
).getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance =
        targetDate - now;

    if (distance <= 0) {

        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';

        return;
    }

    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (distance %
                (1000 * 60))
            /
            1000
        );

    document.getElementById('days').textContent =
        String(days).padStart(2, '0');

    document.getElementById('hours').textContent =
        String(hours).padStart(2, '0');

    document.getElementById('minutes').textContent =
        String(minutes).padStart(2, '0');

    document.getElementById('seconds').textContent =
        String(seconds).padStart(2, '0');

}

updateCountdown();

setInterval(
    updateCountdown,
    1000
);

/* =========================================
FAQ
========================================= */

const faqItems =
    document.querySelectorAll('.faq-item');

faqItems.forEach(item => {

    const question =
        item.querySelector('.faq-question');

    question.addEventListener('click', () => {

        const answer =
            item.querySelector('.faq-answer');

        const icon =
            question.querySelector('i');

        if (item.classList.contains('active')) {

            item.classList.remove('active');

            answer.style.maxHeight = null;

            icon.classList.remove('fa-minus');

            icon.classList.add('fa-plus');

        } else {

            faqItems.forEach(faq => {

                faq.classList.remove('active');

                faq.querySelector('.faq-answer')
                    .style.maxHeight = null;

                faq.querySelector('i')
                    .classList.remove('fa-minus');

                faq.querySelector('i')
                    .classList.add('fa-plus');

            });

            item.classList.add('active');

            answer.style.maxHeight =
                answer.scrollHeight + 'px';

            icon.classList.remove('fa-plus');

            icon.classList.add('fa-minus');

        }

    });

});

/* =========================================
FOOTER FORM
========================================= */

const footerForm =
    document.getElementById(
        'contactFormFooter'
    );

if (footerForm) {

    const footerPhone =
        footerForm.querySelector(
            'input[name="phone"]'
        );

    footerPhone.addEventListener(
        'input',
        function () {

            this.value = this.value
                .replace(/\D/g, '')
                .slice(0, 10);

        }
    );

    footerForm.addEventListener(
        'submit',
        async function (e) {

            e.preventDefault();

            const name =
                footerForm.querySelector(
                    'input[name="name"]'
                ).value.trim();

            const phone =
                footerPhone.value.trim();

            const email =
                footerForm.querySelector(
                    'input[name="email"]'
                ).value.trim();

            const source =
                footerForm.querySelector(
                    'input[name="source"]'
                ).value;

            if (!/^0\d{9}$/.test(phone)) {

                alert(
                    'Số điện thoại phải gồm 10 số và bắt đầu bằng số 0.'
                );

                footerPhone.focus();

                return;

            }

            const submitBtn =
                footerForm.querySelector(
                    '.footer-submit'
                );

            const originalText =
                submitBtn.innerHTML;

            submitBtn.disabled = true;

            submitBtn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin" style="margin-right:8px;"></i>ĐANG GỬI...';

            try {

                await fetch(
                    scriptURL,
                    {

                        method: 'POST',

                        mode: 'no-cors',

                        headers: {
                            'Content-Type':
                                'text/plain;charset=utf-8'
                        },

                        body: JSON.stringify({

                            name: name,

                            phone: phone,

                            email: email,

                            source: source

                        })

                    }
                );

                if (window.dataLayer) {

                    window.dataLayer.push({

                        event: 'form_submit'

                    });

                }

                footerForm.reset();

                submitBtn.disabled = false;

                submitBtn.innerHTML =
                    originalText;

                openSuccessPopup();

            }

            catch (error) {

                console.error(error);

                submitBtn.disabled = false;

                submitBtn.innerHTML =
                    originalText;

                alert(
                    'Có lỗi xảy ra. Vui lòng thử lại.'
                );

            }

        }
    );

}


/* =========================================
SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll('.reveal');

const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('show');

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
RESET PAGE TO HERO ON RELOAD
========================================= */

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
});

window.addEventListener('load', function () {
    window.scrollTo(0, 0);
});




/* =========================================
BACK TO TOP
========================================= */

const backToTop =
    document.getElementById('backToTop');

if (backToTop) {

    window.addEventListener('scroll', function () {

        if (window.scrollY > 500) {

            backToTop.classList.add('show');

        } else {

            backToTop.classList.remove('show');

        }

    });

    backToTop.addEventListener('click', function () {

        window.scrollTo({

            top: 0,

            behavior: 'smooth'

        });

    });

}
