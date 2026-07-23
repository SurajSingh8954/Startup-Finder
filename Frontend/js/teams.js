// ==========================================
// StartupFinder - teams.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // Elements
    // ===============================

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    const cards = document.querySelectorAll(".team-card");
    const filterButtons = document.querySelectorAll(".filters button");

    // ===============================
    // Search Function
    // ===============================

    function searchTeams() {

        const keyword = searchInput.value.toLowerCase();

        cards.forEach(card => {

            const title = card.querySelector("h2").textContent.toLowerCase();
            const category = card.querySelector(".category").textContent.toLowerCase();
            const desc = card.querySelector("p").textContent.toLowerCase();
            const roles = card.querySelector(".roles").textContent.toLowerCase();

            if (
                title.includes(keyword) ||
                category.includes(keyword) ||
                desc.includes(keyword) ||
                roles.includes(keyword)
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    }

    if (searchBtn) {
        searchBtn.addEventListener("click", searchTeams);
    }

    if (searchInput) {
        searchInput.addEventListener("keyup", searchTeams);
    }

    // ===============================
    // Filter Buttons
    // ===============================

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter = button.textContent.toLowerCase();

            cards.forEach(card => {

                const category =
                    card.querySelector(".category")
                        .textContent
                        .toLowerCase();

                if (filter === "all" || category.includes(filter)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }

            });

        });

    });

    //Nav buttob
    const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("open")) {
            icon.classList.replace("fa-bars", "fa-xmark");
        } else {
            icon.classList.replace("fa-xmark", "fa-bars");
        }
    });
}

    // ===============================
    // Join Button Logic
    // ===============================

    const joinButtons =
        document.querySelectorAll(".team-card button");

    joinButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".team-card");

            const teamName =
                card.querySelector("h2").textContent;

            const status =
                card.querySelector(".status").textContent.toLowerCase();

            if (button.disabled || status.includes("full")) {

                alert("❌ This team is already full.");

                return;

            }

            alert(`🚀 Join Request Sent to "${teamName}"!`);

            button.textContent = "Requested";

            button.style.background = "#16a34a";

            button.disabled = true;

        });

    });

    // ===============================
    // Pagination (UI only demo)
    // ===============================

    const pageButtons =
        document.querySelectorAll(".pagination button");

    pageButtons.forEach(button => {

        button.addEventListener("click", () => {

            pageButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            const text = button.innerText;

            if (text !== "«" && text !== "»") {
                button.classList.add("active");
            }

        });

    });

    // ===============================
    // Scroll Animation
    // ===============================

    const observer =
        new IntersectionObserver(entries => {

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
        card.style.transition = ".6s ease";

        observer.observe(card);

    });

});