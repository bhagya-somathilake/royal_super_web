document.addEventListener("DOMContentLoaded", () => {
    
    // Function to animate the numbers
    const animateCounter = (el) => {
        const target = parseFloat(el.dataset.target);
        const isDecimal = el.dataset.decimal === 'true';
        const isM = target === 6; // Special case for "6M+"
        
        let current = 0;
        const duration = 2000; // 2 seconds
        const stepTime = 20; // run every 20ms
        const steps = duration / stepTime;
        const increment = target / steps;
        
        const updateText = () => {
            current += increment;
            
            if (current >= target) {
                // We've reached the target
                if (isM) {
                    el.innerText = '6M+'; // Add the "M+"
                } else if (isDecimal) {
                    el.innerText = target.toFixed(1); // Format to one decimal place
                } else {
                    el.innerText = Math.floor(target);
                }
                clearInterval(timer);
            } else {
                // Update text during animation
                if (isDecimal) {
                    el.innerText = current.toFixed(1);
                } else {
                    el.innerText = Math.floor(current);
                }
            }
        };

        const timer = setInterval(updateText, stepTime);
    };

    // Use Intersection Observer to trigger animation on scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterElement = entry.target;
                animateCounter(counterElement);
                observer.unobserve(counterElement); // Stop observing after it has animated
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    // Observe each .stat-number element
    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });
});