 
    document.querySelectorAll('.custom-slideshow').forEach(slideshow => {
        let slides = slideshow.querySelectorAll('.custom-slide');
        let index = 0;
      
        const showSlide = (n) => {
          index = (n + slides.length) % slides.length;
          slides.forEach(slide => slide.style.display = 'none');
          slides[index].style.display = 'block';
        };
      
        // Show the first slide
        showSlide(index);
      
        // Event listeners per i pulsanti
        slideshow.querySelector('.custom-prev').addEventListener('click', () => {
          showSlide(index - 1);
        });
      
        slideshow.querySelector('.custom-next').addEventListener('click', () => {
          showSlide(index + 1);
        });
      });