// genealogy.js
$(function () {
  // ------------------------------------
  // 1. INIT RIPPLE BACKGROUND
  // ------------------------------------
  try {
    $('body').ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.04,
    });
  } catch (e) {
    console.error(e);
  }

  const $body = $('body');
  const envClasses = 'env-spatial env-eco env-temporal env-sensory env-atmos';

  // ------------------------------------
  // 2. SENSORY FIELD BACKGROUND AUDIO
  // ------------------------------------
  // Put your sound file at: /sounds/water-loop.mp3
  // or change the path below to match your file name.
  const sensorySound = new Audio('sounds/water-loop.mp3');
  sensorySound.loop = true;
  sensorySound.volume = 0.4; // adjust 0.0–1.0

  let soundOn = false;

  function updateSensorySound() {
    if ($body.hasClass('env-sensory')) {
      if (!soundOn) {
        sensorySound.play().catch(() => {
          // Browser might block autoplay until a user gesture;
          // since this is triggered by tab click, it should usually be fine.
        });
        soundOn = true;
      }
    } else {
      if (soundOn) {
        sensorySound.pause();
        sensorySound.currentTime = 0;
        soundOn = false;
      }
    }
  }

  // ------------------------------------
  // 3. ENVIRONMENT SWITCHING (TABS)
  // ------------------------------------
  function setEnvironment(env) {
    $body.removeClass(envClasses);

    if (env === 'spatial')  $body.addClass('env-spatial');
    if (env === 'eco')      $body.addClass('env-eco');
    if (env === 'temporal') $body.addClass('env-temporal');
    if (env === 'sensory')  $body.addClass('env-sensory');
    if (env === 'atmos')    $body.addClass('env-atmos');

    updateSensorySound();
  }

  // Default environment: Spatial
  setEnvironment('spatial');

  // Pond environment tab click
  $('.env-tab').on('click', function () {
    const env = $(this).data('env');
    $('.env-tab').removeClass('is-active');
    $(this).addClass('is-active');
    setEnvironment(env);
  });

  // -----------------------------------------------
  // 4. LETTER ESCAPE EFFECT FOR SPATIAL ORGANIZER
  // -----------------------------------------------

  // Split all spatial titles into characters
  $('.water-spatial .blend-text').each(function () {
    let text = $(this).text().trim();
    let html = '';
    for (let i = 0; i < text.length; i++) {
      let ch = text[i] === ' ' ? '&nbsp;' : text[i];
      html += `<span class="char">${ch}</span>`;
    }
    $(this).html(html);
  });

  // When hovering over a spatial item (letters run away from mouse)
  $('.water-spatial a').on('mousemove', function (e) {
    if (!$body.hasClass('env-spatial')) return; // only in spatial mode

    const bounds = this.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    $(this).find('.char').each(function () {
      const letterBounds = this.getBoundingClientRect();
      const centerX = letterBounds.left - bounds.left + letterBounds.width / 2;
      const centerY = letterBounds.top - bounds.top + letterBounds.height / 2;

      // direction from mouse → letter
      let dx = centerX - mouseX;
      let dy = centerY - mouseY;
      let dist = Math.sqrt(dx * dx + dy * dy);

      // Strength of repulsion: letters within 80px will move
      let force = Math.max(0, 80 - dist);
      let norm = force / (dist || 1);

      this.style.transform = `translate(${dx * norm}px, ${dy * norm}px)`;
    });
  });

  // On mouse leave — letters return home
  $('.water-spatial a').on('mouseleave', function () {
    $(this).find('.char').css('transform', 'translate(0,0)');
  });

  // -----------------------------------------------
  // 5. ECOLOGICAL–CULTURAL: CENTERED RIPPLE BLEND
  // -----------------------------------------------

  // Split all ecological titles into characters and store "distance from center"
  $('.water-eco .blend-text').each(function () {
    let text = $(this).text().trim();
    let html = '';
    const len = text.length;
    const center = (len - 1) / 2; // middle index (can be .5)

    for (let i = 0; i < len; i++) {
      let ch = text[i] === ' ' ? '&nbsp;' : text[i];
      const dist = Math.abs(i - center); // distance from center
      html += `<span class="char" style="--ecoDist:${dist}">${ch}</span>`;
    }
    $(this).html(html);
  });

  // Eco ripple on hover is handled purely in CSS using --ecoDist
  // (no extra JS needed here)

  // -----------------------------------------------
  // 6. (OPTIONAL) TEMPORAL / ATMOS / SENSORY TEXT FX
  // -----------------------------------------------
  // Any extra text effects for temporal, sensory, or atmos categories
  // can be kept CSS-only (using .env-temporal, .env-sensory, .env-atmos)
  // so no more JS is required here.

});
