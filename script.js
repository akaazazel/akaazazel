let email_address = "cvakshay764@gmail.com";
function openGmail() {
  const message = document.getElementById("message").value;
  const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${email_address}&su=${encodeURIComponent(
    message
  )}`;

  window.open(mailtoLink, "_blank");
}
