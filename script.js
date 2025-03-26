document.addEventListener("DOMContentLoaded", function () {
    const svgObject = document.getElementById("eye-svg");

    if (!svgObject) {
        console.error("SVG object not found in HTML.");
        return;
    }

    svgObject.addEventListener("load", function () {
        const svgDoc = svgObject.contentDocument || svgObject.getSVGDocument();
        
        if (!svgDoc) {
            console.error("SVG failed to load.");
            return;
        }

        // Select the pupils
        const pupilLeft = svgDoc.querySelector("ellipse#pupil-left");
        const pupilRight = svgDoc.querySelector("ellipse#pupil-right");

        // Debugging: Check if pupils are found
        if (!pupilLeft || !pupilRight) {
            console.error("Pupils not found inside SVG. Make sure they are <ellipse> elements.");
            console.log("SVG Content:", svgDoc);
            return;
        } else {
            console.log("✅ Pupils found! Ready for movement.");
        }

        document.addEventListener("mousemove", function (event) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            movePupil(pupilLeft, mouseX, mouseY);
            movePupil(pupilRight, mouseX, mouseY);
        });

        function movePupil(pupil, mouseX, mouseY) {
            if (!pupil) return;
            
            const pupilRect = pupil.getBoundingClientRect();
            console.log("Pupil position:", pupilRect);

            const centerX = pupilRect.left + pupilRect.width / 2;
            const centerY = pupilRect.top + pupilRect.height / 2;

            const deltaX = mouseX - centerX;
            const deltaY = mouseY - centerY;

            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
            const maxDistance = 10; // Limit movement range

            const angle = Math.atan2(deltaY, deltaX);
            const moveX = Math.cos(angle) * Math.min(distance, maxDistance);
            const moveY = Math.sin(angle) * Math.min(distance, maxDistance);

            pupil.setAttribute("transform", `translate(${moveX}, ${moveY})`);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const aboutText = document.getElementById("aboutText");
    const text = aboutText.innerText;
    aboutText.innerHTML = ""; // Clear existing text

    // Wrap each letter inside a <span>
    text.split(/(\s+)/).forEach(letter => {
        const span = document.createElement("span");
        span.innerText = letter;
        
        // Mark spaces with a class so they don’t move
        if (letter === " ") {
            span.classList.add("space");
        }
    
        aboutText.appendChild(span);
    });
    

    const letters = document.querySelectorAll(".about-text span");

    letters.forEach(letter => {
        letter.addEventListener("mousemove", function (event) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            const letterRect = letter.getBoundingClientRect();

            const deltaX = (letterRect.left + letterRect.width / 2) - mouseX;
            const deltaY = (letterRect.top + letterRect.height / 2) - mouseY;

            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
            const maxMove = Math.min(10, distance); // Limits how far letters move

            const moveX = (deltaX / distance) * maxMove;
            const moveY = (deltaY / distance) * maxMove;

            letter.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        letter.addEventListener("mouseleave", function () {
            letter.style.transform = "translate(0, 0)"; // Reset position when mouse leaves
        });
    });
});



/** EDUCATION ND SKILLS */
document.addEventListener("DOMContentLoaded", function () {
    const eduTab = document.getElementById("edu-tab");
    const skillsTab = document.getElementById("skills-tab");
    const eduContent = document.getElementById("education-content");
    const skillsContent = document.getElementById("skills-content");

    function switchTab(selectedTab) {
        if (selectedTab === "education") {
            eduContent.classList.add("active");
            skillsContent.classList.remove("active");
            eduTab.classList.add("active");
            skillsTab.classList.remove("active");
        } else {
            eduContent.classList.remove("active");
            skillsContent.classList.add("active");
            eduTab.classList.remove("active");
            skillsTab.classList.add("active");
        }
    }

    eduTab.addEventListener("click", () => switchTab("education"));
    skillsTab.addEventListener("click", () => switchTab("skills"));
});

/** EXTRA FEATURES */
// Typing Animation for Hero Section
const heroText = document.querySelector(".hero-text p");
const phrases = ["Creative Developer", "Web & Animation", "Interactive Designer"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        heroText.textContent = currentPhrase.substring(0, charIndex--);
    } else {
        heroText.textContent = currentPhrase.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 1000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(typeEffect, isDeleting ? 100 : 150);
}

typeEffect();

// Back to Top Button
const backToTopButton = document.createElement("button");
backToTopButton.textContent = "🔝";
backToTopButton.id = "back-to-top";
backToTopButton.style.position = "fixed";
backToTopButton.style.bottom = "20px";
backToTopButton.style.right = "20px";
backToTopButton.style.display = "none";
document.body.appendChild(backToTopButton);

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/*** Artworkkk */
document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 2,  // Shows 2 artworks at a time
        spaceBetween: 20,  // Space between images
        loop: true,        // Infinite scrolling
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 2500,   // Auto-slide every 2.5 seconds
            disableOnInteraction: false,
        },
    });
});
 

/********* CONTACT FORM */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        // Replace this with your Google Form URL
        const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfn9cWagnPQ9R22TpwiCfztkcT4QYUXibqqp9iZsx49WibpXQ/viewform?usp=pp_url";

        const formUrl = `${googleFormUrl}?entry.1234567890=${encodeURIComponent(name)}&entry.0987654321=${encodeURIComponent(email)}&entry.1122334455=${encodeURIComponent(message)}`;

        fetch(formUrl, { method: "POST", mode: "no-cors" })
            .then(() => {
                status.textContent = "Message sent successfully!";
                form.reset();
            })
            .catch(() => {
                status.textContent = "Oops! Something went wrong. Try again.";
            });
    });
});











