$(document).ready(function () {

  // 1. Fetch the JSON data
  $.getJSON("data/data.json", function (data) {
    
    // 2. Set the Hero Image (using the 4th watch from JSON)
    $("#heroImg").attr("src", data.watches[3].img);

    // 3. Build the Collection Cards
    var html = "";
    data.productLines.forEach(function (line) {
      html += `
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

    // 4. Put the cards into the container
    $("#productLineContainer").html(html);
  });

  // 5. Navbar scroll effect
  $(window).on("scroll", function () {
    $("body").toggleClass("scrolled", $(this).scrollTop() > 50);
  });

});