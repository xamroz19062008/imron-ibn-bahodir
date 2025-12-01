document.getElementById("year").textContent = new Date().getFullYear();

function scrollToSection(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openPhone() {
  window.location.href = "tel:+998973844903";
}

function openWhatsApp() {
  var phone = "998973844903";
  var text = encodeURIComponent(
    "Здравствуйте! Интересует оптовая поставка нетканого полотна."
  );
  window.open("https://wa.me/" + phone + "?text=" + text, "_blank");
}

var header = document.querySelector("header");
window.addEventListener("scroll", function () {
  if (window.scrollY > 30) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

var burger = document.getElementById("burger");
var navMobile = document.getElementById("navMobile");

if (burger && navMobile) {
  navMobile.style.display = "none";
  burger.classList.remove("open");

  window.addEventListener("load", function () {
    navMobile.style.display = "none";
    burger.classList.remove("open");
  });

  burger.addEventListener("click", function () {
    var isOpen = burger.classList.toggle("open");
    navMobile.style.display = isOpen ? "flex" : "none";
  });

  navMobile.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      burger.classList.remove("open");
      navMobile.style.display = "none";
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 960) {
      navMobile.style.display = "none";
      burger.classList.remove("open");
    }
  });
}

var revealEls = document.querySelectorAll(".reveal");
var observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(function (el) {
  observer.observe(el);
});

var statCards = document.querySelectorAll(".stat-value");
var countersObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-counter"), 10);
        if (!target || el.dataset.animated) return;
        el.dataset.animated = "true";
        var current = 0;
        var duration = 1500;
        var start = performance.now();

        function animateCounter(time) {
          var progress = Math.min((time - start) / duration, 1);
          current = Math.floor(target * progress);
          if (target >= 100000)
            el.textContent = current.toLocaleString("ru-RU") + "+";
          else el.textContent = current + "+";
          if (progress < 1) requestAnimationFrame(animateCounter);
        }

        requestAnimationFrame(animateCounter);
        countersObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.4 }
);
statCards.forEach(function (card) {
  countersObserver.observe(card);
});

function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;

  const payload = {
    name: form.querySelector('input[placeholder^="Например"]').value.trim(),
    company: form
      .querySelector('input[placeholder="Название компании"]')
      .value.trim(),
    phone: form.querySelector('input[type="tel"]').value.trim(),
    email: form.querySelector('input[type="email"]').value.trim(),
    volume: form.querySelectorAll("select")[0].value,
    usage: form.querySelectorAll("select")[1].value,
    comment: form.querySelector("textarea").value.trim(),
  };

  fetch("https://imron-ibn-bahodir-backend.onrender.com/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("Спасибо, заявка отправлена!");
        form.reset();
      } else {
        alert("Ошибка: " + (data.message || "Попробуйте позже"));
      }
    })
    .catch(() => {
      alert("Системная ошибка");
    });
}

var form = document.querySelector(".contact-form");
if (form) form.addEventListener("submit", handleFormSubmit);

function addTiltEffect(selector) {
  if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches)
    return;
  var cards = document.querySelectorAll(selector);
  cards.forEach(function (card) {
    var rect;
    card.addEventListener("mouseenter", function () {
      rect = card.getBoundingClientRect();
      card.style.transition =
        "transform 0.18s ease-out, box-shadow 0.18s ease-out";
    });
    card.addEventListener("mousemove", function (e) {
      if (!rect) rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var midX = rect.width / 2;
      var midY = rect.height / 2;
      var rotateX = ((y - midY) / midY) * 6;
      var rotateY = ((x - midX) / midX) * -6;
      card.style.transform =
        "perspective(800px) rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg) translateY(-2px)";
      card.style.boxShadow = "0 18px 45px rgba(15,23,42,0.9)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.transition =
        "transform 0.25s ease-out, box-shadow 0.25s ease-out";
      card.style.transform = "";
      card.style.boxShadow = "";
      rect = null;
    });
  });
}
addTiltEffect(".fabric-3d");
addTiltEffect(".product-card");
addTiltEffect(".why-card");
addTiltEffect(".industry-card");
addTiltEffect(".testimonial-card");
addTiltEffect(".process-step");
addTiltEffect(".card");

var mainCta = document.querySelector(".hero-ctas .btn.btn-primary");
if (mainCta) {
  setInterval(function () {
    if (document.hidden) return;
    mainCta.style.transition =
      "transform 0.7s ease-out, box-shadow 0.7s ease-out";
    mainCta.style.transform = "scale(1.03) translateY(-2px)";
    mainCta.style.boxShadow = "0 20px 50px rgba(56,189,248,0.55)";
    setTimeout(function () {
      mainCta.style.transform = "";
      mainCta.style.boxShadow = "";
    }, 700);
  }, 7000);
}

var anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
anchorLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    var href = link.getAttribute("href");
    if (!href || href.length < 2) return;
    var id = href.slice(1);
    var target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

var highlightElements = document.querySelectorAll(
  ".product-card, .why-card, .industry-card, .testimonial-card"
);
if (highlightElements.length > 0) {
  var hiIndex = 0;
  var prevEl = null;
  function cycleHighlight() {
    if (document.hidden) {
      setTimeout(cycleHighlight, 3000);
      return;
    }
    if (prevEl) {
      prevEl.style.boxShadow = "";
      prevEl.style.transform = prevEl.dataset.baseTransform || "";
    }
    var el = highlightElements[hiIndex];
    el.dataset.baseTransform =
      el.dataset.baseTransform || el.style.transform || "";
    el.style.transition = "transform 0.5s ease-out, box-shadow 0.5s ease-out";
    el.style.transform = "translateY(-4px) scale(1.01)";
    el.style.boxShadow = "0 22px 60px rgba(56,189,248,0.35)";
    prevEl = el;
    hiIndex = (hiIndex + 1) % highlightElements.length;
    setTimeout(cycleHighlight, 3500);
  }
  setTimeout(cycleHighlight, 2500);
}

function updateMapRoutes() {
  var canvas = document.querySelector(".hero-map-canvas");
  if (!canvas) return;

  var canvasRect = canvas.getBoundingClientRect();

  var points = {};
  canvas.querySelectorAll(".map-point").forEach(function (p) {
    var country = p.dataset.country;
    if (!country) return;
    var r = p.getBoundingClientRect();
    points[country] = {
      x: r.left + r.width / 2 - canvasRect.left,
      y: r.top + r.height / 2 - canvasRect.top,
    };
  });

  canvas.querySelectorAll(".map-route").forEach(function (route) {
    var from = route.dataset.from;
    var to = route.dataset.to;
    if (!points[from] || !points[to]) return;

    var A = points[from];
    var B = points[to];
    var dx = B.x - A.x;
    var dy = B.y - A.y;
    var length = Math.sqrt(dx * dx + dy * dy);
    var angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    route.style.width = length + "px";
    route.style.transform =
      "translate(" + A.x + "px," + A.y + "px) rotate(" + angle + "deg)";
  });
}

window.addEventListener("load", updateMapRoutes);
window.addEventListener("resize", function () {
  clearTimeout(window._mapRouteResizeTimer);
  window._mapRouteResizeTimer = setTimeout(updateMapRoutes, 100);
});

var galleryMain = document.getElementById("galleryMain");
var galleryThumbs = document.querySelectorAll(".gallery-thumb");

if (galleryMain && galleryThumbs.length > 0) {
  galleryThumbs.forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      var img = thumb.getAttribute("data-img");
      if (!img) return;
      galleryMain.src = img;

      galleryThumbs.forEach(function (t) {
        t.classList.remove("active");
      });
      thumb.classList.add("active");
    });
  });
}

var tabButtons = document.querySelectorAll(".tab-btn");
var tabPanels = document.querySelectorAll(".tab-panel");

if (tabButtons.length > 0 && tabPanels.length > 0) {
  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var targetId = btn.getAttribute("data-tab");
      if (!targetId) return;

      tabButtons.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");

      tabPanels.forEach(function (panel) {
        panel.classList.toggle("active", panel.id === targetId);
      });
    });
  });
}
