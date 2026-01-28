// INTRO
const intro = document.getElementById("intro");
const introText = document.getElementById("intro-text");

setTimeout(() => introText.textContent = "Experience Premium services", 2000);
setTimeout(() => intro.classList.add("hide"), 4000);

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

// EMAIL FORM
const contactForm=document.getElementById("contact-form");
contactForm.addEventListener("submit",function(e){
  e.preventDefault();
  emailjs.sendForm("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",this)
  .then(()=>{ alert("Message sent successfully!"); contactForm.reset(); },
        ()=>{ alert("Failed to send message"); });
});
