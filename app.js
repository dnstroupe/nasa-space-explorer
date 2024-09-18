const apiKey = 'x9dg16zAhzYaCc4qJWg1kCxq5Djt6yDQkXdKROxW';  

// Preloader animation: Remove the preloader once the page loads
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
});

// Dark Mode Toggle
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
};

// Fetch space data (image or video of the day) from the NASA API
const fetchSpaceData = async () => {
    const date = document.getElementById('date').value;
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
    const data = await response.json();
    displaySpaceContent(data);
};

// Display the fetched space content (either image or video)
const displaySpaceContent = (data) => {
    const spaceContent = document.getElementById('space-content');
    const isVideo = data.media_type === 'video';

    spaceContent.innerHTML = `
        <h2 class="text-3xl font-bold mb-4">${data.title}</h2>
        ${isVideo ? `<video src="${data.url}" controls></video>` : `<img src="${data.url}" alt="Space Image of the Day">`}
        <p class="mt-4">${data.explanation}</p>
    `;

    // Apply GSAP ScrollTrigger animation
    gsap.from("#space-content", {
        duration: 1.5,
        opacity: 0,
        y: 100,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#space-content",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    });
};

// List of random space facts (for the space fact generator)
const spaceFacts = [
    "One day on Venus is longer than one year on Earth.",
    "The Milky Way galaxy is 105,700 light-years wide.",
    "Olympus Mons on Mars is the largest volcano in our solar system.",
    "Saturn’s moon Titan has lakes of liquid methane.",
    "There could be 100 billion Earth-like planets in our galaxy."
];

// Generate a random space fact
const generateRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * spaceFacts.length);
    const fact = spaceFacts[randomIndex];
    document.getElementById('space-fact').innerText = fact;

    // GSAP animation for the fact text
    gsap.from("#space-fact", {
        duration: 1.5,
        opacity: 0,
        scale: 0.8,
        ease: "elastic.out(1, 0.3)"
    });
};

// Load today's space data on page load
window.onload = () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
    fetchSpaceData();

    // Floating astronaut movement with scroll
    gsap.to("#floating-astronaut", {
        y: -50,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: "#space-content",
            start: "top bottom",
            scrub: true
        }
    });
};
