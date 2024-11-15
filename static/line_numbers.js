function updateLineNumbers() {
    const content = document.getElementById('mainContent');
    const lineNumbers = document.getElementById('lineNumbers');
    
    // Clear existing line numbers
    lineNumbers.innerHTML = '';
    
    // Create line numbers matching the content elements
    Array.from(content.children).forEach((element, index) => {
        const computedStyle = window.getComputedStyle(element);
        const lineDiv = document.createElement('div');
        lineDiv.className = 'line-number';
        lineDiv.textContent = index + 1;
        
        // Copy exact styles from content element
        lineDiv.style.height = computedStyle.height;
        lineDiv.style.marginTop = computedStyle.marginTop;
        lineDiv.style.marginBottom = computedStyle.marginBottom;
        lineDiv.style.paddingTop = computedStyle.paddingTop;
        lineDiv.style.paddingBottom = computedStyle.paddingBottom;
        
        // Copy line height for text alignment
        lineDiv.style.lineHeight = computedStyle.lineHeight;
        
        lineNumbers.appendChild(lineDiv);
    });
}

// Ensure styles are computed after fonts are loaded
document.fonts.ready.then(() => {
    updateLineNumbers();
    // Additional delay to ensure all styles are properly computed
    setTimeout(updateLineNumbers, 100);
});

// Update on window resize
window.addEventListener('resize', updateLineNumbers);
