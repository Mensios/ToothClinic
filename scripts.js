document.addEventListener('DOMContentLoaded', function() {
    setupAuthForms();
    setupFloatingTeeth();
    
    function setupAuthForms() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        if (loginForm) {
            loginForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(loginForm);
                fetch('login.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    showModal(data.message);
                    if (data.status === 'success') {
                        window.location.href = 'dashboard.html';
                    }
                })
                .catch(error => {
                    showModal('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
                });
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const password = document.getElementById('registerPassword').value;
                const confirmPassword = document.getElementById('registerConfirmPassword').value;

                if (password !== confirmPassword) {
                    showModal('Пароли не совпадают');
                    return;
                }

                const formData = new FormData(registerForm);
                fetch('register.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    showModal(data.message);
                    if (data.status === 'success') {
                        window.location.href = 'dashboard.html';
                    }
                })
                .catch(error => {
                    showModal('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
                });
            });
        }
    }

    function showModal(message) {
        const modal = document.getElementById('modal');
        const modalMessage = document.getElementById('modal-message');
        const span = document.getElementsByClassName('close')[0];

        if (modal && modalMessage && span) {
            modalMessage.textContent = message;
            modal.style.display = 'block';

            span.onclick = function() {
                modal.style.display = 'none';
            };

            window.onclick = function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };
        }
    }

    function setupFloatingTeeth() {
        const teethContainer = document.querySelector('.floating-teeth');
        const teethImages = ['tooth1.png', 'tooth2.png', 'tooth3.png'];

        document.addEventListener('mousemove', function(e) {
            const teeth = document.querySelectorAll('.floating-teeth .tooth');
            teeth.forEach(tooth => {
                const speed = Math.random() * 5 + 1; // Random speed for each tooth
                const x = (window.innerWidth - e.pageX * speed) / 100;
                const y = (window.innerHeight - e.pageY * speed) / 100;
                tooth.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
        });
    }
});
