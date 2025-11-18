// ==============================
// 1️⃣ Program Cards Dynamic Rendering
// ==============================
const programs = [
    {
        title: "Digital Skills",
        description: "Learn HTML, CSS, JS and build projects like your own website or portfolio.",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Soft Skills",
        description: "Improve communication, teamwork, leadership, and workplace etiquette.",
        image: "https://images.unsplash.com/photo-1603574670812-d24560880210?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Career Readiness",
        description: "Craft CVs, practice interviews, get mentorship, and access internship opportunities.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Entrepreneurship & Innovation",
        description: "Learn business planning, pitching ideas, and turning your vision into reality.",
        image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80"
    }
];

const container = document.querySelector(".program-grid");
if(container){
    programs.forEach(program => {
        const card = document.createElement("div");
        card.classList.add("program-card");
        card.innerHTML = `
            <img src="${program.image}" alt="${program.title}">
            <h3>${program.title}</h3>
            <p>${program.description}</p>
        `;
        container.appendChild(card);
    });
}

// ==============================
// 2️⃣ Program Card Hover Effects
// ==============================
const cards = document.querySelectorAll(".program-card");
cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.05)";
        card.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
        card.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
    });
});

// ==============================
// 3️⃣ Program Search/Filter
// ==============================
const searchInput = document.getElementById("programSearch");
if(searchInput){
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        cards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            card.style.display = title.includes(query) ? "block" : "none";
        });
    });
}

// ==============================
// 4️⃣ Lightbox Gallery for Images
// ==============================
const galleryImages = document.querySelectorAll(".program-card img");
galleryImages.forEach(img => {
    img.addEventListener("click", () => {
        const lightbox = document.createElement("div");
        lightbox.classList.add("lightbox");
        lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
        document.body.appendChild(lightbox);

        lightbox.addEventListener("click", () => {
            document.body.removeChild(lightbox);
        });
    });
});

// ==============================
// 5️⃣ Form Validation & Thank You Messages
// ==============================
function handleForm(formId, thankYouId){
    const form = document.getElementById(formId);
    const thankYou = document.getElementById(thankYouId);

    if(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.querySelector('[name="name"]').value.trim();
            const email = form.querySelector('[name="email"]').value.trim();
            const subject = form.querySelector('[name="subject"]')?.value.trim() || "";
            const message = form.querySelector('[name="message"]').value.trim();

            if(!name || !email || !message || (form.querySelector('[name="subject"]') && !subject)){
                alert("Please fill out all required fields.");
                return;
            }

            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if(!email.match(emailPattern)){
                alert("Please enter a valid email address.");
                return;
            }

            form.style.display = 'none';
            if(thankYou) thankYou.style.display = 'block';

            let submissions = JSON.parse(localStorage.getItem("submissions") || "[]");
            submissions.push({name, email, subject, message});
            localStorage.setItem("submissions", JSON.stringify(submissions));
        });
    }
}
handleForm('enquiryForm', 'thankYouMessage');
handleForm('contactForm', 'thankYouMessage');

// ==============================
// 6️⃣ Scroll Fade-In Animations
// ==============================
const fadeElements = document.querySelectorAll('.program-card, .hero-content, .cta, section h2, section p');
function fadeInOnScroll(){
    const windowBottom = window.innerHeight + window.scrollY;
    fadeElements.forEach(el => {
        if(windowBottom > el.offsetTop + 100){
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }
    });
}
window.addEventListener('scroll', fadeInOnScroll);

// ==============================
// 7️⃣ Hero Section Typing Animation
// ==============================
const heroText = document.getElementById('heroText');
const messages = [
    "Empowering South Africa's Youth",
    "Learn. Grow. Achieve.",
    "Your Future Starts Today!"
];
let msgIndex = 0;
let charIndex = 0;
let typingSpeed = 100;

function typeMessage(){
    if(heroText){
        if(charIndex < messages[msgIndex].length){
            heroText.textContent += messages[msgIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeMessage, typingSpeed);
        } else {
            setTimeout(eraseMessage, 2000);
        }
    }
}
function eraseMessage(){
    if(heroText){
        if(charIndex > 0){
            heroText.textContent = messages[msgIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseMessage, 50);
        } else {
            msgIndex = (msgIndex + 1) % messages.length;
            setTimeout(typeMessage, 500);
        }
    }
}
typeMessage();

// ==============================
// 8️⃣ Interactive Map Zoom Buttons
// ==============================
const mapFrame = document.querySelector('iframe');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');

let zoomLevel = 14;

function updateMapZoom(){
    const baseURL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.708283058519!2d28.058683075564263!3d-26.10756646336871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1";
    if(mapFrame) mapFrame.src = `${baseURL}&z=${zoomLevel}`;
}

if(zoomInBtn && zoomOutBtn){
    zoomInBtn.addEventListener('click', () => {
        zoomLevel = Math.min(zoomLevel + 1, 21);
        updateMapZoom();
    });
    zoomOutBtn.addEventListener('click', () => {
        zoomLevel = Math.max(zoomLevel - 1, 0);
        updateMapZoom();
    });
}
