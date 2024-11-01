
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById("loader");


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];





// Unsplash API 

const count = 5;
const apiKey = "SObFGxVMszBWwVla0EqPKnYFrrZWPY-RmOuKUtRM8gE";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}


//Helper function to set attributes to DOM elements

const setAttributes = (element, attributes) => {
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
}

// Create element for links and photos and add them to the DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
    // Create an <a> element to link to Unsplash
    const item = document.createElement('a');

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank"
    });


    // Create <img> for photo
    const img = document.createElement('img');

    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });

    // Event listener, check when each has finished loading
    img.addEventListener('load', imageLoaded);

    // put <img> inside <a>, then put both inside imagContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}


//Get photos from Unsplash API 

async function getPhotos() {
    try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();

} catch (error) {
  // Catch error here
  
}

}

// Check to see if scrolling near bottom of the page, load more pictures.

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
    }
});

// 0n load

getPhotos();

