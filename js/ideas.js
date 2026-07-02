// =======================================
// StartupFinder - ideas.js
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Search Functionality
    // ==========================

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const cards = document.querySelectorAll(".idea-card");

    function searchIdeas() {

        const keyword = searchInput.value.toLowerCase();

        cards.forEach(card => {

            const title = card.querySelector("h2").textContent.toLowerCase();
            const description = card.querySelector("p").textContent.toLowerCase();
            const tag = card.querySelector(".tag").textContent.toLowerCase();

            if (
                title.includes(keyword) ||
                description.includes(keyword) ||
                tag.includes(keyword)
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    }

    if (searchBtn) {
        searchBtn.addEventListener("click", searchIdeas);
    }

    if (searchInput) {
        searchInput.addEventListener("keyup", searchIdeas);
    }

    // ==========================
    // Category Filter
    // ==========================

    const filterButtons = document.querySelectorAll(".filters button");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const category = button.textContent.toLowerCase();

            cards.forEach(card => {

                const tag = card.querySelector(".tag")
                    .textContent.toLowerCase();

                if (category === "all" || tag === category) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });

    // ==========================
    // View Details Button
    // ==========================

    const detailButtons =
        document.querySelectorAll(".idea-card button");

    detailButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card = button.parentElement;

            const title =
                card.querySelector("h2").textContent;

            const description =
                card.querySelector("p").textContent;

            alert(
                "🚀 " + title +
                "\n\n" +
                description +
                "\n\nJoin this startup after logging in!"
            );

        });

    });

    // ==========================
    // Newsletter Subscribe
    // ==========================

    const subscribeBtn =
        document.querySelector(".newsletter button");

    const emailInput =
        document.querySelector(".newsletter input");

    if (subscribeBtn) {

        subscribeBtn.addEventListener("click", () => {

            const email = emailInput.value.trim();

            const pattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email === "") {

                alert("Please enter your email.");

                return;

            }

            if (!pattern.test(email)) {

                alert("Please enter a valid email.");

                return;

            }

            alert("🎉 Thanks for subscribing!");

            emailInput.value = "";

        });

    }

    // ==========================
    // Scroll Reveal Animation
    // ==========================

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
        card.style.transition = ".6s";

        observer.observe(card);

    });

});