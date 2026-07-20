/* ============================================================
   TO MY BEAUTIFUL PRINCESS — script.js
   Vanilla JS. No dependencies. No build step.
   ============================================================ */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------
     Utility
  ---------------------------------------------------------- */
  function rand(min, max) { return Math.random() * (max - min) + min; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  /* ----------------------------------------------------------
     Image fallback: if an asset is missing, show a soft
     gradient placeholder instead of a broken image icon.
  ---------------------------------------------------------- */
  function setupImageFallbacks() {
    var imgs = document.querySelectorAll("img");
    imgs.forEach(function (img) {
      img.addEventListener("error", function handler() {
        img.removeEventListener("error", handler);
        img.classList.add("img-fallback");
        img.alt = img.alt || "Photo coming soon";
        img.removeAttribute("src");
      });
    });
  }

  /* ----------------------------------------------------------
     PAGE NAVIGATION
  ---------------------------------------------------------- */
  var pages = Array.prototype.slice.call(document.querySelectorAll(".page"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".dot"));

  function goToPage(targetId) {
    var current = document.querySelector(".page.active");
    var target = document.getElementById(targetId);
    if (!target || target === current) return;

    if (current) current.classList.remove("active");
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });

    dots.forEach(function (d) {
      d.classList.toggle("active", d.getAttribute("data-target") === targetId);
    });

    if (targetId === "page2") startApologyReveal();
    if (targetId === "page3") { /* polaroids animate via CSS automatically */ }
  }

  document.querySelectorAll("[data-next]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      spawnRipple(btn, e);
      sparkleBurstAtElement(btn, 10);
      setTimeout(function () { goToPage(btn.getAttribute("data-next")); }, 180);
    });
  });

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      goToPage(dot.getAttribute("data-target"));
    });
  });

  /* ----------------------------------------------------------
     RIPPLE EFFECT for buttons
  ---------------------------------------------------------- */
  function spawnRipple(btn, evt) {
    var rect = btn.getBoundingClientRect();
    var ripple = document.createElement("span");
    ripple.className = "ripple";
    var size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    var x = (evt && evt.clientX ? evt.clientX - rect.left : rect.width / 2) - size / 2;
    var y = (evt && evt.clientY ? evt.clientY - rect.top : rect.height / 2) - size / 2;
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    btn.appendChild(ripple);
    setTimeout(function () { ripple.remove(); }, 650);
  }

  document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) { spawnRipple(btn, e); });
  });

  /* ----------------------------------------------------------
     TYPING ANIMATION — Page 1
  ---------------------------------------------------------- */
  var typingText = document.getElementById("typingText");
  var fullLine = "You deserve love, happiness and every smile in the world…";

  function typeLine() {
    if (prefersReducedMotion) {
      typingText.textContent = fullLine;
      return;
    }
    var i = 0;
    (function tick() {
      if (i <= fullLine.length) {
        typingText.textContent = fullLine.slice(0, i);
        i++;
        setTimeout(tick, 42);
      }
    })();
  }
  // start shortly after page load so the portrait settles first
  setTimeout(typeLine, 900);

  /* ----------------------------------------------------------
     BEGIN OUR STORY button
  ---------------------------------------------------------- */
  var beginBtn = document.getElementById("beginBtn");
  if (beginBtn) {
    beginBtn.addEventListener("click", function (e) {
      sparkleBurstAtElement(beginBtn, 16);
      setTimeout(function () { goToPage("page2"); }, 220);
    });
  }

  /* ----------------------------------------------------------
     APOLOGY LINE-BY-LINE REVEAL + CONFETTI — Page 2
  ---------------------------------------------------------- */
  var apologyStarted = false;
  function startApologyReveal() {
    if (apologyStarted) return;
    apologyStarted = true;
    var lines = document.querySelectorAll("#apologyText .reveal-line");
    lines.forEach(function (line, idx) {
      setTimeout(function () {
        line.classList.add("shown");
      }, prefersReducedMotion ? 0 : idx * 650 + 200);
    });
    spawnConfetti();
  }

  function spawnConfetti() {
    if (prefersReducedMotion) return;
    var layer = document.getElementById("confettiLayer");
    if (!layer) return;
    var colors = ["#ff96c4", "#eec06b", "#aedcff", "#ffd6e8", "#ffffff"];
    var count = 34;
    for (var i = 0; i < count; i++) {
      (function () {
        var piece = document.createElement("span");
        piece.className = "confetti-piece";
        piece.style.left = rand(0, 100) + "%";
        piece.style.background = pick(colors);
        piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
        var duration = rand(4, 8);
        var delay = rand(0, 5);
        piece.style.animationDuration = duration + "s";
        piece.style.animationDelay = delay + "s";
        layer.appendChild(piece);
        setTimeout(function () { piece.remove(); }, (duration + delay) * 1000 + 200);
      })();
    }
    // keep sprinkling gently while on this page
    if (document.getElementById("page2").classList.contains("active")) {
      setTimeout(function () {
        if (document.getElementById("page2").classList.contains("active")) spawnConfetti();
      }, 6000);
    }
  }

  /* ----------------------------------------------------------
     AMBIENT PARTICLES — hearts, sparkles, stars, butterflies
  ---------------------------------------------------------- */
  var particleLayer = document.getElementById("particle-layer");
  var HEART = "❤";
  var SPARKLE = "✦";
  var STAR = "★";
  var BUTTERFLY = "🦋";

  function spawnParticle() {
    if (prefersReducedMotion || !particleLayer) return;
    var kindRoll = Math.random();
    var el = document.createElement("span");
    var startX = rand(0, 100);
    var duration = rand(9, 17);
    var size = rand(0.9, 1.8);
    el.style.left = startX + "vw";
    el.style.bottom = "-40px";
    el.style.fontSize = size + "rem";
    el.style.setProperty("--drift", rand(-60, 60) + "px");

    if (kindRoll < 0.4) {
      el.className = "particle heart";
      el.textContent = HEART;
      el.style.animation = "floatUp " + duration + "s linear forwards";
    } else if (kindRoll < 0.7) {
      el.className = "particle sparkle";
      el.textContent = SPARKLE;
      el.style.animation = "floatUp " + duration + "s linear forwards, twinkleFade 1.6s ease-in-out infinite";
    } else if (kindRoll < 0.88) {
      el.className = "particle star";
      el.textContent = STAR;
      el.style.animation = "floatUp " + duration + "s linear forwards, twinkleFade 2s ease-in-out infinite";
    } else {
      el.className = "particle butterfly";
      el.textContent = BUTTERFLY;
      el.style.animation = "flutter " + (duration - 2) + "s ease-in-out forwards";
    }

    particleLayer.appendChild(el);
    setTimeout(function () { el.remove(); }, duration * 1000 + 300);
  }

  var particleInterval = null;
  function startAmbientParticles() {
    if (prefersReducedMotion) return;
    if (particleInterval) return;
    particleInterval = setInterval(spawnParticle, 900);
    for (var i = 0; i < 6; i++) setTimeout(spawnParticle, i * 300);
  }
  startAmbientParticles();

  /* small celebratory sparkle burst near an element (button presses) */
  function sparkleBurstAtElement(el, count) {
    if (prefersReducedMotion || !particleLayer) return;
    var rect = el.getBoundingClientRect();
    for (var i = 0; i < count; i++) {
      (function () {
        var s = document.createElement("span");
        s.className = "particle sparkle";
        s.textContent = pick([SPARKLE, "✨", STAR]);
        var x = rect.left + rect.width / 2 + rand(-40, 40);
        var y = rect.top + rect.height / 2 + rand(-10, 10);
        s.style.left = x + "px";
        s.style.bottom = (window.innerHeight - y) + "px";
        s.style.fontSize = rand(0.8, 1.4) + "rem";
        s.style.position = "fixed";
        s.style.setProperty("--drift", rand(-50, 50) + "px");
        s.style.animation = "floatUp " + rand(1.2, 2.2) + "s ease-out forwards";
        particleLayer.appendChild(s);
        setTimeout(function () { s.remove(); }, 2400);
      })();
    }
  }

  /* ----------------------------------------------------------
     CURSOR SPARKLE TRAIL (desktop pointer only)
  ---------------------------------------------------------- */
  var cursorSparkle = document.getElementById("cursor-sparkle");
  var lastTrail = 0;
  if (cursorSparkle && !prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", function (e) {
      cursorSparkle.style.left = e.clientX + "px";
      cursorSparkle.style.top = e.clientY + "px";
      cursorSparkle.style.opacity = "1";

      var now = Date.now();
      if (now - lastTrail > 60) {
        lastTrail = now;
        var trail = document.createElement("span");
        trail.textContent = pick(["✦", "·", "✧"]);
        trail.style.position = "fixed";
        trail.style.left = e.clientX + "px";
        trail.style.top = e.clientY + "px";
        trail.style.color = "#eec06b";
        trail.style.fontSize = rand(0.6, 1) + "rem";
        trail.style.pointerEvents = "none";
        trail.style.zIndex = "9998";
        trail.style.transition = "opacity .6s ease, transform .6s ease";
        trail.style.transform = "translate(-50%,-50%)";
        document.body.appendChild(trail);
        requestAnimationFrame(function () {
          trail.style.opacity = "0";
          trail.style.transform = "translate(-50%,-50%) translateY(-14px) scale(0.6)";
        });
        setTimeout(function () { trail.remove(); }, 650);
      }
    });
    window.addEventListener("pointerleave", function () { cursorSparkle.style.opacity = "0"; });
  }

  /* ----------------------------------------------------------
     POLAROID MEMORY WALL — Page 3
  ---------------------------------------------------------- */
  var polaroidItems = Array.prototype.slice.call(document.querySelectorAll(".polaroid-item"));
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var lightboxClose = document.getElementById("lightboxClose");
  var lightboxBackdrop = document.getElementById("lightboxBackdrop");
  var lightboxPrev = document.getElementById("lightboxPrev");
  var lightboxNext = document.getElementById("lightboxNext");
  var currentPhotoIndex = 0;

  function photoData(index) {
    var item = polaroidItems[index];
    var img = item.querySelector(".polaroid-img");
    var caption = item.querySelector(".polaroid-caption").textContent;
    return { src: img.getAttribute("src"), alt: img.getAttribute("alt"), caption: caption, broken: img.classList.contains("img-fallback") };
  }

  function openLightbox(index) {
    currentPhotoIndex = (index + polaroidItems.length) % polaroidItems.length;
    var data = photoData(currentPhotoIndex);
    if (data.broken) {
      lightboxImg.classList.add("img-fallback");
      lightboxImg.removeAttribute("src");
    } else {
      lightboxImg.classList.remove("img-fallback");
      lightboxImg.src = data.src;
    }
    lightboxImg.alt = data.alt;
    lightboxCaption.textContent = data.caption;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  polaroidItems.forEach(function (item, idx) {
    item.addEventListener("click", function () { openLightbox(idx); });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(idx); }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener("click", function () { openLightbox(currentPhotoIndex - 1); });
  if (lightboxNext) lightboxNext.addEventListener("click", function () { openLightbox(currentPhotoIndex + 1); });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") openLightbox(currentPhotoIndex - 1);
    if (e.key === "ArrowRight") openLightbox(currentPhotoIndex + 1);
  });

  /* ----------------------------------------------------------
     THEATRE CURTAIN + VIDEO — Page 4
  ---------------------------------------------------------- */
  var readyBtn = document.getElementById("readyBtn");
  var curtainLeft = document.getElementById("curtainLeft");
  var curtainRight = document.getElementById("curtainRight");
  var videoWrap = document.getElementById("videoWrap");
  var finalVideo = document.getElementById("finalVideo");
  var finaleText = document.getElementById("finaleText");

  if (readyBtn) {
    readyBtn.addEventListener("click", function () {
      readyBtn.style.opacity = "0";
      readyBtn.style.pointerEvents = "none";
      curtainLeft.classList.add("opened");
      curtainRight.classList.add("opened");

      setTimeout(function () {
        videoWrap.classList.add("show");
        var playPromise = finalVideo.play();
        if (playPromise && playPromise.catch) {
          playPromise.catch(function () {
            // autoplay blocked (common on mobile without interaction) — controls remain visible for manual play
          });
        }
      }, prefersReducedMotion ? 100 : 2200);

      setTimeout(function () {
        finaleText.classList.add("show");
      }, prefersReducedMotion ? 400 : 3200);
    });
  }

  /* ----------------------------------------------------------
     FINAL BURST + ENDING MESSAGE
  ---------------------------------------------------------- */
  var memoriesBtn = document.getElementById("memoriesBtn");
  var burstLayer = document.getElementById("burstLayer");
  var endingMessage = document.getElementById("endingMessage");

  function triggerFinalBurst() {
    var pieces = ["❤", "💕", "✦", "🌸", "⭐", "🎀", "💫"];
    var colors = ["#ff96c4", "#eec06b", "#aedcff", "#ffd6e8"];
    var count = prefersReducedMotion ? 0 : 60;
    for (var i = 0; i < count; i++) {
      (function () {
        var p = document.createElement("span");
        p.className = "burst-piece";
        p.textContent = pick(pieces);
        p.style.left = "50%";
        p.style.top = "45%";
        p.style.position = "absolute";
        p.style.fontSize = rand(1, 2.1) + "rem";
        p.style.color = pick(colors);
        var angle = rand(0, Math.PI * 2);
        var dist = rand(120, 420);
        p.style.setProperty("--bx", Math.cos(angle) * dist + "px");
        p.style.setProperty("--by", Math.sin(angle) * dist + "px");
        p.style.setProperty("--br", rand(-180, 180) + "deg");
        p.style.animationDelay = rand(0, 0.3) + "s";
        burstLayer.appendChild(p);
        setTimeout(function () { p.remove(); }, 2200);
      })();
    }
  }

  if (memoriesBtn) {
    memoriesBtn.addEventListener("click", function () {
      triggerFinalBurst();
      memoriesBtn.style.opacity = "0";
      memoriesBtn.style.pointerEvents = "none";
      setTimeout(function () {
        endingMessage.classList.add("show");
      }, prefersReducedMotion ? 100 : 900);
    });
  }

  /* ----------------------------------------------------------
     INIT
  ---------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    setupImageFallbacks();
  });
  // in case DOMContentLoaded already fired (script at end of body)
  setupImageFallbacks();

})();
