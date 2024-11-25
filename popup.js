document.getElementById("startButton").addEventListener("click", () => {
  timerStart()
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    timerStart()
  }
})

function timerStart() {
    const button = document.getElementById("startButton");
    button.style.transition = "transform 0.5s ease-in-out";
    button.style.transform = "scale(15)";
    button.style.background = "#048B9A";
    button.textContent = ""
    
    const inputElement = document.getElementById("timer");
    let timeRemaining = parseInt(inputElement.value, 10);
  
    if (isNaN(timeRemaining) || timeRemaining <= 0) {
      timeRemaining = 30
    }
    chrome.runtime.sendMessage({ action: "timerstart " + timeRemaining });
    timer = 1
    setTimeout(() => {
      window.close();
    }, 500);
}