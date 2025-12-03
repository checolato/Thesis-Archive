// js/intro.js
document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.querySelector(".intro-title");
  const paragraphEls = document.querySelectorAll(".intro-line");
  const introScreen = document.getElementById("intro-screen");
  const introInner = document.querySelector(".intro-inner");

  const charDelay = 18;        // speed per character for body
  const paragraphPause = 400;  // pause between paragraphs
  const titleDelay = 40;       // slower for title

  let dissolveActive = false;  // becomes true after first paragraph is done

  function typeElement(el, delayPerChar) {
    return new Promise(resolve => {
      const text = el.dataset.text || "";
      el.textContent = "";

      let i = 0;
      const interval = setInterval(() => {
        const ch = text.charAt(i);

        const span = document.createElement("span");
        span.classList.add("char");
        span.textContent = ch === " " ? " " : ch;
        el.appendChild(span);

        // If dissolve has already started, new chars should also dissolve
        if (dissolveActive) {
          const maxRandomDelay = 5.0; // tweak for slower dissolve
          const delay = Math.random() * maxRandomDelay;
          span.style.animationDelay = `${delay}s`;
          span.classList.add("dissolve-char");
        }

        i++;
        if (i >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, delayPerChar);
    });
  }

  function startCharacterDissolve() {
    if (dissolveActive) return;
    dissolveActive = true;

    if (introScreen) {
      introScreen.classList.add("rain-off");
    }

    const chars = introInner.querySelectorAll(".char");
    const maxRandomDelay = 5.0; // seconds

    chars.forEach(span => {
      const delay = Math.random() * maxRandomDelay;
      span.style.animationDelay = `${delay}s`;
      span.classList.add("dissolve-char");
    });
  }

  async function runIntroTyping() {
    await typeElement(titleEl, titleDelay);

    if (paragraphEls.length === 0) return;

    await typeElement(paragraphEls[0], charDelay);

    // start dissolving after first paragraph
    setTimeout(startCharacterDissolve, 500);

    for (let i = 1; i < paragraphEls.length; i++) {
      await new Promise(r => setTimeout(r, paragraphPause));
      await typeElement(paragraphEls[i], charDelay);
    }
  }

  // Click anywhere on the intro screen → go to home page
  if (introScreen) {
    introScreen.addEventListener("click", () => {
      introScreen.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = "index.html"; // your home page
      }, 1200); // match your fade-out duration
    });
  }

  runIntroTyping();
});
