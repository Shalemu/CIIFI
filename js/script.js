
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    // Smooth reveal effect when scrolling
    const options = {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add("show-section");
            }
        });
    }, options);

    sections.forEach(sec => {
        observer.observe(sec);
    });

    // Active link highlight
    function setActive() {
        let scrollPos = window.scrollY + 120;

        sections.forEach(sec => {
            if (scrollPos >= sec.offsetTop &&
                scrollPos < sec.offsetTop + sec.offsetHeight) {

                navLinks.forEach(link => link.classList.remove("active"));

                const activeLink = document.querySelector(
                    `.nav-links a[href="#${sec.id}"]`
                );

                if (activeLink) activeLink.classList.add("active");
            }
        });
    }

    // Smooth click navigation
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId.startsWith("#")) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    window.addEventListener("scroll", setActive);
    setActive();
});

