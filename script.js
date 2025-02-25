document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("message");
    const airplane = document.querySelector(".airplane");


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

document.addEventListener("DOMContentLoaded", () => {
    // Array of background objects with image and sound
    //do same with background colors
    const path = window.location.pathname;
    if (path === "/" || path.endsWith("index.html")) {
        const backgrounds = [
            { img: 'images/fireplace.gif', sound: 'sounds/firesound.mp3' },
            { img: 'images/rain_image.gif', sound: 'sounds/rainsound.mp3' },
            { img: 'images/thundercloud.gif', sound: 'sounds/thundersound.mp3' },
            { img: 'images/windflower.gif', sound: 'sounds/windsound.mp3' },
        ];

        // Pick a random background
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        const selected = backgrounds[randomIndex];

        // Set the background image on the body or a specific container
        document.body.style.backgroundImage = `url('${selected.img}')`;

       // create audio with customizations  
        const wavesurfer = WaveSurfer.create({
            container: '#waveform',
            height: 50,
            width:200,
            autoplay: true,
            waveColor: 'white',
            progressColor: '#383351',
            barRadius: 10,
            barWidth: 2,
            cursorColor: 'transparent',
            barGap: 2,
            url: `${selected.sound}`,
          })
          wavesurfer.on('finish', () => {
            wavesurfer.play();
        });
          wavesurfer.on('interaction', () => {
            wavesurfer.playPause();
          })
    }
});
