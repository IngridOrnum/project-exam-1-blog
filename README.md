# Nordic Trekking Blog - Exam Project 1

## Project Description
The Nordic Trekking Blog Interface is a front-end user interface for an API-driven blogging application focused on hiking and outdoor activities in Norway. The application allows users to explore various hiking, skiing, and biking trips with detailed recommendations and beautiful imagery. This project also provides an admin interface for content management where blogs can be created, deleted or edited.

This project was a project exam while studying on Noroff School of Technology and Digital Media. 

## Table of contents:
- [User Features](#user-features)
- [Admin Features](#admin-features)
- [Tech Used](#tech-used)
- [Challenges Faced](#challenges-faced)
- [Future Feautures](#future-features)
- [Deployment and Project Links](#deployment-and-project-links)
- [Licence](#licence)

## User Features
* Interactive Landing Page: Includes an automatic and manual carousel showcasing the three latest posts, a static thumbnail grid displaying the latest 12 posts, an about page link, and a highlighted post link.
* Blog Archive: Users can filter blog posts using multiple filters to find content that matches their interests, like region, difficulty, season and activity.
* Detailed Blog Post View: Each blog post page displays comprehensive details including the post title, author, publication date, banner image, and content.
* About Page: Provides information about the blog and its mission.

## Admin Features
* Account Management: Admins can register and log in with validation. Error handling is implemented for incorrect inputs, empty fields or false login information.
* Admin Dashboard: Displays the logged-in user's name and provides options to create or edit posts.
* Post Creation: A form for creating new posts. The user will recieve alerts indicating the success or failure of the publishing process.
* Post Editing: An edit page where admins can update or delete posts, with alerts confirming the success or failure of these actions. A confirmation prompt is shown before deletion, and posts can be filtered for easier management.

## Tech Used
* HTML, CSS, JavaScript: Core technologies for building the front-end interface.
* ChatGPT: Used for debugging and assistance during development.
* Figma: For designing wireframes and high-fidelity assets.
* FontAwesome: For incorporating icons into the interface.
* Google Fonts: For typography and enhancing the visual appeal.
* Youtube: For inspiration and tips for various of challenges during the project.

## Challenges Faced
1. API Integration: This was my first experience with API-based login and registration, and handling access tokens. Initially, this was a challenging concept, but I now have a much better understanding.
2. Content Structuring: The provided API had limitations, such as a single string for the body content and only one image per post. To address this, I used ChatGPT to help split the body content into multiple paragraphs and include additional images.
3. Design Adjustments: I had to adjust my initial design to align better with the API's capabilities, simplifying some aspects to streamline development.
4. New Design Techniques: Implementing a parallax effect for the background image on the user landing page was a new experience, and I learned a lot from incorporating this effect.

## Future Features
For further development of this blog, I would like to add folloging features:
* Search Functionality: To help users find specific posts quickly.
* More interesting design and design effects.
* Preview of the blog post before creating post on admin pages.

## Deployment and Project Links
* [User pages (deployed on Vercel)](https://project-exam-1-blog.vercel.app/user/index.html)
* [Admin pages (deployed on Vercel)](https://project-exam-1-blog.vercel.app/admin/account/login.html)
* [GitHub Repository](https://github.com/IngridOrnum/project-exam-1-blog)
* [GitHub Board](https://github.com/users/IngridOrnum/projects/11/views/1)
* [Figma Design](https://www.figma.com/design/h2OCILAUmPbyg0Pa2o1TzH/Exam-Project-1?node-id=1%3A5&t=MMt9nOGpAecWT2rN-1)

## License
This project is licensed under the MIT License.
