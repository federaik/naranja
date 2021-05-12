const images = document.getElementsByClassName('img');

let currentImage = 0;

const showCurrentImage = () => {      
  console.log(images[currentImage])  
}

const next = () => {    
  if (currentImage < images.length-1) {
    images[currentImage].classList.add('hidden')
    currentImage++;
    images[currentImage].classList.remove('hidden')
    showCurrentImage()    
  }    
}

const prev = () => {    
  if (currentImage > 0) {
    images[currentImage].classList.add('hidden')
    currentImage--;
    images[currentImage].classList.remove('hidden')
    showCurrentImage()
  }    
}


showCurrentImage();