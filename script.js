document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("message");
    const airplane = document.querySelector(".airplane");

// Allow pressing Enter to send message and fetch a new quote
// Assuming 'input' is defined and references your text input element
    const leadParagraph = document.getElementById("lead-text");
    const form = document.querySelector("form");
    const quoteElement = document.getElementById("quote");
  
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
    
            if (input.value.trim() !== "") {
                animateAirplane();
                input.value = ""; // Clear after sending
    
                // Fade out paragraph and form
                leadParagraph.classList.add("fade-out");
                form.classList.add("fade-out");
    
                setTimeout(() => {
                    leadParagraph.style.visibility = "hidden";
                    form.style.visibility = "hidden";
    
                    // Fetch the quote
                    fetch('https://qapi.vercel.app/api/random')
                    .then(response => response.json())
                    .then(data => {
                        quoteElement.textContent = `"${data.quote}" - ${data.author}`;
    
                        // Show the quote
                        quoteElement.style.visibility = "visible";
                        quoteElement.style.opacity = "1";
                        quoteElement.classList.remove("fade-out");
                        quoteElement.classList.add("fade-in");
                    })
                    .catch(error => {
                        console.error("Error fetching quote:", error);
                    });
    
                    // Hide the quote after 3 seconds and restore the paragraph & form
                    setTimeout(() => {
                        quoteElement.classList.remove("fade-in");
                        quoteElement.classList.add("fade-out");
    
                        setTimeout(() => {
                            // Hide the quote
                            quoteElement.style.visibility = "hidden";
                            quoteElement.style.opacity = "0";
    
                            // Restore paragraph & form
                            leadParagraph.style.visibility = "visible";
                            form.style.visibility = "visible";
                            leadParagraph.classList.remove("fade-out");
                            form.classList.remove("fade-out");
                            leadParagraph.classList.add("fade-in");
                            form.classList.add("fade-in");
                        }, 500);
                    }, 6000); // How long the quote stays visible
                }, 500); // Delay to allow fade-out animation
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
    const path = window.location.pathname;
    if (path === "/" || path.endsWith("index.html")) {
        const backgrounds = [
            { img: 'images/fireplace.gif', sound: 'sounds/firesound.mp3', overlay:'rgba(138, 55, 190, 12)'},
            { img: 'images/rain_image.gif', sound: 'sounds/rainsound.mp3', overlay:'rgba(255, 105, 97, 12)'},
            { img: 'images/thundercloud.gif', sound: 'sounds/thundersound.mp3', overlay:'rgba(155, 201, 186, 12)'},
            { img: 'images/windflower.gif', sound: 'sounds/windsound.mp3', overlay:'rgba(20,56,166, 12)'},
        ];

        // Pick a random background
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        const selected = backgrounds[randomIndex];
        
        function preloadImage(url, callback) {
            const img = new Image();
            img.src = url;
            img.onload = callback;
        }
        // Set the background image on the body or a specific container
        preloadImage(selected.img, () => {
            document.body.style.background = `url('${selected.img}'),${selected.overlay}`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundBlendMode = 'overlay';
            document.body.style.backgroundRepeat= "no-repeat";
        });
       // create audio with customizations  
        const wavesurfer = WaveSurfer.create({
            container: '#waveform',
            height: 50,
            width:200,
            autoplay: true,
            waveColor: 'white',
            progressColor: '#383351',
            mediaControls: true,
            barRadius: 10,
            barWidth: 2,
            cursorColor: 'transparent',
            barGap: 2,
            url: `${selected.sound}`,
          })
          wavesurfer.on('finish', () => {
            wavesurfer.play();
        });
        document.addEventListener("click", () => {
            if (wavesurfer && wavesurfer.backend.ac.state === "suspended") {
              wavesurfer.backend.ac.resume().then(() => {
                console.log("Audio context resumed");
              });
            }
          });
          
    }

});
