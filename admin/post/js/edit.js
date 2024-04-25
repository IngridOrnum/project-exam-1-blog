
document.addEventListener('DOMContentLoaded', function () {
    const postsContainer = document.querySelector('.ul-all-posts-edit-page');


    // display edit dropdown
    function displayEditDropdown(event) {
        const editDropdown = event.target.closest('.single-blog-display-edit').querySelector('.edit-dropdown');
        const deleteBtnEdit = document.querySelector('.delete-btn');
        if (editDropdown) {
            editDropdown.style.display = "block";
            deleteBtnEdit.style.display = "none";
        }
    }

    // close edit dropdown
    function closeEditDropdown(event) {
        const editDropdown = event.target.closest('.single-blog-display-edit').querySelector('.edit-dropdown');
        if (editDropdown) {
            editDropdown.style.display = "none";
            deleteBtnEdit.style.display = "block";
        }
    }

    fetch('https://v2.api.noroff.dev/blog/posts/IngridOrnum')
        .then(res => res.json())
        .then(data => {
            data.data.forEach(blogPost => {
                const date = blogPost.created.slice(0, 10);
                const blogPostElement = document.createElement('div');
                blogPostElement.classList.add('single-blog-display-edit');
                blogPostElement.innerHTML = `
                    <li>Title: ${blogPost.title}</li>
                    <div class="author-date-edit-page">
                        <li>Author: ${blogPost.author.name}</li>
                        <li>Date: ${date}</li>
                    </div>
                    <div class="edit-delete-btns">
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                        <button class="save-btn">Save</button>
                    </div>
                    <div class="edit-dropdown" style="display: none;">
                            <form class="edit-form">
                        <div class="line-divider"></div>
                        <label for="img-url-hero"></label>
                        <input id="img-url-hero" placeholder="Img URL - Hero" type="text">

                          <label for="new-title"></label>
                            <input id="new-title" placeholder="New Title" type="text">

                                <div class="line-divider"></div>

                            <label for="first-paragraph"></label>
                             <input id="first-paragraph" placeholder="First paragraph" type="text">

                            <label for="img-url-1"></label>
                             <input id="img-url-1" placeholder="Img URL" type="text">

                                 <div class="line-divider"></div>

                             <label for="second-paragraph"></label>
                             <input id="second-paragraph" placeholder="First paragraph" type="text">

                             <label for="img-url-2"></label>
                             <input id="img-url-2" placeholder="Img URL" type="text">

                             <div class="line-divider"></div>

                             <label for="third-paragraph"></label>
                             <input id="third-paragraph" placeholder="First paragraph" type="text">

                             <label for="img-url-3"></label>
                             <input id="img-url-3" placeholder="Img URL" type="text">
                        </form>
                    </div>
                `;
                postsContainer.appendChild(blogPostElement);
            });

            // Attach event listeners to dynamically created elements
            const editButtons = document.querySelectorAll('.edit-btn');
            editButtons.forEach(editBtn => {
                editBtn.addEventListener('click', displayEditDropdown);
            });

            const saveButtons = document.querySelectorAll('.save-btn');
            saveButtons.forEach(saveBtn => {
                saveBtn.addEventListener('click', closeEditDropdown);
            });
        })
        .catch(error => console.log(error));
});





// //         if (editPostDropdownContent) {
// //             editPostDropdownContent.style.display = "block";
// //             editPostDropdownContent.classList.add('show-dropdown');
// //             // saveEditBtn.style.display = "block";
// //             // editPostBtn.style.display = "none";
// //             // deletePostBtn.style.display = "none";
// //         }
// //     }
