<script>

/* MENU */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.onclick = () => {
  navLinks.classList.toggle("active");
};

/* FADE ANIMATION */

const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }

  });

}, {
  threshold: 0.2
});

fadeElements.forEach(el => observer.observe(el));

/* NAVBAR SCROLL EFFECT */

window.addEventListener("scroll", () => {

  const nav = document.querySelector("nav");

  if (window.scrollY > 50) {
    nav.style.background = "rgba(0,0,0,.92)";
    nav.style.boxShadow = "0 10px 30px rgba(0,0,0,.4)";
  } else {
    nav.style.background = "rgba(0,0,0,.65)";
    nav.style.boxShadow = "none";
  }

});

/* LIVE SCORES API */

async function loadLiveScores() {

  const container = document.getElementById("liveScores");

  try {

    const response = await fetch(
      "https://site.api.espn.com/apis/site/v2/sports/soccer/all/scoreboard"
    );

    const data = await response.json();

    const games = data.events.slice(0, 8);

    container.innerHTML = "";

    games.forEach(game => {

      const comp = game.competitions[0];

      const home = comp.competitors[0];
      const away = comp.competitors[1];

      const homeName = home.team.displayName;
      const awayName = away.team.displayName;

      const homeScore = home.score;
      const awayScore = away.score;

      const status = game.status.type.description;

      container.innerHTML += `

      <div class="live-card fade-in">

        <div class="live-top">

          <span class="live-status">${status}</span>

          <div class="live-dot"></div>

        </div>

        <div class="teams">

          ${homeName}

          <br>

          ضد

          <br>

          ${awayName}

        </div>

        <div class="score">

          ${homeScore} - ${awayScore}

        </div>

      </div>

      `;

    });

  } catch (error) {

    container.innerHTML = `

    <div class="live-card">

      <div class="teams">

        فشل تحميل النتائج المباشرة

      </div>

    </div>

    `;

  }

}

loadLiveScores();

setInterval(loadLiveScores, 60000);

</script>
