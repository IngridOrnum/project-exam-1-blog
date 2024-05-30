let allPosts = [];
let currentlyDisplayedPosts = 0;

function displayAllPosts() {
    fetch(`https://v2.api.noroff.dev/blog/posts/IngridOrnum`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data && data.data) {
                allPosts = data.data;
                renderPosts(allPosts, 12);
            }
        })
        .catch(error => console.error('Error fetching blog posts:', error));
}

function renderPosts(posts, numberOfPosts) {
    const postsToRender = posts.slice(currentlyDisplayedPosts, currentlyDisplayedPosts + numberOfPosts);
    const postElements = postsToRender.map((post, index) => {
        return `
            <div class="element-thumbnail grid-item" data-tags="${post.tags.join(', ')}" id="post-grid-element-${index + 1}">
                 <a class="a-element-thumbnail" href="index.html?postId=${post.id}">
                <img class="img-thumbnail" src="${post.media.url}" alt="${post.media.alt}">
                <div class="bg-blur-thumbnail"></div>
                <div class="title-thumbnail-wrapper">
                    <div class="title-thumbnail">${post.title}</div>
                </div>
                </a>
            </div>`;
    }).join('');

    document.querySelector('.blog-archive-section').innerHTML += postElements;

    currentlyDisplayedPosts += numberOfPosts;

    if (currentlyDisplayedPosts >= posts.length) {
        document.querySelector('.more-posts-generator-btn').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const mainFilterButtons = document.querySelectorAll('.main-filter-btn');
    const viewAllButton = document.getElementById('view-all');
    const lineDivider = document.querySelector('.line-divider');
    const morePostsButton = document.querySelector('.more-posts-generator-btn');

    viewAllButton.classList.add('active');
    displayAllPosts();

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            removeActiveClass(mainFilterButtons);
            if (button.id === 'view-all') {
                resetPostView();
                renderPosts(allPosts, 12);
            } else {
                const filterValue = button.getAttribute('data-filter');
                filterPosts(filterValue);
            }
            button.classList.add('active');
        });
    });

   mainFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            removeActiveClass(mainFilterButtons);
            hideAllSubcategories();
            const subcategoryClass = button.id.replace('-filter-btn', '-subcategories');
            const subcategories = document.querySelector(`.${subcategoryClass}`);
            if(subcategories) {
                subcategories.style.display = 'block';
                lineDivider.style.display = 'block';
            }
            button.classList.add('active');
        });
    });

   morePostsButton.addEventListener('click', () => {
       renderPosts(allPosts, 10);
   })

    function removeActiveClass(buttons) {
        buttons.forEach(btn => btn.classList.remove('active'));
    }

    function hideAllSubcategories() {
        const allSubcategories = document.querySelectorAll('.wrapper-subcategories');
        allSubcategories.forEach(subcat => {
            subcat.style.display = 'none';
        });
        lineDivider.style.display = 'none';
    }

    function resetPostView() {
       document.querySelector('.blog-archive-section').innerHTML = '';
       currentlyDisplayedPosts = 0;
       morePostsButton.style.display = 'block';
    }
    function filterPosts(filter) {
        const filteredPosts = allPosts.filter(post => {
            return post.tags && post.tags.some(tag => tag && tag.toLowerCase() === filter.toLowerCase());
        });
        resetPostView();
        renderPosts(filteredPosts, 12);
    }
});




