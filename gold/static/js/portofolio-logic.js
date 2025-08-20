        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
        
        // Animation on scroll
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.skill-card, .project-card, .identity-card').forEach(card => {
            observer.observe(card);
        });
        document.querySelector('.back-to-terminal button').addEventListener('click', (e) => {
            e.preventDefault();
            alert('Kembali ke Terminal...');
            window.location.href = '/t3Rm1Na1';
        });
