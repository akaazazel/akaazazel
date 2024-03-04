function emailSave(){
  let email = document.querySelector('.email-input').value;
  localStorage.setItem("email", email);
}

let email = localStorage.getItem("email");
document.querySelector('.email-preview').innerHTML = email;