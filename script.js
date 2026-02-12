// INTRO ANIMATION
const intro = document.getElementById("intro");
const introText = document.getElementById("intro-text");
const introSubtitle = document.getElementById("intro-subtitle");
const main = document.getElementById("main");

// Add animation class to intro elements
introText.style.animation = "slideInDown 0.8s ease-out";

// Typewriter effect for subtitle
const words = ["Experience Premium services", "Build Your Digital Future"];
let wordIndex = 0;
let charIndex = 0;

function typeWriter() {
  const currentWord = words[wordIndex];
  if (charIndex < currentWord.length) {
    introSubtitle.textContent += currentWord[charIndex];
    charIndex++;
    setTimeout(typeWriter, 50);
  } else {
    setTimeout(() => {
      // Erase the text
      eraseText();
    }, 2000);
  }
}

function eraseText() {
  if (charIndex > 0) {
    introSubtitle.textContent = introSubtitle.textContent.slice(0, -1);
    charIndex--;
    setTimeout(eraseText, 30);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeWriter, 500);
  }
}

// Start typewriter after intro text appears
setTimeout(() => {
  typeWriter();
}, 500);

// Hide intro after 5.5 seconds and enable page scrolling
setTimeout(() => {
  intro.style.animation = "fadeOut 1s ease-out forwards";
  setTimeout(() => {
    intro.classList.add("hide");
    main.classList.add("visible");
    document.body.classList.add("intro-complete");
  }, 1000);
}, 5500);

// HAMBURGER MENU
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", ()=>{
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("mobile");
  navMenu.classList.toggle("active");
});

// Close menu when link is clicked
document.querySelectorAll("nav a").forEach(link=>{
  link.addEventListener("click", ()=>{
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    navMenu.classList.remove("mobile");
  });
});

// SMOOTH SCROLL
document.querySelectorAll("nav a").forEach(link=>{
  link.addEventListener("click", e=>{
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      .scrollIntoView({behavior:"smooth"});
  });
});

// FADE IN SECTIONS
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity=1;
      entry.target.style.transform="translateY(0)";
    }
  });
});
sections.forEach(sec=>{
  sec.style.opacity=0;
  sec.style.transform="translateY(40px)";
  observer.observe(sec);
});

// PORTFOLIO SLIDER
let currentSlide=0;
const slides=document.querySelectorAll(".slide");
function showSlide(i){
  slides.forEach(s=>s.style.display="none");
  slides[i].style.display="block";
}
function nextSlide(){ currentSlide=(currentSlide+1)%slides.length; showSlide(currentSlide);}
function prevSlide(){ currentSlide=(currentSlide-1+slides.length)%slides.length; showSlide(currentSlide);}
showSlide(currentSlide);
setInterval(nextSlide,4000);

// PROCESS SLIDER
let currentProcess=0;
const processSlides=document.querySelectorAll(".process-slide");
const processContainer=document.querySelector(".process-slides");
function showProcess(i){
  const w=processSlides[0].offsetWidth+20;
  processContainer.style.transform=`translateX(-${i*w}px)`;
}
function nextProcess(){ currentProcess=(currentProcess+1)%processSlides.length; showProcess(currentProcess);}
function prevProcess(){ currentProcess=(currentProcess-1+processSlides.length)%processSlides.length; showProcess(currentProcess);}
setInterval(nextProcess,4000);

// =========================================================
// SECURITY FUNCTIONS
// =========================================================

// EmailJS Configuration
emailjs.init("IA1BLdP_J7dT0XkHc"); // Public key for web3forms

// CONTACT FORM - SIMPLE & WORKING
const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");
const submitBtn = document.getElementById("submitBtn");
const whatsappLink = document.getElementById("whatsappLink");

// Hide phone number - only reveal on click via JavaScript
if(whatsappLink) {
  whatsappLink.addEventListener("click", (e) => {
    e.preventDefault();
    const phoneNum = "2347039074576";
    window.open(`https://wa.me/+${phoneNum}`, "_blank");
  });
}

if(contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Show success message immediately
    if(successMessage) {
      successMessage.style.display = "block";
      successMessage.classList.add("show");
    }
    contactForm.style.display = "none";
    submitBtn.disabled = true;
    
    try {
      // Send form data to Formspree
      const formData = new FormData(contactForm);
      await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      console.log("Email sent successfully!");
    } catch(error) {
      console.error("Error sending email:", error);
    }
  });
}

// EMAIL FORM
const contactFormEmail=document.getElementById("contact-form");
if(contactFormEmail) {
  contactFormEmail.addEventListener("submit",function(e){
    e.preventDefault();
    emailjs.sendForm("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",this)
    .then(()=>{ alert("Message sent successfully!"); contactFormEmail.reset(); },
          ()=>{ alert("Failed to send message"); });
  });
}