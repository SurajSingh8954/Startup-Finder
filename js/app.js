// ===============================
// Startup Team Finder - app.js
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // Mobile Menu
    // ============================

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {

            if (navLinks.style.display === "flex") {
                navLinks.style.display = "none";
            } else {
                navLinks.style.display = "flex";
                navLinks.style.flexDirection = "column";
                navLinks.style.position = "absolute";
                navLinks.style.top = "80px";
                navLinks.style.left = "0";
                navLinks.style.width = "100%";
                navLinks.style.background = "#fff";
                navLinks.style.padding = "20px";
                navLinks.style.boxShadow = "0 5px 20px rgba(0,0,0,.15)";
            }

        });
    }

    // ============================
    // Navbar Shadow
    // ============================

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            header.style.boxShadow = "0 8px 20px rgba(0,0,0,.15)";
        } else {
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,.08)";
        }

    });

    // ============================
    // Smooth Scroll
    // ============================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

    // ============================
    // Counter Animation
    // ============================

    const counters = document.querySelectorAll(".stat-card h2");

    counters.forEach(counter => {

        const text = counter.innerText.replace("+", "");
        const target = parseInt(text);

        let count = 0;

        const speed = target / 120;

        function updateCounter() {

            if (count < target) {

                count += speed;

                counter.innerText =
                    Math.floor(count) + "+";

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText =
                    target + "+";

            }

        }

        updateCounter();

    });

    // ============================
    // Search Demo
    // ============================

    const searchInput = document.querySelector(".search-box input");
    const searchBtn = document.querySelector(".search-box button");

    if (searchBtn) {

        searchBtn.addEventListener("click", () => {

            const skill = searchInput.value.trim();

            if (skill === "") {

                alert("Please enter a skill.");

            } else {

                alert("Searching for: " + skill);

            }

        });

    }

    // ============================
    // Join Team Buttons
    // ============================

    const joinButtons =
        document.querySelectorAll(".startup-card button");

    joinButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            alert("You need to login first!");

        });

    });

    // ============================
    // Ripple Button Effect
    // ============================

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {

        button.addEventListener("click", function (e) {

            const circle = document.createElement("span");

            const x = e.offsetX;
            const y = e.offsetY;

            circle.style.left = x + "px";
            circle.style.top = y + "px";

            circle.classList.add("ripple");

            this.appendChild(circle);

            setTimeout(() => {

                circle.remove();

            }, 600);

        });

    });

    // ============================
    // Fade Animation
    // ============================

    const cards = document.querySelectorAll(
        ".feature-card, .startup-card, .stat-card"
    );

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    });

    cards.forEach(card => {

        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = ".8s";

        observer.observe(card);

    });

});