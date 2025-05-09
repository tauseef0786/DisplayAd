document.addEventListener('DOMContentLoaded', () => {
    const screens = {
        intro: document.getElementById('screen-intro'),
        map: document.getElementById('screen-map'),
        final: document.getElementById('screen-final')
    };

    const introCTAButton = document.getElementById('intro-cta-button');
    const worldMap = document.getElementById('world-map');
    const mapViewport = document.getElementById('map-viewport');
    const youAreHereMarker = document.getElementById('you-are-here-marker');
    const pinsContainer = document.getElementById('pins-container');
    const mapHintText = document.getElementById('map-hint-text');
    const feedbackImg = document.getElementById('feedback-message-img');
    const video = document.getElementById('ulajh-video');
    const unmuteButton = document.getElementById('unmute-button');
    const finalCTA = document.getElementById('final-cta');

    let currentQuestion = 1;
    let mapInitialized = false; // To ensure map setup runs once

    // Estimated coordinates for map views.
    // These define the center point of the map image that should be in the center of the viewport,
    // and the width of the map image that should be visible (scaled to viewport width).
    const indiaView = { centerX: 1050, centerY: 580, visibleWidth: 700 }; // For map.png 1920x1080
    const europeView = { centerX: 700, centerY: 380, visibleWidth: 1200 };

    // Map transition duration should match CSS: 1.5s = 1500ms
    const MAP_TRANSITION_DURATION = 1500; 

    function showScreen(screenName) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        screens[screenName].classList.add('active');
    }
    
    introCTAButton.addEventListener('click', () => {
        showScreen('map');
        mapHintText.src = 'assets/hint_text1.png'; // Set Q1 hint
        currentQuestion = 1;
        pinsContainer.innerHTML = ''; // Clear any old pins if re-entering
        pinsContainer.style.display = 'none'; // Hide pins initially

        if (!mapInitialized) {
            setupMapView(indiaView.centerX, indiaView.centerY, indiaView.visibleWidth, false); // Show India, no animation
            youAreHereMarker.style.display = 'flex';
            
            // Delay before panning to Europe
            setTimeout(() => {
                youAreHereMarker.style.display = 'none';
                setupMapView(europeView.centerX, europeView.centerY, europeView.visibleWidth, true); // Animate to Europe

                // Create pins after map transition to Europe is complete
                setTimeout(() => {
                    pinsContainer.style.display = 'block';
                    createPins();
                }, MAP_TRANSITION_DURATION + 100); // +100ms buffer
            }, 4000); // 4 seconds to view India, then pan starts

            mapInitialized = true;
        } else {
             // If map was already initialized, go straight to Europe view for Q1 (not in primary GIF flow)
            youAreHereMarker.style.display = 'none';
            setupMapView(europeView.centerX, europeView.centerY, europeView.visibleWidth, true); // Animate to Europe
            setTimeout(() => {
                pinsContainer.style.display = 'block';
                createPins();
            }, MAP_TRANSITION_DURATION + 100);
        }
    });

    function setupMapView(targetCenterX, targetCenterY, visibleMapWidth, animate) {
        const scale = mapViewport.clientWidth / visibleMapWidth;

        worldMap.style.transition = animate ? `transform ${MAP_TRANSITION_DURATION/1000}s ease-out, left ${MAP_TRANSITION_DURATION/1000}s ease-out, top ${MAP_TRANSITION_DURATION/1000}s ease-out` : 'none';
        
        worldMap.style.transform = `scale(${scale})`;
        const mapLeft = (mapViewport.clientWidth / 2) - (targetCenterX * scale);
        const mapTop = (mapViewport.clientHeight / 2) - (targetCenterY * scale);
        
        // Force reflow if not animating to apply initial state before enabling transition for next step
        if (!animate) {
            worldMap.offsetHeight; // Trigger reflow
        }
        
        worldMap.style.left = `${mapLeft}px`;
        worldMap.style.top = `${mapTop}px`;

        // Position "YOU ARE HERE" marker for India view (done by caller)
        if (targetCenterX === indiaView.centerX) { // Approx check for India view
             youAreHereMarker.style.left = '50%'; 
             youAreHereMarker.style.top = '50%';
        }
    }


    const pinData = [
        // { name: "COUNTRY", countryId: "id", left_percentage: "X%", top_percentage: "Y%" }
        // Fine-tune these % values by testing against your demo GIF's visual placements
        { name: "NORWAY", countryId: "norway", left: "48%", top: "15%" },
        { name: "SWEDEN", countryId: "sweden", left: "58%", top: "20%" },
        { name: "ENGLAND", countryId: "england", left: "30%", top: "35%" },
        { name: "GERMANY", countryId: "germany", left: "45%", top: "42%" },
        { name: "POLAND", countryId: "poland", left: "60%", top: "40%" },
        { name: "FRANCE", countryId: "france", left: "35%", top: "55%" },
        { name: "ITALY", countryId: "italy", left: "48%", top: "70%" },
        { name: "SPAIN", countryId: "spain", left: "18%", top: "75%" },
    ];

    function createPins() {
        pinsContainer.innerHTML = ''; // Clear existing pins
        pinData.forEach(p => {
            const pinEl = document.createElement('div');
            pinEl.classList.add('map-pin');
            pinEl.dataset.country = p.countryId; // Use countryId for logic
            pinEl.style.left = p.left;
            pinEl.style.top = p.top;
            // This transform makes the provided left/top the actual tip of the pin
            pinEl.style.transform = `translate(-50%, -100%)`; 

            const markerSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            markerSvg.setAttribute("class", "pin-svg-marker");
            markerSvg.setAttribute("viewBox", "0 0 30 42");
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", "M15 0 C6.716 0 0 6.716 0 15 C0 23.284 15 42 15 42 S30 23.284 30 15 C30 6.716 23.284 0 15 0 Z M15 22.5 A7.5 7.5 0 1 1 15 7.5 A7.5 7.5 0 0 1 15 22.5 Z");
            path.setAttribute("fill", "red");
            markerSvg.appendChild(path);
            pinEl.appendChild(markerSvg);

            const label = document.createElement('span');
            label.classList.add('pin-label');
            label.textContent = p.name;
            pinEl.appendChild(label);

            pinEl.addEventListener('click', () => handlePinClick(p.countryId));
            pinsContainer.appendChild(pinEl);
        });
    }

    function handlePinClick(clickedCountryId) {
        let correct = false;
        if (currentQuestion === 1 && clickedCountryId === 'italy') {
            correct = true;
        } else if (currentQuestion === 2 && clickedCountryId === 'france') {
            correct = true;
        }

        if (correct) {
            feedbackImg.src = (currentQuestion === 1) ? 'assets/correct.png' : 'assets/goodjob_text.png';
            feedbackImg.style.display = 'block';
            setTimeout(() => {
                feedbackImg.style.display = 'none';
                if (currentQuestion === 1) {
                    currentQuestion = 2;
                    mapHintText.src = 'assets/hint_text2.png'; // Change to Q2 hint
                } else {
                    showScreen('final');
                    if (video.paused) video.play(); 
                }
            }, 1800); // Duration to show "Correct" or "Good Job"
        } else {
            feedbackImg.src = 'assets/A incorrect.png'; // Note: filename "A incorrect.png"
            feedbackImg.style.display = 'block';
            setTimeout(() => {
                feedbackImg.style.display = 'none';
            }, 1500); // Duration to show "Incorrect"
        }
    }

    unmuteButton.addEventListener('click', () => {
        video.muted = !video.muted;
        unmuteButton.textContent = video.muted ? 'UNMUTE' : 'MUTE';
    });

    finalCTA.addEventListener('click', () => {
        window.open('https://www.example.com', '_blank'); // Replace with actual link
    });

    // Start with the intro screen
    showScreen('intro');
});