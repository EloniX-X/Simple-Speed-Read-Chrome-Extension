var audio = new Audio('bulletimpact.mp3');
chrome.storage.local.get(["selectedText", "interval"], function(data) {
    if (data.selectedText) {
        let words = data.selectedText.split(" ");
        let index = 0;
        
        const intervalTime = data.interval || 5000; // Default to 5 seconds if no interval is set

        setInterval(function() {
            if (index < words.length) {
                document.getElementById("displayArea").innerText = words[index];
                index++;
                chrome.storage.local.get(['muteAudio'], function(data) {
                    if (data.muteAudio) {
                        // Mute audio logic
                    } else {
                  
                        audio.cloneNode().play()
                    }
                });
                  
                
            }
        }, intervalTime);
    }
});


