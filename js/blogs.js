async function loadBlogs() {
    const featuredContainer = document.getElementById("featured-story");
    const smallStoriesContainer = document.getElementById("small-stories");

    try {
        const response = await fetch("http://127.0.0.1:8000/api/blogs");
        const result = await response.json();
        const blogs = result.data;

        if (!blogs || blogs.length === 0) return;

        // FEATURED STORY
        const featured = blogs[0];
        featuredContainer.innerHTML = `
            <div class="story">
                <div class="story-image" style="background-image: url('${featured.featured_image}')"></div>
                <div class="story-overlay">
                    <span class="story-tag">Featured</span>
                    <h3>${featured.title}</h3>
                    <p>${featured.content.substring(0, 120)}...</p>
                    <a href="blog.html?slug=${featured.slug}" class="story-link">Read More →</a>
                </div>
            </div>
        `;

        // SMALL STORIES
        smallStoriesContainer.innerHTML = "";
        blogs.slice(1, 4).forEach(blog => {
            smallStoriesContainer.innerHTML += `
                <div class="story small">
                    <div class="story-image" style="background-image: url('${blog.featured_image}')"></div>
                    <div class="story-overlay">
                        <span class="story-tag">Blog</span>
                        <h4>${blog.title}</h4>
                        <a href="blog.html?slug=${blog.slug}" class="story-link">Read More →</a>
                    </div>
                </div>
            `;
        });

    } catch (err) {
        console.error("Blog loading failed:", err);
    }
}

async function loadAllBlogs() {
    const container = document.getElementById("all-blogs");

    try {
        const response = await fetch("http://127.0.0.1:8000/api/blogs");
        const result = await response.json();
        
        container.innerHTML = result.data.map(blog => `
            <div class="blog-card">
                <div class="blog-image" style="background-image: url('${blog.featured_image}')"></div>
                <div class="blog-content">
                    <span class="blog-tag">Blog</span>
                    <h3>${blog.title}</h3>
                    <p>${blog.content.substring(0, 130)}...</p>
                    <a href="blog.html?slug=${blog.slug}" class="blog-link">Read More</a>
                </div>
            </div>
        `).join("");

    } catch (err) {
        console.error("Failed loading blogs:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadBlogs();
    loadAllBlogs();
});
