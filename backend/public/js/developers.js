// ==========================================
// StartupFinder - developers.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // Elements
    // ===============================

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    const cards = document.querySelectorAll(".developer-card");
    const filterButtons = document.querySelectorAll(".filters button");

    // ===============================
    // Search Function
    // ===============================

    function searchDeveloper() {

        const keyword = searchInput.value.toLowerCase();

        cards.forEach(card => {

            const name = card.querySelector("h2").textContent.toLowerCase();

            const role = card.querySelector(".role").textContent.toLowerCase();

            const skills = card.querySelector(".skills").textContent.toLowerCase();

            if (
                name.includes(keyword) ||
                role.includes(keyword) ||
                skills.includes(keyword)
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    }

    if (searchBtn) {

        searchBtn.addEventListener("click", searchDeveloper);

    }

    if (searchInput) {

        searchInput.addEventListener("keyup", searchDeveloper);

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

            const category =
                button.textContent.toLowerCase();

            cards.forEach(card => {

                const role =
                    card.querySelector(".role")
                    .textContent
                    .toLowerCase();

                if (
                    category === "all" ||
                    role.includes(category)
                ) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });

    // ===============================
    // View Profile
    // ===============================

    const profileButtons =
        document.querySelectorAll(".developer-card button");

    profileButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card = button.parentElement;

            const name =
                card.querySelector("h2").textContent;

            const role =
                card.querySelector(".role").textContent;

            const skills =
                card.querySelector(".skills").textContent;

            alert(
`👨‍💻 ${name}

Role:
${role}

Skills:
${skills}

This feature will open a complete profile after backend integration.`
            );

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
                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        });

    cards.forEach(card => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(40px)";

        card.style.transition =
            ".6s ease";

        observer.observe(card);

    });

    // ===============================
    // Join Button
    // ===============================

    const joinBtn =
        document.querySelector(".join-btn");

    if (joinBtn) {

        joinBtn.addEventListener("click", () => {

            console.log("Redirecting to Register Page...");

        });

    }

    // ===============================
    // Pagination Demo
    // ===============================

    const pageButtons =
        document.querySelectorAll(".pagination button");

    pageButtons.forEach(button => {

        button.addEventListener("click", () => {

            pageButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            if (
                button.innerText !== "«" &&
                button.innerText !== "»"
            ) {

                button.classList.add("active");

            }

        });

    });

});