document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("message");
    const airplane = document.querySelector(".airplane");
    const audio = document.querySelector("audio");

    // Ensure rain sound starts on user interaction
    document.addEventListener("mousemove", () => {
        audio.play().catch(() => {
            console.log("Autoplay blocked, waiting for user interaction...");
        });
    }, { once: true });

    // Allow pressing Enter to send message
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (input.value.trim() !== "") {
                animateAirplane();
                input.value = ""; // Clear after sending
            }
        }
    });

    function animateAirplane() {
        let x = 0;
        let y = 0;
        let scale = 1;
        let opacity = 1;
        let startTime = Date.now();

        airplane.style.display = "block"; // Make visible
        airplane.style.opacity = "1";
        airplane.style.transform = `translate(0, 0) scale(2)`;

        const interval = setInterval(() => {
            let elapsedTime = Date.now() - startTime;

            if (elapsedTime < 2000) {
                // First 3 seconds: Only move, no fading
                x += 2.5; // Slower movement
                y -= 2;
            } else {
                // After 3 seconds: Start fading and shrinking
                opacity -= 0.007; //fade effect
                scale -= 0.004;
            }

            airplane.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            airplane.style.opacity = opacity;

            if (opacity <= 0) {
                clearInterval(interval);
                airplane.style.display = "none"; // Hide after animation
            }
        }, 30);
    }
});
