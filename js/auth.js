// =======================================
// StartupFinder Login JavaScript
// File: js/auth.js
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    // ===========================
    // Show / Hide Password
    // ===========================

    const password = document.getElementById("password");
    const toggle = document.getElementById("togglePassword");

    if (toggle && password) {

        toggle.addEventListener("click", () => {

            if (password.type === "password") {

                password.type = "text";
                toggle.classList.remove("fa-eye");
                toggle.classList.add("fa-eye-slash");

            } else {

                password.type = "password";
                toggle.classList.remove("fa-eye-slash");
                toggle.classList.add("fa-eye");

            }

        });

    }

    // ===========================
    // Login Form Validation
    // ===========================

    const form = document.getElementById("loginForm");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const email = document.querySelector('input[type="email"]').value.trim();
            const pass = password.value.trim();

            if (email === "" || pass === "") {

                alert("Please fill in all fields.");
                return;

            }

            if (!validateEmail(email)) {

                alert("Please enter a valid email address.");
                return;

            }

            if (pass.length < 6) {

                alert("Password must be at least 6 characters.");
                return;

            }

            alert("✅ Login Successful!");

            // Redirect after login
            window.location.href = "dashboard.html";

        });

    }

    // ===========================
    // Email Validation Function
    // ===========================

    function validateEmail(email) {

        const pattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return pattern.test(email);

    }

    // ===========================
    // Input Focus Effect
    // ===========================

    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {

        input.addEventListener("focus", () => {

            input.style.boxShadow =
                "0 0 10px rgba(79,70,229,.4)";

        });

        input.addEventListener("blur", () => {

            input.style.boxShadow = "none";

        });

    });

    // ===========================
    // Enter Key Login
    // ===========================

    document.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            form.requestSubmit();

        }

    });

    // ===========================
    // Social Login Buttons
    // ===========================

    const socialButtons =
        document.querySelectorAll(".social-login button");

    socialButtons.forEach(button => {

        button.addEventListener("click", () => {

            const provider = button.innerText.trim();

            alert(provider + " login will be available after backend integration.");

        });

    });

});