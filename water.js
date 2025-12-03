$(document).ready(function () {
  try {
    // Initialize ripples on the body
    $("body").ripples({
      resolution: 512,  // High resolution (demo uses 512)
      dropRadius: 20,   // Larger radius for "heavier" drops (demo uses 20)
      perturbance: 0.04, // Refraction amount (0.04 is balanced; 0.01 is glass, 0.08 is oil)
      interactive: true  // Must be true to react to mouse movements
    });
  } catch (e) {
    console.error("Ripples init error:", e);
  }

  // Optional: Automatic "rain" drops
  // This adds liveliness even when the user isn't moving the mouse
  setInterval(function () {
    var $el = $("body");
    
    // Random position within the window
    var x = Math.random() * $(window).width();
    var y = Math.random() * $(window).height();
    
    // Varying drop strength
    var dropRadius = 20;
    var strength = 0.04 + Math.random() * 0.04;

    $el.ripples("drop", x, y, dropRadius, strength);
  }, 1000); // 1000ms = 1 drop per second (less chaotic than 400ms)
});