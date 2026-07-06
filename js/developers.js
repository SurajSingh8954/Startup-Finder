// ==========================================
// StartupFinder - developers.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const cards = Array.from(document.querySelectorAll(".developer-card"));

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
        ".filters button, .developer-card button, .pagination button, .search-box button, .join-btn"
    ).forEach(attachRipple);

    // ============================
    // Search + Category Filtering
    // ============================

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const filterBar = document.getElementById("filterBar");
    const noResults = document.getElementById("noResults");

    let activeFilter = "all";

    function applyFilters() {

        const query = (searchInput?.value || "").trim().toLowerCase();
        let visibleCount = 0;

        cards.forEach(card => {

            const category = card.dataset.category || "";
            const name = card.querySelector("h2")?.textContent.trim().toLowerCase() || "";
            const role = card.querySelector(".role")?.textContent.trim().toLowerCase() || "";
            const skills = card.querySelector(".skills")?.textContent.trim().toLowerCase() || "";

            const matchesFilter = activeFilter === "all" || category === activeFilter;
            const matchesQuery =
                query === "" ||
                name.includes(query) ||
                role.includes(query) ||
                skills.includes(query);

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
        searchInput.addEventListener("input", applyFilters);
    }

    if (filterBar) {

        filterBar.querySelectorAll("button").forEach(btn => {

            btn.addEventListener("click", () => {

                filterBar.querySelectorAll("button").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                activeFilter = btn.dataset.filter || "all";
                applyFilters();

            });

        });

    }

    // ============================
    // View Profile
    // ============================

    cards.forEach(card => {

        const btn = card.querySelector("button");
        if (!btn) return;

        btn.addEventListener("click", () => {

            const name = card.querySelector("h2")?.textContent.trim();
            const role = card.querySelector(".role")?.textContent.trim();
            const skills = card.querySelector(".skills")?.textContent.trim();

            alert(
`👨‍💻 ${name}

Role: ${role}
Skills: ${skills}

Full profile pages are coming soon!`
            );

        });

    });

    // ============================
    // Pagination
    // ============================

    const pagination = document.querySelector(".pagination");

    if (pagination) {

        pagination.querySelectorAll("button").forEach(btn => {

            btn.addEventListener("click", () => {

                if (!isNaN(parseInt(btn.textContent, 10))) {
                    pagination.querySelectorAll("button").forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                }

            });

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