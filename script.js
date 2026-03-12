document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Progress Bar Animation
    const progressBar = document.getElementById('progressBar');
    const raisedAmountText = document.getElementById('raisedAmount');
    const percentCompleteText = document.getElementById('percentComplete');
    
    // Initial state: 0%
    // In a real app, this would fetch from an API
    const targetAmount = 750000;
    let currentRaised = 0;
    
    // Simulate initial animation to a small starting point (e.g. 5%)
    setTimeout(() => {
        animateProgress(37500, 5); // Example initial donation
    }, 500);

    function animateProgress(amount, percent) {
        progressBar.style.width = percent + '%';
        
        let displayAmount = 0;
        let displayPercent = 0;
        
        const interval = setInterval(() => {
            if (displayAmount < amount) {
                displayAmount += Math.ceil(amount / 50);
                displayPercent = (displayAmount / targetAmount) * 100;
                
                if (displayAmount >= amount) {
                    displayAmount = amount;
                    displayPercent = percent;
                    clearInterval(interval);
                }
                
                raisedAmountText.textContent = `KSh ${displayAmount.toLocaleString()}`;
                percentCompleteText.textContent = `${Math.round(displayPercent)}%`;
            }
        }, 20);
    }

    // Sticky Button Visibility
    const stickyBtn = document.getElementById('stickyBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            stickyBtn.classList.add('visible');
        } else {
            stickyBtn.classList.remove('visible');
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const isActive = answer.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('active'));
            document.querySelectorAll('.faq-question span').forEach(s => s.textContent = '+');
            
            if (!isActive) {
                answer.classList.add('active');
                question.querySelector('span').textContent = '-';
            }
        });
    });

    // Donation Amount Selection
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');

    amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            amountBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            customAmountInput.value = '';
        });
    });

    customAmountInput.addEventListener('input', () => {
        amountBtns.forEach(b => b.classList.remove('active'));
    });

    // Donate Form Submission
    const donationForm = document.getElementById('donationForm');
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const amount = customAmountInput.value || document.querySelector('.amount-btn.active').dataset.amount;
        
        alert(`Thank you, ${firstName}! Your donation of KSh ${parseInt(amount).toLocaleString()} will provide ${Math.floor(amount / 750)} Bibles.`);
        
        // In a real app, we would process the payment and then update the UI
        location.reload(); 
    });
});
