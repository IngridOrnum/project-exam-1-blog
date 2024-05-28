let currentSlideIndex = 0;
let slideInterval;
const paginationElement = document.querySelector('.pagination-element');

document.addEventListener('DOMContentLoaded', function () {
    const heroBg = document.querySelector('.hero-bg');

    heroBg.addEventListener('mousemove', function (e) {
        const width = heroBg.offsetWidth;
        const height = heroBg.offsetHeight;
        const mouseX = e.clientX / width;
        const mouseY = e.clientY / height;

        const moveX = (mouseX - 0.5) * 30; // Adjust multiplier for desired effect
        const moveY = (mouseY - 0.5) * 30; // Adjust multiplier for desired effect

        heroBg.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });

    heroBg.addEventListener('mouseleave', function () {
        heroBg.style.backgroundPosition = '50% 50%';
    });
});


function fetchUserBlogPostsCarousel() {
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
                        <div class="slide-background-blur"></div>
                        <img class="post-img" src="${post.media.url}" alt="${post.media.alt}">
                        <div class="title-wrapper">
                         <button class="title-carousel-button"><a class="post-title" href="post/index.html?postId=${post.id}">${post.title}</a></button>
                        </div>
                </li>`;
                }).join('');  // Join the array of strings into a single string
                initializeSlides(); // Initialize slides and start the automatic slideshow
                initializePagination();
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

function initializePagination() {
    const slides = document.querySelectorAll('.carousel-ul-container .post-slide');
    const paginationHTML = [];
    for (var i = 0; i < slides.length; i++) {
        paginationHTML.push('<button class="slider-pagination-btn" data-index="' + i + '"></button>');
    }
    paginationElement.innerHTML = paginationHTML.join('');
    updatePagination();
}

function showSlide(index) {

    stopAutomaticSlide();

    const slides = document.querySelectorAll('.post-slide');
    if (index >= slides.length) index = 0; // wrap around to the first slide
    if (index < 0) index = slides.length -1; // wrap around to the last slide

    // hide all slides, except the targeted slide
    slides.forEach(slide => slide.style.display = 'none');
    slides[index].style.display = 'block';
    currentSlideIndex = index; //update current slide index
    updatePagination();
}

paginationElement.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains("slider-pagination-btn")) {
        const newIndex = Number(target.getAttribute("data-index"));
        showSlide(newIndex);
    }
});

function updatePagination() {
    const paginationBtns = paginationElement.querySelectorAll('.slider-pagination-btn');
    paginationBtns.forEach((btn, index) => {
            btn.classList.toggle('slider-pagination-btn--sel', index === currentSlideIndex);
    });
}

// code inspiration for pagination: https://www.codeguage.com/tutorials/sliders/pagination

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

fetchUserBlogPostsCarousel();

function fetchUserBlogPostsStaticList() {
    fetch(`https://v2.api.noroff.dev/blog/posts/IngridOrnum`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data && data.data) {
                document.querySelector('.post-grid-container').innerHTML = data.data.slice(0, 12).map((post, index) => {
                    return `
                <div class="element-thumbnail grid-item" id="element-thumbnail-${index + 1}">
                    <a class="a-element-thumbnail" href="post/index.html?postId=${post.id}">
                    <img class="img-thumbnail" src="${post.media.url}" alt="${post.media.alt}">
                    <div class="bg-blur-thumbnail"></div>
                    <div class="title-thumbnail-wrapper">
                        <div class="title-thumbnail">${post.title}</div>
                    </div>
                    </a>
                </div>`;
                }).join('');  // Join the array of strings into a single string
            }
        })
        .catch(error => console.error('Error fetching blog posts:', error));
}

fetchUserBlogPostsStaticList();