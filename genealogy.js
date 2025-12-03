$(function () {
  // Init ripples on this page
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

  function setEnvironment(env) {
    $body.removeClass(envClasses);

    if (env === 'spatial')  $body.addClass('env-spatial');
    if (env === 'eco')      $body.addClass('env-eco');
    if (env === 'temporal') $body.addClass('env-temporal');
    if (env === 'sensory')  $body.addClass('env-sensory');
    if (env === 'atmos')    $body.addClass('env-atmos');
  }

  // Default environment: Spatial
  setEnvironment('spatial');

  // Tab clicking
  $('.env-tab').on('click', function () {
    const env = $(this).data('env');
    $('.env-tab').removeClass('is-active');
    $(this).addClass('is-active');
    setEnvironment(env);
    updateSensorySound();
  });

  // OPTIONAL: sensory water sound
  // place a file at sounds/water-loop.mp3 if you want
  const sensorySound = new Audio('sounds/water-loop.mp3');
  sensorySound.loop = true;
  let soundOn = false;

  function updateSensorySound() {
    if ($body.hasClass('env-sensory')) {
      if (!soundOn) {
        sensorySound.play().catch(() => {});
        soundOn = true;
      }
    } else {
      sensorySound.pause();
      sensorySound.currentTime = 0;
      soundOn = false;
    }
  }

  // If you don’t want sound yet, you can comment out updateSensorySound()
  updateSensorySound();
});

// -----------------------------------------------
// LETTER ESCAPE EFFECT FOR SPATIAL ORGANIZER
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

// When hovering over a spatial item
$('.water-spatial a').on('mousemove', function (e) {
  if (!$('body').hasClass('env-spatial')) return; // only in spatial mode
  
  const bounds = this.getBoundingClientRect();
  const mouseX = e.clientX - bounds.left;
  const mouseY = e.clientY - bounds.top;

  $(this).find('.char').each(function () {
    const letterBounds = this.getBoundingClientRect();
    const centerX = letterBounds.left - bounds.left + letterBounds.width / 2;
    const centerY = letterBounds.top - bounds.top + letterBounds.height / 2;

    // Compute direction from mouse → letter
    let dx = centerX - mouseX;
    let dy = centerY - mouseY;
    let dist = Math.sqrt(dx * dx + dy * dy);

    // Strength of repulsion
    let force = Math.max(0, 80 - dist); // letters within 80px will move
    let norm = force / (dist || 1);

    this.style.transform = `translate(${dx * norm}px, ${dy * norm}px)`;
  });
});

// On mouse leave — letters return home
$('.water-spatial a').on('mouseleave', function () {
  $(this).find('.char').css('transform', 'translate(0,0)');
});

// Split all ecological titles into characters and store a "distance from center"
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
