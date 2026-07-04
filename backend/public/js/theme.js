const toggleBtn = document.getElementById("themeToggle");
console.log("Theme JS Loaded");
const body = document.body;

// load saved theme
if(localStorage.getItem("theme") === "dark"){
    body.classList.add("dark");
    toggleBtn.innerHTML = "☀️";
}

toggleBtn.addEventListener("click", () => {

    body.classList.toggle("dark");

    if(body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
        toggleBtn.innerHTML = "☀️";
    } else {
        localStorage.setItem("theme","light");
        toggleBtn.innerHTML = "🌙";
    }

});