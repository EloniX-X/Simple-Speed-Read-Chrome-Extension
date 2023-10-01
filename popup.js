document.addEventListener('DOMContentLoaded', function() {
  let slider = document.getElementById('slider');
  let sliderValueLabel = document.getElementById('sliderValue');

  slider.addEventListener('input', function() {
      sliderValueLabel.textContent = slider.value + " wpm";
      let intervalTime = (60 / slider.value) * 1000; // Convert WPM to interval in ms
      chrome.storage.local.set({
        interval: intervalTime,
        wpm: slider.value  // Store the WPM value
    });
  });

  chrome.storage.local.get(['wpm'], function(data) {
    if (data.wpm) {
        slider.value = data.wpm;  // Set the slider's value
        sliderValueLabel.textContent = data.wpm + " WPM";  // Display the WPM value
    }
  });
  let muteCheckbox = document.getElementById("muteaudio");

  muteCheckbox.addEventListener("change", function() {
      if (muteCheckbox.checked) {
          chrome.storage.local.set({ muteAudio: true });
      } else {
          chrome.storage.local.set({ muteAudio: false });
      }
  });

  chrome.storage.local.get(['muteAudio'], function(data) {
    if (typeof data.muteAudio !== 'undefined') {
        muteCheckbox.checked = data.muteAudio;
    }
  });

});



