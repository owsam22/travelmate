//weather section

window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("weatherForm");
  const input = document.getElementById("weatherLocation");
  const display = document.getElementById("homeliveWeatherDisplay");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    display.style.opacity = 1;
    const city = input.value.trim();
    if (!city) return;

    try {
      const res = await fetch("/weatherkey");
      const data = await res.json();
      const apiKey = data.key;

      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const weatherData = await weatherRes.json();

      if (!weatherData.main) throw new Error("Invalid city or data");

      const { temp, humidity } = weatherData.main;
      const { description } = weatherData.weather[0];
      const windSpeed = weatherData.wind.speed;

      display.innerHTML = `
          <div class="weather-box">
            <h4>🌤 Weather in ${city}</h4>
            <p><strong>🌡 Temp:</strong> ${temp}°C</p>
            <p><strong>💧 Humidity:</strong> ${humidity}%</p>
            <p><strong>🌬 Wind:</strong> ${windSpeed} m/s</p>
            <p><strong>🌤 Description:</strong> ${description}</p>
          </div>
        `;
    } catch (err) {
      display.innerHTML = `<p style="color:red;">⚠️ ${err.message}</p>`;
    }
  });
});


// Smooth scroll to top (if you're using it)
window.scrollToTop = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function delayedScrollTo(targetId, delay = 200) {
  setTimeout(() => {
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, delay); // delay in milliseconds
}

document.getElementById("btna").addEventListener("click", function (e) {
  e.preventDefault();
  delayedScrollTo("#srh", 300); // 600ms delay
});

document.getElementById("btnb").addEventListener("click", function (e) {
  e.preventDefault();
  delayedScrollTo("#hlt", 300);
});

document.getElementById("btnc").addEventListener("click", function (e) {
  e.preventDefault();
  delayedScrollTo("#hlt", 300);
});

document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.querySelector('.hero');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      } else {
        entry.target.classList.remove('animate'); // so it resets
      }
    });
  }, { threshold: 0.1 });

  observer.observe(heroSection);
});





document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.why-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      } else {
        entry.target.classList.remove('animate');
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
});




const destinations = [
  {
    img: "./images/manali.jpg",
    title: "Manali, Himachal Pradesh",
    desc: "Snowy peaks, scenic valleys, and adventure sports. Great all year round."
  },
  {
    img: "./images/varanasi.jpg",
    title: "Varanasi, Uttar Pradesh",
    desc: "Spiritual capital with ghats and Ganga aarti. Best from November to March."
  },
  {
    img: "./images/ladakh.jpg",
    title: "Ladakh, India",
    desc: "Stunning mountains, monasteries, and adventure. Best from May to September."
  },
  {
    img: "./images/lakshadweep.jpg",
    title: "Lakshadweep, India",
    desc: "Turquoise lagoons and coral reefs. Ideal from October to March for water sports."
  },

  {
    img: "./images/andaman-island.jpg",
    title: "Andaman Islands",
    desc: "Beaches, scuba diving, and history. Best between November and April."
  },
  {
    img: "./images/jaipur.jpg",
    title: "Jaipur, Rajasthan",
    desc: "Forts, palaces, and vibrant culture. Ideal in winter from October to March."
  },
  {
    img: "./images/rishikesh.jpg",
    title: "Rishikesh, Uttarakhand",
    desc: "Yoga capital, rafting, and peaceful retreats. Great from September to April."
  },
  {
    img: "./images/darjeeling.jpg",
    title: "Darjeeling, West Bengal",
    desc: "Tea gardens, toy train, and mountain views. Visit from March to May or Sept to Nov."
  },
  {
    img: "./images/goa.jpg",
    title: "Goa, India",
    desc: "Beaches, nightlife, and Portuguese charm. Peak season is November to February."
  },
  {
    img: "./images/munnar.jpg",
    title: "Munnar, Kerala",
    desc: "Lush green hills and tea estates. Best time to visit is October to March."
  }
];

let currentIndex = 0;

function renderCards() {
  const container = document.getElementById('recommendation-cards');
  container.classList.add('fade-out');

  setTimeout(() => {
    container.innerHTML = '';

    const visible = [
      destinations[currentIndex],
      destinations[(currentIndex + 1) % destinations.length]
    ];

    visible.forEach(dest => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-image-wrapper">
          <img src="${dest.img}" alt="${dest.title}">
          <button class="create-itinerary-btn" onclick="createCardItinerary('${dest.title}')">Create Itinerary</button>
        </div>
        <div class="card-content">
          <h4>${dest.title}</h4>
          <p>${dest.desc}</p>
        </div>
      `;
      container.appendChild(card);
    });

    currentIndex = (currentIndex + 2) % destinations.length;
    container.classList.remove('fade-out');
  }, 400);
}


renderCards();
setInterval(renderCards, 5000);


// form 
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openFeedbackFormBtn");
  const closeBtn = document.getElementById("closeFeedbackFormBtn");
  const modal = document.getElementById("feedbackModal");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const thankYouMsg = document.getElementById("thankYouMsg");
  const form = document.getElementById("feedbackForm");
  const spinner = document.getElementById("spinner");

  let alreadySubmitted = false;
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwdRGSTxpYheR106cKH-W9RqK2nMMqDN15qMkxsHYQpGJPN3gcIY92IQXV3hHb9cI1d3A/exec';

  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    form.reset();
    thankYouMsg.style.display = "none";
    alreadySubmitted = false;
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (alreadySubmitted) {
      thankYouMsg.innerHTML = '🛑 You have already submitted! 🛑';
      thankYouMsg.style.display = 'block';
      loadingOverlay.style.display = 'flex';
      setTimeout(() => {
        loadingOverlay.style.display = 'none';
      }, 1500);
      return;
    }

    loadingOverlay.style.display = 'flex';
    spinner.style.display = 'block';
    thankYouMsg.style.display = 'none';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      alreadySubmitted = true;
      form.reset();

      spinner.style.display = 'none';
      thankYouMsg.innerHTML = '🎉 Thank you for your feedback!';
      thankYouMsg.style.display = 'block';

      setTimeout(() => {
        loadingOverlay.style.display = 'none';
        thankYouMsg.style.display = 'none';
        modal.style.display = 'none';
      }, 2000);
    } catch (error) {
      console.error(error);
      spinner.style.display = 'none';
      thankYouMsg.innerHTML = '❌ Error submitting feedback. Try again later.';
      thankYouMsg.style.display = 'block';
      alreadySubmitted = false;

      setTimeout(() => {
        loadingOverlay.style.display = 'none';
      }, 1500);
    }
  });
});
