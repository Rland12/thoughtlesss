document.getElementById("message").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
         event.preventDefault();
        sendToVoid();
    }
});
//plane need to fade into the distance and go further.
function sendToVoid() {
    const input = document.getElementById("message");
    const airplane = document.querySelector(".airplane");

    if (input.value.trim() === "") return;

    airplane.style.opacity = "1";
    airplane.style.transform = "translate(100px, -150px) rotate(20deg)";

    setTimeout(() => {
        airplane.style.opacity = "0";
        airplane.style.transform = "translate(0, 0)";
        input.value = "";
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.querySelector("audio");
   
    audio.muted = false;
    audio.play();
    // Try playing on page load (might get blocked)
    audio.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction...");
    });

 
 
});
