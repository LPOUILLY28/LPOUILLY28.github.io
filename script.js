function toggleMenu() {
  document.getElementById('sideMenu').classList.toggle('open');
}

document.querySelectorAll("[data-carousel]").forEach(carousel => {
  const images = carousel.querySelectorAll(".carousel-image");
  const dotsContainer = carousel.querySelector(".carousel-dots");
  let current = 0;

  // Créer les petits ronds (dots)
  images.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", (ev) => {
      const targetImg = images[index];
      const url = targetImg && (targetImg.dataset.href || targetImg.dataset.link || targetImg.getAttribute('data-url'));
      if (url) {
        // If user requests new tab (Ctrl/Cmd/Meta) open in new tab
        if (ev.ctrlKey || ev.metaKey) {
          window.open(url, '_blank');
        } else {
          window.location.href = url;
        }
        return;
      }
      current = index;
      show(current);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");

  const show = (index) => {
    images.forEach((img, i) => {
      img.classList.toggle("show", i === index);
      dots[i].classList.toggle("active", i === index);
    });
  };

  carousel.querySelector(".prev").addEventListener("click", () => {
    current = (current - 1 + images.length) % images.length;
    show(current);
  });

  carousel.querySelector(".next").addEventListener("click", () => {
    current = (current + 1) % images.length;
    show(current);
  });

  show(current);
});

function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  img.src = src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}  

  window.addEventListener('load', () => {
    // Cacher le loader
    document.getElementById('loader').style.display = 'none';
    // Afficher le contenu
    document.getElementById('content').style.display = 'block';
  });

// Dropdown toggle behavior for Projects
document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.nav-dropdown .dropdown-toggle');
  toggles.forEach(btn => {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = btn.closest('.nav-dropdown');
      const isOpen = parent.classList.contains('open');
      // Close any other open dropdowns
      document.querySelectorAll('.nav-dropdown.open').forEach(d => { if (d !== parent) d.classList.remove('open'); d.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false'); });
      if (isOpen) {
        parent.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        parent.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close dropdowns on click outside
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-dropdown.open').forEach(d => {
      if (!d.contains(e.target)) {
        d.classList.remove('open');
        d.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-dropdown.open').forEach(d => {
        d.classList.remove('open');
        d.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });
    }
  });
});

