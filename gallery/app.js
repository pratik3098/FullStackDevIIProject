const current = document.querySelector('#current');
const imgProfile = document.querySelector('.img-profile');
const imgs = document.querySelectorAll('.imgss img');
const form = document.querySelector('#form')
const uploadbtn = document.querySelector('#button')
const userName = document.querySelector('#user-name')
const email = document.querySelector('#email')
const clienSince = document.querySelector('#client')


// gallery
const opacity = 0.6;
imgs[0].style.opacity=opacity;

imgs.forEach(img=>img.addEventListener('click',
imgClick));

function imgClick(e){

  imgs.forEach(img=>(img.style.opacity=1));
  current.src = e.target.src;

  current.classList.add('fade-in');
  setTimeout(()=> current.classList.remove('fade-in'),
  500);

  e.target.style.opacity = opacity;
}

