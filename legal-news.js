document.addEventListener("DOMContentLoaded", () => {
    // Fetch the posts from the JSON file
    fetch('posts.json')
        .then(response => response.json()) // Convert the JSON data into a JavaScript object
        .then(posts => {
            // Sort posts by date (newest first)
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));

            const postsContainer = document.getElementById('posts');
            
            posts.forEach(post => {
                // Create an HTML element for each post
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                
                // Format the date
                const postDate = new Date(post.date).toLocaleDateString();
                
                // Set the content of the post (title, date, content, image, link)
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p><strong>${postDate}</strong></p>
                    <p>${post.content}</p>
                    <img src="${post.image}" alt="${post.title}" style="max-width: 100%; height: auto;">
                    <a href="${post.link}" target="_blank">Read more</a>
                `;
                
                // Add the post to the page
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error("Error fetching posts:", error);
        });
});
