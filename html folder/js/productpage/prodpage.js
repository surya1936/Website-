// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Shopping cart functionality
    const cartIcon = document.querySelector('.cart-icon');
    let cartCount = 0;
    
    // Add event listeners to all shop now buttons
    const shopButtons = document.querySelectorAll('.shop-now-btn');
    shopButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the plant name from the parent card
            const plantCard = this.closest('.plant-card');
            const plantName = plantCard.querySelector('h3').textContent;
            
            // Add to cart logic
            cartCount++;
            
            // Create notification
            showNotification(`${plantName} added to cart!`);
            
            // Update cart icon (visual feedback)
            updateCart();
        });
    });
    
    // Search functionality
    const searchIcon = document.querySelector('.search-icon');
    searchIcon.addEventListener('click', function(e) {
        e.preventDefault();
        toggleSearchBar();
    });
    
    // Function to show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '4px';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            // Remove from DOM after animation completes
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Function to update cart visual
    function updateCart() {
        // If cart badge doesn't exist, create it
        let cartBadge = document.querySelector('.cart-badge');
        
        if (!cartBadge) {
            cartBadge = document.createElement('span');
            cartBadge.className = 'cart-badge';
            cartIcon.appendChild(cartBadge);
            
            // Style the badge
            cartBadge.style.position = 'absolute';
            cartBadge.style.top = '-8px';
            cartBadge.style.right = '-8px';
            cartBadge.style.backgroundColor = '#4CAF50';
            cartBadge.style.color = 'white';
            cartBadge.style.borderRadius = '50%';
            cartBadge.style.width = '18px';
            cartBadge.style.height = '18px';
            cartBadge.style.fontSize = '12px';
            cartBadge.style.display = 'flex';
            cartBadge.style.justifyContent = 'center';
            cartBadge.style.alignItems = 'center';
        }
        
        // Update the count
        cartBadge.textContent = cartCount;
        
        // Make sure parent has position relative
        cartIcon.style.position = 'relative';
    }
    
    // Function to toggle search bar
    function toggleSearchBar() {
        // Check if search bar already exists
        let searchBar = document.querySelector('.search-bar');
        
        if (searchBar) {
            // Remove if it exists
            searchBar.remove();
        } else {
            // Create search bar
            searchBar = document.createElement('div');
            searchBar.className = 'search-bar';
            
            // Create input
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'Search for plants...';
            searchBar.appendChild(searchInput);
            
            // Create search button
            const searchButton = document.createElement('button');
            searchButton.innerHTML = '<i class="fas fa-search"></i>';
            searchBar.appendChild(searchButton);
            
            // Style the search bar
            searchBar.style.position = 'absolute';
            searchBar.style.top = '80px';
            searchBar.style.right = '40px';
            searchBar.style.display = 'flex';
            searchBar.style.zIndex = '100';
            
            // Style the input
            searchInput.style.padding = '10px';
            searchInput.style.border = '1px solid #ddd';
            searchInput.style.borderRadius = '4px 0 0 4px';
            searchInput.style.width = '250px';
            
            // Style the button
            searchButton.style.padding = '10px 15px';
            searchButton.style.backgroundColor = '#4CAF50';
            searchButton.style.color = 'white';
            searchButton.style.border = 'none';
            searchButton.style.borderRadius = '0 4px 4px 0';
            searchButton.style.cursor = 'pointer';
            
            // Add to header
            document.querySelector('header').appendChild(searchBar);
            
            // Focus on input
            searchInput.focus();
            
            // Handle search functionality
            searchButton.addEventListener('click', function() {
                performSearch(searchInput.value);
            });
            
            // Handle enter key
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch(searchInput.value);
                }
            });
        }
    }
    
    // Function to perform search
    function performSearch(query) {
        if (query.trim() === '') return;
        
        // Simple search functionality
        const plantCards = document.querySelectorAll('.plant-card');
        let found = false;
        
        plantCards.forEach(card => {
            const plantName = card.querySelector('h3').textContent.toLowerCase();
            const plantDesc = card.querySelector('p').textContent.toLowerCase();
            const searchTerm = query.toLowerCase();
            
            if (plantName.includes(searchTerm) || plantDesc.includes(searchTerm)) {
                // Highlight matched card
                card.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.7)';
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                found = true;
                
                // Reset highlight after 3 seconds
                setTimeout(() => {
                    card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                }, 3000);
            }
        });
        
        if (!found) {
            showNotification('No plants match your search');
        }
        
        // Close search bar
        document.querySelector('.search-bar').remove();
    }
    
    // Image hover effect
    const plantImages = document.querySelectorAll('.plant-image img');
    plantImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
 // Hide/Show header on scroll - START
 const header = document.querySelector('header');
 let lastScrollTop = 0;
 let headerHeight = header.offsetHeight;
 
 // Apply initial styles for smooth transitions
 header.style.position = 'fixed';
 header.style.width = '100%';
 header.style.top = '0';
 header.style.zIndex = '1000';
 header.style.transition = 'transform 0.3s ease-in-out';
 
 // Add padding to body to prevent content jump
 document.body.style.paddingTop = headerHeight + 'px';
 
 window.addEventListener('scroll', function() {
     let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
     
     // Don't do anything if scroll position is at the very top
     if (scrollTop <= 10) {
         header.style.transform = 'translateY(0)';
         return;
     }
     
     // Scrolling down
     if (scrollTop > lastScrollTop) {
         header.style.transform = `translateY(-${headerHeight}px)`;
     } 
     // Scrolling up
     else {
         header.style.transform = 'translateY(0)';
     }
     
     lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
 }, false);
 
 // Update header height on window resize
 window.addEventListener('resize', function() {
     headerHeight = header.offsetHeight;
     document.body.style.paddingTop = headerHeight + 'px';
 });
 // Hide/Show header on scroll - END


    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip for search and cart icons
            if (this.classList.contains('search-icon') || this.classList.contains('cart-icon')) {
                return;
            }
            
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});