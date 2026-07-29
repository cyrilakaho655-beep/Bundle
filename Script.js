function toggleMenu(){
  document.getElementById('nav-links').classList.toggle('show');
}

document.getElementById('whatsappForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;
      
      const whatsappNumber = '233551482999'; // <-- PUT YOUR NUMBER HERE. No + and no spaces
      
      const whatsappMessage = `*New Message from Whally Website*%0A%0A
*Name:* ${name}%0A
*Email:* ${email}%0A
*Phone:* ${phone}%0A
*Message:* ${message}`;
      
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      
      window.open(whatsappURL, '_blank');
    });