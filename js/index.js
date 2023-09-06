// navbar

$(document).ready(function () {
  $(".navbar-toggler").click(function () {
    $(".collapse.navbar-collapse").toggleClass("show");
  });
});

// footer
$(document).ready(function () {
  $("button.btn-primary").click(function () {
    alert("Subscribed!");
  });
});

//

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");

  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;

  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// signup

// JavaScript for form validation
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const errorMessage = document.getElementById("errorMessage");
  const submitButton = document.getElementById("submitButton");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = form.querySelector("#validationDefault01");
    const emailInput = form.querySelector("#validationCustom01");
    const passwordInput = form.querySelector("#exampleInputPassword1");

    if (!nameInput.value || !emailInput.value || !passwordInput.value) {
      errorMessage.textContent = "Please enter all fields.";
    } else {
      errorMessage.textContent = "";
      // You can submit the form or perform other actions here
    }
  });
});

// jQuery for form validation
$(document).ready(function () {
  $("#submitButton").click(function (e) {
    e.preventDefault();

    const nameInput = $("#validationDefault01");
    const emailInput = $("#validationCustom01");
    const passwordInput = $("#exampleInputPassword1");
    const errorMessage = $("#errorMessage");

    if (!nameInput.val() || !emailInput.val() || !passwordInput.val()) {
      errorMessage.text("Please enter all fields.");
    } else {
      errorMessage.text("");
      // You can submit the form or perform other actions here
    }
  });
});

//Login Form

// JavaScript for form validation
document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");
  const errorMessage = document.getElementById("errorMessage");
  const submitButton = document.getElementById("submitButton");
  const clearButton = document.getElementById("clearButton");
  const loadingSpinner = document.querySelector(".loading-spinner");

  submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
      errorMessage.textContent = "Please enter both email and password.";
      return;
    }

    // Show loading spinner
    loadingSpinner.style.display = "block";

    // Make an AJAX request using jQuery
    $.ajax({
      type: "POST",
      url: "https://api.escuelajs.co/api/v1/auth/login",
      data: JSON.stringify({
        email: email,
        password: password,
      }),
      contentType: "application/json",
      success: function (data) {
        // Handle successful response
        const accessToken = data.access_token;
        localStorage.setItem("access_token", accessToken);

        // Navigate to the home page
        window.location.href = "/"; // Change the URL as needed
      },
      error: function (xhr, textStatus, errorThrown) {
        // Handle error response
        errorMessage.textContent = "Invalid credentials";
      },
      complete: function () {
        // Hide loading spinner
        loadingSpinner.style.display = "none";
      },
    });
  });

  clearButton.addEventListener("click", function () {
    // Clear form fields and error message
    emailInput.value = "";
    passwordInput.value = "";
    errorMessage.textContent = "";
  });
});
