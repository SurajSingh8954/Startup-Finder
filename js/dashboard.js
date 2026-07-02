document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".actions button");

    buttons.forEach(btn => {

        btn.addEventListener("click", () => {

            alert("🚀 Feature will be connected with backend soon!");

        });

    });

});

document.querySelector(".profile-card button")
.addEventListener("click", () => {
    alert("Profile editor will open soon 🚀");
});