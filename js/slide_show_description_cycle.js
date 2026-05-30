
  document.querySelectorAll('.custom-slideshow').forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.custom-slide');
    const subtitles = document.querySelectorAll('.subtitle1');
    const descriptions = document.querySelectorAll('.slide-description');
    let index = 0;

    const showSlide = (n) => {
      index = (n + slides.length) % slides.length;

      slides.forEach(s => s.style.display = 'none');
      subtitles.forEach(s => s.style.display = 'none');
      descriptions.forEach(d => d.style.display = 'none');

      slides[index].style.display = 'block';
      subtitles[index].style.display = 'block';
      descriptions[index].style.display = 'block';
    };

    showSlide(index);

    slideshow.querySelector('.custom-prev').addEventListener('click', () => {
      showSlide(index - 1);
    });

    slideshow.querySelector('.custom-next').addEventListener('click', () => {
      showSlide(index + 1);
    });
  });
