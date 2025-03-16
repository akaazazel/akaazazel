let email_address = "cvakshay764@gmail.com";
function openGmail() {
  const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${email_address}&su=${encodeURIComponent(
    ""
  )}`;

  window.open(mailtoLink, "_blank");
}

// Check for saved dark mode preference on page load
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
  }
});

// Toggle dark mode and save preference
document
  .getElementById("darkModeToggle")
  .addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
    } else {
      localStorage.removeItem("dark-mode");
    }
  });
