# Nordic Trekking Blog Interface

## Project Overview
Welcome to the Nordic Trekking Blog Interface project! This front-end user interface has been developed for an existing API blogging application with a focus on hiking and outdoor activities in Norway, including forest hikes, mountain trails, biking, and skiing. The application is designed to be responsive, allowing users to view dynamic blog posts and administrators to manage content effectively.

## Project Features
Blog Feed Page
Interactive banner carousel showcasing the 3 latest posts with navigation buttons.
Static list of the 12 latest posts displayed in a responsive thumbnail grid.
Each thumbnail and carousel item is clickable, directing users to the detailed blog post page.
### Blog Post Public Page
Responsive layout displaying post title, author, publication date, image banner, and content.
Shareable URL for each blog post with a query string or hash parameter containing the post ID.
Blog Post Edit Page
Restricted access to the owner for editing posts.
Delete button to remove posts via a DELETE request.
Validated form for updating title, body content, and images via a POST request.
Account Management Pages
Login Page: Validated form for logging in with email and password to manage posts.
Register Page: Validated form for creating a new account with name, email, and password.
Sitemap
/index.html - Blog Feed Page
/post/index.html - Blog Post Public Page
/post/edit.html - Blog Post Edit Page
/account/login.html - Account Login Page
/account/register.html - Account Register Page
API Endpoints
GET /blog/posts/<name>
GET /blog/posts/<name>/<id>
PUT /blog/posts/<name>/<id>
POST /blog/posts/<name>/<id>
DELETE /blog/posts/<name>/<id>
POST /auth/register
POST /auth/login
Note: <name> will be replaced by the registered username and <id> by the ID of the blog post.

Implementation Steps
Level 1 Process
Accept the GitHub Classroom brief.
Clone the Classroom Repository using GitHub Desktop.
Create a project plan using GitHub Projects.
Create wireframes using Figma.
Design high-fidelity assets and style guide using Figma.
Implement user stories using the plan and design documents.
Manually test each user story.
Deploy the project to a static hosting platform.
Validate HTML and WCAG compliance using online tools.
Deliver the required files:
Link to GitHub classroom repository
Link to public hosted demo
Link to Figma design assets
Link to public planning board
Login details for the admin user (email and password)
Level 2 Process (Optional)
Implement pagination for more than 12 posts.
Add sorting mechanisms for posts.
Add filter mechanisms to narrow post lists.
Implement search functionality to find specific posts.
Utilize container queries for advanced responsive layouts.
Project Screenshots
Admin Pages
Login Page

Register Page

Admin Dashboard

Edit Posts Page

User Pages
User Landing Page

Blog Archive

Single Blog Post

About Us Page

Deployment
This project is deployed at [Your Hosted URL].

Contributions
Contributions to this project are welcome. Please follow the standard fork, branch, and pull request workflow.

License
This project is licensed under the MIT License.
