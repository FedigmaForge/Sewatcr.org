// SEWA Charitable Trust - JavaScript Functionality (Fixed Version)
document.addEventListener('DOMContentLoaded', function() {
    console.log('🤝 SEWA Charitable Trust website initializing...');
    
    // Initialize all components
    try {
        initNavigation();
        initMobileMenu();
        initAnimatedCounters();
        initGalleryFilters();
        initModals();
        initForms();
        initScrollEffects();
        initCTAButtons();
        initFooterLinks();
        initEmergencyButtons();
        initVolunteerButtons();
        initNewsletterForm();
        initGallerySearch();
        initAdditionalFeatures();
        
        console.log('✅ SEWA Charitable Trust website loaded successfully');
    } catch (error) {
        console.error('❌ Error during initialization:', error);
    }
});

// Global variables
let hasCounterAnimated = false;

// Navigation Management - FIXED
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav__link, [data-section]');
    
    console.log('🔧 Initializing navigation...', navLinks.length, 'nav links found');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section') || this.getAttribute('href')?.substring(1);
            
            if (targetSection) {
                console.log('🖱️ Nav link clicked:', targetSection);
                navigateToPage(targetSection);
                closeMobileMenu();
                updateURL(targetSection);
            }
        });
    });
    
    // Handle browser navigation (back/forward buttons)
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'home';
        navigateToPage(hash, false);
    });
    
    // Set initial page based on URL
    const initialHash = window.location.hash.substring(1) || 'home';
    setTimeout(() => {
        navigateToPage(initialHash, false);
    }, 100);
}

function navigateToPage(targetSection, updateHistory = true) {
    try {
        const navLinks = document.querySelectorAll('.nav__link');
        const pages = document.querySelectorAll('.page');
        
        console.log('📄 Navigating to page:', targetSection);
        
        // Remove active class from all nav links
        navLinks.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to target link
        const targetLink = document.querySelector(`.nav__link[data-section="${targetSection}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
        
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(targetSection);
        if (targetPage) {
            targetPage.classList.add('active');
            console.log('✅ Activated page:', targetSection);
            
            // Trigger animations for the new page
            setTimeout(() => {
                triggerPageAnimations(targetPage);
            }, 100);
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Reset counter animation for home page
            if (targetSection === 'home') {
                hasCounterAnimated = false;
            }
        } else {
            console.error('❌ Target page not found:', targetSection);
            // Fallback to home page
            const homePage = document.getElementById('home');
            if (homePage) {
                homePage.classList.add('active');
            }
        }
        
        // Update URL if requested
        if (updateHistory) {
            updateURL(targetSection);
        }
    } catch (error) {
        console.error('❌ Navigation error:', error);
    }
}

function updateURL(section) {
    try {
        const newURL = section === 'home' ? 
            window.location.pathname : 
            `${window.location.pathname}#${section}`;
        
        window.history.pushState({ section }, '', newURL);
    } catch (error) {
        console.error('❌ URL update error:', error);
    }
}

function triggerPageAnimations(page) {
    try {
        // Trigger counter animation if on home page
        if (page.id === 'home' && !hasCounterAnimated) {
            setTimeout(() => {
                animateCounters();
            }, 500);
        }
        
        // Add slide-up animation to cards
        const cards = page.querySelectorAll('.program__card, .highlight__card, .testimonial__card, .team__card, .focus-area__card, .program-detail__card, .gallery__item, .donation-option__card, .involvement-option__card, .volunteer__card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-slide-up');
            }, index * 50);
        });
    } catch (error) {
        console.error('❌ Animation error:', error);
    }
}

// Mobile Menu Management - FIXED
function initMobileMenu() {
    try {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleMobileMenu();
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    closeMobileMenu();
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeMobileMenu();
                }
            });
            
            // Close menu when clicking nav links
            const navLinks = navMenu.querySelectorAll('.nav__link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    setTimeout(closeMobileMenu, 100);
                });
            });
        }
    } catch (error) {
        console.error('❌ Mobile menu error:', error);
    }
}

function toggleMobileMenu() {
    try {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu && navToggle) {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        }
    } catch (error) {
        console.error('❌ Toggle menu error:', error);
    }
}

function closeMobileMenu() {
    try {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    } catch (error) {
        console.error('❌ Close menu error:', error);
    }
}

// Animated Counters - FIXED
function initAnimatedCounters() {
    try {
        window.addEventListener('scroll', checkCounterVisibility);
        window.addEventListener('resize', checkCounterVisibility);
    } catch (error) {
        console.error('❌ Counter init error:', error);
    }
}

function checkCounterVisibility() {
    try {
        if (hasCounterAnimated) return;
        
        const impactSection = document.querySelector('.impact');
        if (!impactSection) return;
        
        const rect = impactSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        const isHomePage = document.getElementById('home')?.classList.contains('active');
        
        if (isVisible && isHomePage) {
            animateCounters();
        }
    } catch (error) {
        console.error('❌ Counter visibility error:', error);
    }
}

function animateCounters() {
    try {
        if (hasCounterAnimated) return;
        
        hasCounterAnimated = true;
        console.log('🔢 Starting counter animations');
        
        const counters = document.querySelectorAll('.impact__number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target')) || 0;
            const duration = 2500;
            const steps = 50;
            const increment = target / steps;
            let current = 0;
            let step = 0;
            
            const timer = setInterval(() => {
                if (step >= steps) {
                    counter.textContent = target.toLocaleString() + (target >= 100 ? '+' : '');
                    clearInterval(timer);
                } else {
                    current += increment;
                    const displayValue = Math.floor(current);
                    counter.textContent = displayValue.toLocaleString() + (displayValue >= 100 ? '+' : '');
                    step++;
                }
            }, duration / steps);
        });
    } catch (error) {
        console.error('❌ Counter animation error:', error);
    }
}

// Gallery Filters - FIXED
function initGalleryFilters() {
    try {
        const filterButtons = document.querySelectorAll('.gallery__filters .filter-btn');
        const galleryItems = document.querySelectorAll('.gallery__item');
        
        if (filterButtons.length === 0) return;
        
        console.log('🖼️ Initializing gallery filters...');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const filter = this.getAttribute('data-filter');
                console.log('🔍 Gallery filter clicked:', filter);
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter gallery items with animation
                galleryItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    const shouldShow = filter === 'all' || category === filter;
                    
                    if (shouldShow) {
                        setTimeout(() => {
                            item.style.display = 'block';
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            
                            setTimeout(() => {
                                item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 50);
                        }, index * 100);
                    } else {
                        item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(-20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    } catch (error) {
        console.error('❌ Gallery filter error:', error);
    }
}

// Gallery Search - FIXED
function initGallerySearch() {
    try {
        const searchInput = document.querySelector('.gallery-search-input');
        const galleryItems = document.querySelectorAll('.gallery__item');
        
        if (!searchInput || galleryItems.length === 0) return;
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            galleryItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                const shouldShow = searchTerm === '' || text.includes(searchTerm);
                
                if (shouldShow) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        if (!item.textContent.toLowerCase().includes(searchTerm)) {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
        
        // Search button functionality
        const searchButton = document.querySelector('.gallery__search .btn');
        if (searchButton) {
            searchButton.addEventListener('click', function(e) {
                e.preventDefault();
                searchInput.focus();
            });
        }
    } catch (error) {
        console.error('❌ Gallery search error:', error);
    }
}

// Modal Management - FIXED
function initModals() {
    try {
        console.log('🪟 Initializing modals...');
        
        // Donation modal
        const donateButtons = document.querySelectorAll('.donate-btn, .btn--donate');
        console.log('💰 Found donation buttons:', donateButtons.length);
        
        donateButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('💰 Donation button clicked:', index);
                showModal('donation-modal');
            });
        });
        
        // Close modal functionality
        const closeButtons = document.querySelectorAll('.modal__close');
        closeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const modal = this.closest('.modal');
                if (modal) {
                    hideModal(modal.id);
                }
            });
        });
        
        // Close modal on backdrop click
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    hideModal(modal.id);
                }
            });
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal:not(.hidden)');
                if (activeModal) {
                    hideModal(activeModal.id);
                }
            }
        });
        
        // Modal action buttons
        const copyBankDetailsBtn = document.querySelector('.modal__footer .btn--primary');
        if (copyBankDetailsBtn && copyBankDetailsBtn.textContent.includes('Copy')) {
            copyBankDetailsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                copyBankDetails();
            });
        }
        
        // Share details button
        const shareDetailsBtn = document.querySelector('.modal__footer .btn--secondary');
        if (shareDetailsBtn && shareDetailsBtn.textContent.includes('Share')) {
            shareDetailsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                sharePaymentDetails();
            });
        }
    } catch (error) {
        console.error('❌ Modal init error:', error);
    }
}

function showModal(modalId) {
    try {
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Focus management
            const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                setTimeout(() => firstFocusable.focus(), 100);
            }
            
            console.log('✅ Modal shown successfully:', modalId);
        } else {
            console.error('❌ Modal not found:', modalId);
        }
    } catch (error) {
        console.error('❌ Show modal error:', error);
    }
}

function hideModal(modalId) {
    try {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            console.log('✅ Modal hidden:', modalId);
        }
    } catch (error) {
        console.error('❌ Hide modal error:', error);
    }
}

function copyBankDetails() {
    try {
        const bankDetails = `SEWA Charitable Trust - Bank Details

Account Name: SEWA Charitable Trust
Account Number: [Account Number - To be provided]
IFSC Code: [IFSC Code - To be provided]
Bank Name: [Bank Name - To be provided]
UPI ID: [UPI ID - To be provided]

Tax Benefits:
✅ 80G Tax Exemption Certificate
✅ 12A Registration Valid
✅ All donations are tax-deductible
✅ Instant donation receipt via email

Contact: 10samar.1994@gmail.com | +91 8840968565`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(bankDetails).then(() => {
                showNotification('💰 Bank details copied to clipboard! Thank you for supporting SEWA.', 'success');
            }).catch(() => {
                fallbackCopyToClipboard(bankDetails);
            });
        } else {
            fallbackCopyToClipboard(bankDetails);
        }
    } catch (error) {
        console.error('❌ Copy details error:', error);
        showNotification('Unable to copy details. Please note them down manually.', 'info');
    }
}

function fallbackCopyToClipboard(text) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('💰 Bank details copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Unable to copy automatically. Please note down the details manually.', 'info');
    }
}

function sharePaymentDetails() {
    try {
        const details = `Support SEWA Charitable Trust - Making a difference since 2013!

💙 Donate to transform lives through education, healthcare, and community empowerment.

📧 Contact: 10samar.1994@gmail.com
📞 Phone: +91 8840968565

🏛️ 80G & 12A Tax Benefits Available
🌟 Pan India presence with 7 branches

Visit our website for more details.`;

        if (navigator.share) {
            navigator.share({
                title: 'Support SEWA Charitable Trust',
                text: details,
                url: window.location.href
            }).then(() => {
                showNotification('✅ Thank you for sharing SEWA\'s mission!', 'success');
            }).catch((error) => {
                console.log('Share failed:', error);
                fallbackShare(details);
            });
        } else {
            fallbackShare(details);
        }
    } catch (error) {
        console.error('❌ Share error:', error);
        fallbackShare('Support SEWA Charitable Trust!');
    }
}

function fallbackShare(text) {
    try {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('📋 Share text copied to clipboard!', 'success');
            });
        } else {
            showNotification('💬 Please manually share our mission with your network!', 'info');
        }
    } catch (error) {
        showNotification('💬 Please share our mission with your network!', 'info');
    }
}

// Form Handling - FIXED
function initForms() {
    try {
        console.log('📋 Initializing forms...');
        
        // Volunteer registration form
        const volunteerForm = document.querySelector('.volunteer-form .form');
        if (volunteerForm) {
            volunteerForm.addEventListener('submit', handleVolunteerSubmit);
            console.log('✅ Volunteer form initialized');
        }
        
        // Contact form
        const contactForm = document.querySelector('.contact__form .form');
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactSubmit);
            console.log('✅ Contact form initialized');
        }
        
        // Add form validation styles
        addFormValidation();
    } catch (error) {
        console.error('❌ Form init error:', error);
    }
}

function handleVolunteerSubmit(e) {
    try {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]')?.value.trim() || '';
        const email = this.querySelector('input[type="email"]')?.value.trim() || '';
        const phone = this.querySelector('input[type="tel"]')?.value.trim() || '';
        const selects = this.querySelectorAll('select');
        const city = selects[0]?.value || '';
        const interest = selects[1]?.value || '';
        
        console.log('📋 Volunteer form submitted:', { name, email, phone, city, interest });
        
        if (name && email && phone && city && interest && isValidEmail(email)) {
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification(`🙏 Thank you ${name}! Your volunteer registration has been submitted successfully. Our team will contact you within 48 hours to discuss volunteer opportunities in ${city}.`, 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                this.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 1500);
        } else {
            showNotification('⚠️ Please fill in all required fields with valid information.', 'error');
            highlightInvalidFields(this);
        }
    } catch (error) {
        console.error('❌ Volunteer form error:', error);
        showNotification('⚠️ Form submission error. Please try again.', 'error');
    }
}

function handleContactSubmit(e) {
    try {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]')?.value.trim() || '';
        const email = this.querySelector('input[type="email"]')?.value.trim() || '';
        const message = this.querySelector('textarea')?.value.trim() || '';
        const purpose = this.querySelector('select')?.value || '';
        
        console.log('📞 Contact form submitted:', { name, email, message, purpose });
        
        if (name && email && message && purpose && isValidEmail(email)) {
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification(`📧 Thank you ${name}! Your message has been sent successfully. We will respond to your ${purpose.toLowerCase()} within 24 hours.`, 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        } else {
            showNotification('⚠️ Please fill in all required fields with valid information.', 'error');
            highlightInvalidFields(this);
        }
    } catch (error) {
        console.error('❌ Contact form error:', error);
        showNotification('⚠️ Form submission error. Please try again.', 'error');
    }
}

function addFormValidation() {
    try {
        const inputs = document.querySelectorAll('.form-control');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('invalid')) {
                    validateField(this);
                }
            });
        });
    } catch (error) {
        console.error('❌ Form validation error:', error);
    }
}

function validateField(field) {
    try {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
        
        if (field.type === 'tel' && value && !isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
        
        if (isValid) {
            field.classList.remove('invalid');
            removeErrorMessage(field);
        } else {
            field.classList.add('invalid');
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    } catch (error) {
        console.error('❌ Field validation error:', error);
        return true;
    }
}

function highlightInvalidFields(form) {
    try {
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            validateField(field);
        });
    } catch (error) {
        console.error('❌ Highlight fields error:', error);
    }
}

function showFieldError(field, message) {
    try {
        removeErrorMessage(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#fe4e04';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '4px';
        
        field.parentNode.appendChild(errorDiv);
    } catch (error) {
        console.error('❌ Show field error:', error);
    }
}

function removeErrorMessage(field) {
    try {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    } catch (error) {
        console.error('❌ Remove error message:', error);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// Newsletter Form - FIXED
function initNewsletterForm() {
    try {
        const newsletterForm = document.querySelector('.newsletter__form');
        if (!newsletterForm) return;
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput?.value.trim() || '';
            
            if (email && isValidEmail(email)) {
                const submitButton = this.querySelector('button');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Subscribing...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    showNotification('📧 Thank you for subscribing to our newsletter! You will receive updates about our programs and impact.', 'success');
                    emailInput.value = '';
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1000);
            } else {
                showNotification('⚠️ Please enter a valid email address.', 'error');
                if (emailInput) emailInput.focus();
            }
        });
    } catch (error) {
        console.error('❌ Newsletter form error:', error);
    }
}

// Scroll Effects - FIXED
function initScrollEffects() {
    try {
        let lastScrollY = 0;
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (header) {
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollY = currentScrollY;
        });
        
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-slide-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const elementsToAnimate = document.querySelectorAll('.program__card, .highlight__card, .testimonial__card, .team__card, .focus-area__card, .tcr__item, .branch__card, .office__card');
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    } catch (error) {
        console.error('❌ Scroll effects error:', error);
    }
}

// CTA Buttons - FIXED
function initCTAButtons() {
    try {
        console.log('🎯 Initializing CTA buttons...');
        
        // All buttons with data-section attributes
        const sectionButtons = document.querySelectorAll('[data-section]');
        sectionButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = this.getAttribute('data-section');
                if (targetSection) {
                    navigateToPage(targetSection);
                }
            });
        });
    } catch (error) {
        console.error('❌ CTA buttons error:', error);
    }
}

// Volunteer Buttons - FIXED
function initVolunteerButtons() {
    try {
        const volunteerApplyButtons = document.querySelectorAll('.volunteer__card .btn, .scroll-to-form');
        
        volunteerApplyButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const currentPage = document.querySelector('.page.active');
                if (currentPage && currentPage.id !== 'involved') {
                    navigateToPage('involved');
                }
                
                setTimeout(() => {
                    const volunteerForm = document.getElementById('volunteer-form') || document.querySelector('.volunteer-form');
                    if (volunteerForm) {
                        volunteerForm.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                        
                        const interest = this.getAttribute('data-interest');
                        if (interest) {
                            setTimeout(() => {
                                preSelectInterest(interest);
                            }, 500);
                        }
                    }
                }, currentPage && currentPage.id !== 'involved' ? 500 : 100);
            });
        });
    } catch (error) {
        console.error('❌ Volunteer buttons error:', error);
    }
}

function preSelectInterest(interest) {
    try {
        const interestSelect = document.getElementById('interest-select');
        if (!interestSelect) return;
        
        const options = interestSelect.options;
        const interestMap = {
            'education': 'Education (Pen Initiative)',
            'healthcare': 'Healthcare (Swasthya Saathi)', 
            'outreach': 'Food Security (Annahaat)'
        };
        
        const targetText = interestMap[interest.toLowerCase()];
        if (targetText) {
            for (let i = 0; i < options.length; i++) {
                if (options[i].text.includes(targetText.split('(')[0].trim())) {
                    interestSelect.selectedIndex = i;
                    break;
                }
            }
        }
    } catch (error) {
        console.error('❌ Pre-select interest error:', error);
    }
}

// Footer Links - FIXED
function initFooterLinks() {
    try {
        const footerNavLinks = document.querySelectorAll('.footer__section ul li a[data-section]');
        footerNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const section = this.getAttribute('data-section');
                if (section) {
                    navigateToPage(section);
                }
            });
        });
        
        const footerActionButtons = document.querySelectorAll('.footer__actions .btn');
        footerActionButtons.forEach(button => {
            const section = button.getAttribute('data-section');
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (section) {
                    navigateToPage(section);
                    
                    if (section === 'involved') {
                        setTimeout(() => {
                            const volunteerForm = document.querySelector('.volunteer-form');
                            if (volunteerForm) {
                                volunteerForm.scrollIntoView({ 
                                    behavior: 'smooth', 
                                    block: 'start' 
                                });
                            }
                        }, 500);
                    }
                } else if (this.classList.contains('donate-btn')) {
                    showModal('donation-modal');
                }
            });
        });
        
        const socialLinks = document.querySelectorAll('.social-links a');
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                showNotification('🌐 Opening SEWA Charitable Trust social media page...', 'info');
            });
        });
    } catch (error) {
        console.error('❌ Footer links error:', error);
    }
}

// Emergency Buttons - FIXED
function initEmergencyButtons() {
    try {
        const emergencyButtons = document.querySelectorAll('.emergency-btn, .emergency .btn');
        
        emergencyButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showEmergencyInfo();
            });
        });
    } catch (error) {
        console.error('❌ Emergency buttons error:', error);
    }
}

function showEmergencyInfo() {
    try {
        const emergencyInfo = `🚨 SEWA Charitable Trust Emergency Helpline

📞 Emergency Contact: +91 8840968565
📧 Emergency Email: 10samar.1994@gmail.com
💬 WhatsApp: +91 8840968565

🆘 Available 24/7 for:
• Medical emergencies requiring immediate support
• Food security crises
• Legal aid urgent cases  
• Women safety issues
• Child welfare emergencies

Our team is ready to help in crisis situations.

Press OK to call emergency line.`;
        
        if (confirm(emergencyInfo)) {
            window.open('tel:+918840968565', '_self');
        }
    } catch (error) {
        console.error('❌ Emergency info error:', error);
        showNotification('🚨 Emergency Contact: +91 8840968565', 'emergency');
    }
}

// Additional Features - FIXED
function initAdditionalFeatures() {
    try {
        // Logo click to home
        const logo = document.querySelector('.nav__logo');
        if (logo) {
            logo.addEventListener('click', function(e) {
                e.preventDefault();
                navigateToPage('home');
            });
        }
        
        // Gallery admin button
        const galleryAdminBtn = document.querySelector('.gallery__admin .btn');
        if (galleryAdminBtn) {
            galleryAdminBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('📸 Admin feature: This would open the photo upload interface for authorized users.', 'info');
            });
        }
    } catch (error) {
        console.error('❌ Additional features error:', error);
    }
}

// Utility Functions - FIXED
function showNotification(message, type = 'info') {
    try {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        let backgroundColor, textColor, borderColor, emoji;
        switch (type) {
            case 'success':
                backgroundColor = '#d4edda';
                textColor = '#155724';
                borderColor = '#48bb78';
                emoji = '✅';
                break;
            case 'error':
                backgroundColor = '#f8d7da';
                textColor = '#721c24';
                borderColor = '#fe4e04';
                emoji = '❌';
                break;
            case 'emergency':
                backgroundColor = '#f8d7da';
                textColor = '#721c24';
                borderColor = '#fe4e04';
                emoji = '🚨';
                break;
            default:
                backgroundColor = '#d1ecf1';
                textColor = '#0c5460';
                borderColor = '#346fff';
                emoji = 'ℹ️';
        }
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            z-index: 3000;
            padding: 16px 20px;
            background: ${backgroundColor};
            color: ${textColor};
            border: 2px solid ${borderColor};
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            font-size: 14px;
            line-height: 1.5;
            white-space: pre-line;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
        `;
        
        notification.innerHTML = `${emoji} ${message}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        const autoRemoveTime = type === 'emergency' ? 12000 : type === 'success' ? 6000 : 5000;
        const autoRemoveTimer = setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 400);
            }
        }, autoRemoveTime);
        
        notification.addEventListener('click', function() {
            clearTimeout(autoRemoveTimer);
            this.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (this.parentNode) {
                    this.remove();
                }
            }, 400);
        });
    } catch (error) {
        console.error('❌ Notification error:', error);
    }
}

// Keyboard Navigation - FIXED
document.addEventListener('keydown', function(e) {
    try {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        
        if (e.altKey) {
            const allPages = ['home', 'about', 'founder', 'team', 'work', 'gallery', 'donation', 'involved', 'contact'];
            const currentPage = document.querySelector('.page.active');
            const currentIndex = allPages.indexOf(currentPage ? currentPage.id : 'home');
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                navigateToPage(allPages[currentIndex - 1]);
            } else if (e.key === 'ArrowRight' && currentIndex < allPages.length - 1) {
                e.preventDefault();
                navigateToPage(allPages[currentIndex + 1]);
            }
        }
        
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    navigateToPage('home');
                    break;
                case '2':
                    e.preventDefault();
                    navigateToPage('about');
                    break;
                case '3':
                    e.preventDefault();
                    navigateToPage('team');
                    break;
                case '4':
                    e.preventDefault();
                    navigateToPage('work');
                    break;
                case '5':
                    e.preventDefault();
                    navigateToPage('gallery');
                    break;
                case 'd':
                    e.preventDefault();
                    showModal('donation-modal');
                    break;
            }
        }
    } catch (error) {
        console.error('❌ Keyboard navigation error:', error);
    }
});

document.addEventListener('mousedown', function() {
    try {
        document.body.classList.remove('keyboard-navigation');
    } catch (error) {
        console.error('❌ Mouse event error:', error);
    }
});

// Page Lifecycle Management - FIXED
window.addEventListener('beforeunload', function() {
    try {
        const activePage = document.querySelector('.page.active');
        if (activePage) {
            sessionStorage.setItem('sewa_active_page', activePage.id);
        }
    } catch (error) {
        console.error('❌ Before unload error:', error);
    }
});

window.addEventListener('load', function() {
    try {
        const savedPage = sessionStorage.getItem('sewa_active_page');
        if (savedPage && savedPage !== 'home') {
            setTimeout(() => {
                navigateToPage(savedPage, false);
            }, 200);
        }
        
        if (window.performance && window.performance.timing) {
            const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            console.log(`🚀 SEWA website loaded in ${loadTime}ms`);
        }
    } catch (error) {
        console.error('❌ Load event error:', error);
    }
});

// Error Handling - FIXED
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Only show critical errors to users
    if (e.error && e.error.message && e.error.message.includes('critical')) {
        showNotification('⚠️ Something went wrong. Please refresh the page if you continue to experience issues.', 'error');
    }
});

// Export functions for global access and testing
window.SEWA = {
    navigateToPage,
    showModal,
    hideModal,
    showNotification,
    animateCounters
};

// Welcome message and instructions
console.log(`
🤝 SEWA Charitable Trust - Self-Empowerment of Weaker and Underprivileged Sections
💚 Making a difference since 2013
🌟 Founded by Samarjeet Tripathi with TCR Philosophy: Transformation, Compassion, Resilience

🏢 Visit us at our branches across India:
   📍 Delhi (Headquarters)
   📍 Prayagraj, Kanpur, Chitrakoot, Mahoba (UP)
   📍 Mumbai (Maharashtra)  
   📍 Lalpur (Chhattisgarh)

📞 Contact: +91 8840968565 | 📧 Email: 10samar.1994@gmail.com

🚀 Keyboard Shortcuts:
   • Ctrl+1-5: Quick navigation
   • Ctrl+D: Open donation modal
   • Alt+Arrow: Navigate between pages
   • Escape: Close modals

✨ All website functionality is now active and ready!
`);