$(document).ready(function () {

  var watchData = []; // Store globally for the modal

  // 1. FETCH DATA AND BUILD PAGE
  $.getJSON("data/data.json", function (data) {
    watchData = data.watches; // Save for later

       // --- A. Build Hero Carousel ---
    var carouselHTML = "";
    // We take the first 4 watches from the JSON to put in the carousel
    data.watches.slice(0, 4).forEach(function (watch, index) {
      // The first image must have the 'active' class
      var activeClass = (index === 0) ? "active" : "";
      
      carouselHTML += `
        <div class="carousel-item ${activeClass} h-100">
          <img src="${watch.img}" alt="${watch.name}">
        </div>
      `;
    });
    
    // Inject the slides into the Bootstrap carousel
    $("#heroCarousel .carousel-inner").html(carouselHTML);

    // Build Collections
    var plHTML = "";
    data.productLines.forEach(function (line) {
      plHTML += `
        <div class="pl-card card p-4 shadow-sm border">
          <div class="font-mono text-bronze fw-bold mb-3">
            ${line.roman} <span class="flex-grow-1 border-bottom d-inline-block ms-2" style="width: 50px;"></span>
          </div>
          <div class="pl-icon-frame mb-4"><i class="bi ${line.icon}"></i></div>
          <h3 class="font-serif fs-3 fw-bold mb-2">${line.name}</h3>
          <p class="text-muted small mb-0">${line.description}</p>
        </div>
      `;
    });
    $("#productLineContainer").html(plHTML);

    // Build Gallery
    var galHTML = "";
    data.gallery.forEach(function (item) {
      galHTML += `
        <div class="g-tile shadow-sm" data-img="${item.img}">
          <img src="${item.img}" alt="${item.title}">
          <div class="g-overlay">
            <h4 class="g-title font-serif">${item.title}</h4>
            <p class="g-desc font-mono text-gold mb-0">${item.desc}</p>
          </div>
        </div>
      `;
    });
    $("#galleryContainer").html(galHTML);

    // Build Price List
    var priceHTML = "";
    data.watches.forEach(function (watch, index) {
      var num = String(index + 1).padStart(2, '0');
      priceHTML += `
        <div class="price-row" data-watch-id="${watch.id}">
          <div class="price-num">${num}</div>
          <div class="price-name">${watch.name}</div>
          <div class="price-line">${watch.line}</div>
          <div class="price-value">Rs. ${watch.price.toLocaleString()}</div>
          <div class="price-arrow"><i class="bi bi-arrow-right"></i></div>
        </div>
      `;
    });
    $("#priceTableBody").html(priceHTML);
    $("#priceCount").text("Showing " + data.watches.length + " of " + data.watches.length);

  }).fail(function() {
    console.error("Failed to load data.json.");
  });

  // 2. INTERACTIONS

  // --- Search Filter ---
  $("#priceSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    var visibleCount = 0;
    
    $("#priceTableBody .price-row").filter(function() {
      var isMatch = $(this).text().toLowerCase().indexOf(value) > -1;
      $(this).toggle(isMatch);
      if (isMatch) visibleCount++;
    });
    
    $("#priceCount").text("Showing " + visibleCount + " of " + watchData.length);
  });

  // --- Watch Modal ---
  var watchModal = new bootstrap.Modal(document.getElementById('watchModal'));
  
    // --- Watch Modal (For Price List) ---
  var watchModal = new bootstrap.Modal(document.getElementById('watchModal'));
  
  $(document).on("click", ".price-row", function() {
    // 1. Get the ID (using .attr() is safer than .data() for strict matching)
    var id = $(this).attr("data-watch-id");
    
    // 2. Find the watch. We use '==' instead of '===' to avoid string/number mismatch errors!
    var watch = watchData.find(function(w) { return w.id == id; });
    
    if(watch) {
      $("#watchModalKicker").text(watch.line + " Collection");
      
      // 3. Build the Modal HTML
      $("#watchModalBody").html(`
        <div class="row g-4 align-items-center">
          
          <!-- The Image Container -->
          <div class="col-md-5">
            <img src="${watch.img}" class="w-100 rounded shadow-sm" alt="${watch.name}" style="height: 300px; object-fit: cover;">
          </div>
          
          <!-- The Details Container -->
          <div class="col-md-7">
            <span class="badge border text-muted font-mono mb-2">${watch.line}</span>
            <h3 class="font-serif display-6 mb-3">${watch.name}</h3>
            <p class="text-muted">${watch.description}</p>
            
            <div class="font-mono fs-4 text-bronze mt-4 mb-4">
              Rs. ${watch.price.toLocaleString()}
            </div>
            
            <ul class="list-unstyled font-mono text-muted small border-top pt-3 border-hair">
              <li class="mb-2 d-flex justify-content-between"><span>Case</span> <span class="text-dark fw-bold">Swiss Made</span></li>
              <li class="mb-2 d-flex justify-content-between"><span>Warranty</span> <span class="text-dark fw-bold">5 Years</span></li>
              <li class="d-flex justify-content-between"><span>Shipping</span> <span class="text-dark fw-bold">Complimentary</span></li>
            </ul>
          </div>
          
        </div>
      `);
      watchModal.show();
    } else {
      console.error("Could not find watch with ID:", id);
    }
  });

   // --- C. Newsletter Form ---
  $("#newsletterForm").on("submit", function (e) {
    e.preventDefault(); // Stop page reload
    $(this).hide();     // Hide the input box
    $("#newsletterMsg").fadeIn(300); // Show success message
  });

  // 7. Live Clock Ticker
  function updateTicker() {
    var now = new Date();

    // Format Date (e.g., Nov 24, 2026)
    $("#tickerDate").text(now.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }));

    // Format Time (e.g., 14:35:22)
    $("#tickerTime").text(now.toLocaleTimeString("en-US", { hour12: false }));
  }

  // Run immediately, then update every 1000ms (1 second)

  updateTicker();
  setInterval(updateTicker, 1000);

  // 8. Geolocation API (For the ticker)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        var lat = pos.coords.latitude.toFixed(2);
        var lon = pos.coords.longitude.toFixed(2);
        $("#tickerLocation").text("LAT " + lat + " · LON " + lon);
      },
      function () {
        // If user blocks location, show default city
        $("#tickerLocation").text("Karachi · Pakistan");
      }
    );
  } else {
    $("#tickerLocation").text("Karachi · Pakistan");
  }
    // Navbar Scroll Animation
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      $("body").addClass("scrolled");
    } else {
      $("body").removeClass("scrolled");
    }
  });

    // Contact Form Submit
  $("#contactForm").on("submit", function (e) {
    e.preventDefault(); // Stops page reload
    $(this).find("button[type='submit']").text("Sending...").prop("disabled", true);
    
    // Simulate a 1 second network request
    setTimeout(function() {
      $("#contactMsg").fadeIn(300);
      $("#contactForm")[0].reset();
      $("#contactForm").find("button[type='submit']").html('Send Enquiry <i class="bi bi-arrow-right ms-1"></i>').prop("disabled", false);
    }, 1000);
  });

    // Visitor Counter 
  var visitors = parseInt(localStorage.getItem("albertoVisitors") || "3241", 10) + 1;
  localStorage.setItem("albertoVisitors", visitors);
  $("#visitorCount").text(visitors.toLocaleString());

    // =========================================
  // DARK MODE TOGGLE Via Menus.ui git repo
  // =========================================
  
  var currentTheme = localStorage.getItem("albertoTheme") || "light";
  
  function applyTheme(theme) {
    if (theme === "dark") {
      $("body").attr("data-theme", "dark");
      $("#themeIcon").removeClass("bi-moon-fill").addClass("bi-sun-fill");
    } else {
      $("body").removeAttr("data-theme");
      $("#themeIcon").removeClass("bi-sun-fill").addClass("bi-moon-fill");
    }
  }
  
  // Apply theme on page load
  applyTheme(currentTheme);
  
  // Toggle theme on button click
  $("#themeToggle").on("click", function() {
    var newTheme = $("body").attr("data-theme") === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("albertoTheme", newTheme);
  });
});