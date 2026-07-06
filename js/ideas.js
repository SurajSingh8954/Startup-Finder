// ===============================
// Startup Team Finder - ideas.js
// ===============================
// Note: the ideas below are rendered directly in ideas.html (static cards).
// This script adds the interactive behavior: mobile menu, search, category
// filtering, like toggling, staggered reveal animation, ripple feedback,
// and newsletter validation.

document.addEventListener("DOMContentLoaded", () => {

    const cards = Array.from(document.querySelectorAll(".idea-card"));

    // ============================
    // Mobile Menu
    // ============================

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }

    // ============================
    // Staggered Reveal on Scroll
    // ============================

    const revealObserver = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const el = entry.target;
                const delay = parseFloat(el.dataset.delay || 0);

                setTimeout(() => {
                    el.classList.add("revealed");
                }, delay);

                obs.unobserve(el);

            }

        });

    }, { threshold: 0.15 });

    cards.forEach((card, i) => {
        card.dataset.delay = (i % 6) * 100;
        revealObserver.observe(card);
    });

    // ============================
    // Ripple Button Effect
    // ============================

    function attachRipple(button) {

        button.addEventListener("click", function (e) {

            const circle = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            circle.style.left = x + "px";
            circle.style.top = y + "px";
            circle.classList.add("ripple");

            this.appendChild(circle);

            setTimeout(() => circle.remove(), 600);

        });

    }

    document.querySelectorAll(
        ".filters button, .idea-card button, .pagination button, .search-box button, .newsletter-box button"
    ).forEach(attachRipple);

    // ============================
    // Search + Category Filtering
    // ============================

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const filterBar = document.getElementById("filterBar");
    const noResults = document.getElementById("noResults");

    let activeFilter = "All";

    function applyFilters() {

        const query = (searchInput?.value || "").trim().toLowerCase();
        let visibleCount = 0;

        cards.forEach(card => {

            const tag = card.querySelector(".tag")?.textContent.trim() || "";
            const title = card.querySelector("h2")?.textContent.trim().toLowerCase() || "";
            const desc = card.querySelector("p")?.textContent.trim().toLowerCase() || "";

            const matchesFilter = activeFilter === "All" || tag === activeFilter;
            const matchesQuery = query === "" || title.includes(query) || desc.includes(query);

            if (matchesFilter && matchesQuery) {
                card.classList.remove("hidden-card");
                visibleCount++;
            } else {
                card.classList.add("hidden-card");
            }

        });

        if (noResults) {
            noResults.classList.toggle("show", visibleCount === 0);
        }

    }

    if (searchBtn) {
        searchBtn.addEventListener("click", applyFilters);
    }

    if (searchInput) {
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") applyFilters();
        });
        // live filtering as you type
        searchInput.addEventListener("input", applyFilters);
    }

    if (filterBar) {

        filterBar.querySelectorAll("button").forEach(btn => {

            btn.addEventListener("click", () => {

                filterBar.querySelectorAll("button").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                activeFilter = btn.dataset.filter || "All";
                applyFilters();

            });

        });

    }

    // ============================
    // Like Buttons
    // ============================

    document.querySelectorAll(".like-btn").forEach(likeBtn => {

        likeBtn.addEventListener("click", () => {

            const countEl = likeBtn.querySelector(".like-count");
            if (!countEl) return;

            let count = parseInt(countEl.textContent, 10) || 0;
            const alreadyLiked = likeBtn.classList.contains("liked");

            if (alreadyLiked) {
                count -= 1;
                likeBtn.classList.remove("liked");
            } else {
                count += 1;
                likeBtn.classList.add("liked");
            }

            countEl.textContent = count;

        });

    });

    // ============================
    // View Details Buttons
    // ============================

    document.querySelectorAll(".idea-card > button").forEach(btn => {

        btn.addEventListener("click", () => {
            const title = btn.closest(".idea-card")?.querySelector("h2")?.textContent.trim();
            alert(`More details for "${title}" are coming soon!`);
        });

    });

    // ============================
    // Pagination (demo — all ideas are on one page for now)
    // ============================

    const pagination = document.querySelector(".pagination");

    if (pagination) {

        pagination.querySelectorAll("button").forEach(btn => {

            btn.addEventListener("click", () => {

                // only swap the "active" page number, skip the arrow controls
                if (!isNaN(parseInt(btn.textContent, 10))) {
                    pagination.querySelectorAll("button").forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                }

            });

        });

    }

    // ============================
    // Newsletter Signup
    // ============================

    const newsletterBtn = document.getElementById("newsletterBtn");
    const newsletterEmail = document.getElementById("newsletterEmail");
    const newsletterMsg = document.getElementById("newsletterMsg");

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    if (newsletterBtn && newsletterEmail && newsletterMsg) {

        newsletterBtn.addEventListener("click", () => {

            const value = newsletterEmail.value.trim();

            if (!isValidEmail(value)) {

                newsletterEmail.classList.add("shake");
                setTimeout(() => newsletterEmail.classList.remove("shake"), 500);

                newsletterMsg.textContent = "Please enter a valid email address.";
                newsletterMsg.style.color = "#fecaca";
                newsletterMsg.classList.add("show");

            } else {

                newsletterMsg.textContent = "Thanks for subscribing! 🎉";
                newsletterMsg.style.color = "#bbf7d0";
                newsletterMsg.classList.add("show");
                newsletterEmail.value = "";

            }

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