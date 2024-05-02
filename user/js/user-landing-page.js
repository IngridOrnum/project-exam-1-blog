const username = sessionStorage.getItem('username');
let currentSlideIndex = 0;
let slideInterval;

function fetchUserBlogPosts() {
    fetch(`https://v2.api.noroff.dev/blog/posts/IngridOrnum`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data && data.data) {
                document.querySelector('.carousel-ul-container').innerHTML = data.data.slice(0, 3).map((post, index) => {
                    return `
                <li class="post-slide" id="slide-${index + 1}">
                    <img class="post-img" src="${post.media.url}" alt="${post.media.alt}">
                    <div class="post-text-background">
                    <div class="post-title">${post.title}</div>
                    </div>
                </li>`;
                }).join('');  // Join the array of strings into a single string
                initializeSlides(); // Initialize slides and start the automatic slideshow
            }
        })
        .catch(error => console.error('Error fetching blog posts:', error));
}

function initializeSlides() {
    showSlide(currentSlideIndex);
    startAutomaticSlide();
}

function startAutomaticSlide() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 3000);
}

function showSlide(index) {
    const slides = document.querySelectorAll('.post-slide');
    if (index >= slides.length) index = 0; // wrap around to the first slide
    if (index < 0) index = slides.length -1; // wrap around to the last slide

    // hide all slides, except the targeted slide
    slides.forEach(slide => slide.style.display = 'none');
    slides[index].style.display = 'block';
    currentSlideIndex = index; //update current slide index
}

function prevSlide() {
    stopAutomaticSlide();
    showSlide(currentSlideIndex -1);
    startAutomaticSlide();
}

function nextSlide() {
    stopAutomaticSlide();
    showSlide(currentSlideIndex +1);
    startAutomaticSlide();
}

function stopAutomaticSlide() {
    clearInterval(slideInterval);
}

fetchUserBlogPosts();