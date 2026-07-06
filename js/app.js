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
                navLinks.style.background = "var(--card)";
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
    const countersAnimated = new WeakSet();

    function animateCounter(counter) {

        if (countersAnimated.has(counter)) return;
        countersAnimated.add(counter);

        const text = counter.innerText.replace("+", "");
        const target = parseInt(text);

        let count = 0;

        const speed = target / 90;

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

    }

    // ============================
    // Search Demo
    // ============================

    const searchInput = document.querySelector(".search-box input");
    const searchBtn = document.querySelector(".search-box button");

    if (searchBtn) {

        searchBtn.addEventListener("click", () => {

            const skill = searchInput.value.trim();

            if (skill === "") {

                searchInput.classList.add("shake");
                setTimeout(() => searchInput.classList.remove("shake"), 500);

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

    const buttons = document.querySelectorAll(".btn, .startup-card button, .search-box button");

    buttons.forEach(button => {

        button.addEventListener("click", function (e) {

            const circle = document.createElement("span");

            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

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
    // Staggered Reveal on Scroll
    // (features, startups, stats cards fade + rise in one after another)
    // ============================

    const groups = [
        document.querySelectorAll(".stat-card"),
        document.querySelectorAll(".feature-card"),
        document.querySelectorAll(".startup-card")
    ];

    const revealObserver = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const el = entry.target;
                const delay = parseFloat(el.dataset.delay || 0);

                setTimeout(() => {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                }, delay);

                if (el.matches(".stat-card")) {
                    animateCounter(el.querySelector("h2"));
                }

                obs.unobserve(el);

            }

        });

    }, { threshold: 0.2 });

    groups.forEach(group => {

        group.forEach((card, i) => {

            card.style.transition = "opacity .6s ease, transform .6s ease";
            card.dataset.delay = i * 120;

            revealObserver.observe(card);

        });

    });

    // ============================
    // Hero Image Parallax (mouse move tilt)
    // ============================

    const heroSection = document.querySelector(".hero");
    const heroImage = document.querySelector(".hero-image img");

    if (heroSection && heroImage && window.matchMedia("(min-width: 901px)").matches) {

        heroSection.addEventListener("mousemove", (e) => {

            const rect = heroSection.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;

            heroImage.style.transform =
                `rotateY(${relX * 12}deg) rotateX(${relY * -12}deg) scale(1.03)`;

        });

        heroSection.addEventListener("mouseleave", () => {
            heroImage.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
        });

    }

    // ============================
    // Theme Button Spin Feedback
    // ============================

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {
            themeToggle.classList.add("spin");
            setTimeout(() => themeToggle.classList.remove("spin"), 500);
        });

    }

});