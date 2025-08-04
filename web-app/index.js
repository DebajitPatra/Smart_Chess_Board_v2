
     // Vanta.js and Three.js scripts 

  import "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
  import "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.cells.min.js"
   
        // Initialize Vanta.js animation on page load
        document.addEventListener('DOMContentLoaded', function() {
            VANTA.CELLS({
                el: "#vanta-bg",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 4.00,
                color1: 0x1e3a8b,      // Dark blue
                color2: 0x1e40af,      // Slightly lighter blue
                backgroundColor: 0x0D1117, // Original background color
                size: 10,
                speed: 0
            })
        });


        
  