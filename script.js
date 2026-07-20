const WA_NUMBER = "258875317179";
  const DEFAULT_MSG = "Olá! Vi o vosso website da SBJ e gostaria de pedir uma cotação.";

  function waLink(msg){
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
  }
  function waService(serviceName){
    const msg = "Olá! Gostaria de pedir uma cotação para: " + serviceName + ".";
    window.open(waLink(msg), "_blank");
  }

  // wire up all default WhatsApp CTAs
  ["waHeaderBtn","waHeroBtn","waPanelBtn","waContactBtn","waFloat"].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.href = waLink(DEFAULT_MSG);
  });
  const waFooterLink = document.querySelector("#waFooter a");
  if(waFooterLink) waFooterLink.href = waLink(DEFAULT_MSG);

  // mobile nav
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");
  burger.addEventListener("click", ()=>{
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click", ()=>navLinks.classList.remove("open")));

  // live clock (Maputo OSD-style)
  const clockEl = document.getElementById("liveClock");
  function tick(){
    const now = new Date();
    const d = now.toLocaleDateString("pt-PT", { day:"2-digit", month:"2-digit", year:"numeric" });
    const t = now.toLocaleTimeString("pt-PT", { hour:"2-digit", minute:"2-digit", second:"2-digit" });
    clockEl.textContent = "MAPUTO, MOÇAMBIQUE · " + d + " " + t;
  }
  tick();
  setInterval(tick, 1000);

  // scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.12 });
  revealEls.forEach(el=>io.observe(el));

  // header shadow / call link visibility on scroll (small nicety)
  const header = document.querySelector("header");
  window.addEventListener("scroll", ()=>{
    header.style.borderBottomColor = window.scrollY > 20 ? "var(--line)" : "transparent";
  });