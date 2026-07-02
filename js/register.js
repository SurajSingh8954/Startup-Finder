// ==========================================
// StartupFinder - Register Page JavaScript
// File: js/register.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm");

    const fullName = document.getElementById("fullname");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const role = document.getElementById("role");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const profileImage = document.getElementById("profileImage");

    // ==========================
    // Form Submit
    // ==========================

    form.addEventListener("submit", function(e){

        e.preventDefault();

        if(fullName.value.trim()===""){
            alert("Please enter your full name.");
            fullName.focus();
            return;
        }

        if(username.value.trim().length < 3){
            alert("Username must contain at least 3 characters.");
            username.focus();
            return;
        }

        if(!validateEmail(email.value)){
            alert("Please enter a valid email.");
            email.focus();
            return;
        }

        if(!validatePhone(phone.value)){
            alert("Please enter a valid 10-digit phone number.");
            phone.focus();
            return;
        }

        if(role.value===""){
            alert("Please select your role.");
            return;
        }

        if(password.value.length < 6){
            alert("Password must be at least 6 characters.");
            password.focus();
            return;
        }

        if(password.value !== confirmPassword.value){
            alert("Passwords do not match.");
            confirmPassword.focus();
            return;
        }

        // Save Demo User

        const user = {

            fullname: fullName.value,
            username: username.value,
            email: email.value,
            phone: phone.value,
            role: role.value

        };

        localStorage.setItem("startupUser", JSON.stringify(user));

        alert("🎉 Registration Successful!");

        window.location.href = "login.html";

    });

    // ==========================
    // Email Validation
    // ==========================

    function validateEmail(email){

        const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return pattern.test(email);

    }

    // ==========================
    // Phone Validation
    // ==========================

    function validatePhone(phone){

        const pattern = /^[0-9]{10}$/;

        return pattern.test(phone);

    }

    // ==========================
    // Password Strength
    // ==========================

    password.addEventListener("keyup", ()=>{

        let strength = "";

        if(password.value.length < 6){

            strength = "Weak";

        }else if(password.value.length < 10){

            strength = "Medium";

        }else{

            strength = "Strong";

        }

        console.log("Password Strength:", strength);

    });

    // ==========================
    // Confirm Password
    // ==========================

    confirmPassword.addEventListener("keyup", ()=>{

        if(confirmPassword.value==="") return;

        if(password.value===confirmPassword.value){

            confirmPassword.style.border =
            "2px solid green";

        }else{

            confirmPassword.style.border =
            "2px solid red";

        }

    });

    // ==========================
    // Image Preview
    // ==========================

    profileImage.addEventListener("change",(e)=>{

        const file = e.target.files[0];

        if(!file) return;

        const reader = new FileReader();

        reader.onload = function(event){

            let old = document.getElementById("preview");

            if(old) old.remove();

            const img = document.createElement("img");

            img.src = event.target.result;
            img.id = "preview";

            img.style.width="100px";
            img.style.height="100px";
            img.style.objectFit="cover";
            img.style.borderRadius="50%";
            img.style.marginTop="15px";
            img.style.display="block";

            profileImage.parentElement.appendChild(img);

        }

        reader.readAsDataURL(file);

    });

    // ==========================
    // Input Focus Effect
    // ==========================

    const inputs =
    document.querySelectorAll("input, textarea, select");

    inputs.forEach(input=>{

        input.addEventListener("focus",()=>{

            input.style.boxShadow =
            "0 0 12px rgba(79,70,229,.3)";

        });

        input.addEventListener("blur",()=>{

            input.style.boxShadow = "none";

        });

    });

});