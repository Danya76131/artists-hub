import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

// console.log('feedback block:', document.querySelector('.feedback'));

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is ready');
  const feedback = document.querySelector('.feedback-section');
  if (!feedback) {
    console.warn('Feedback section отсутствует на этой странице');
    return;
  }

  // лоадер
  function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.remove('hidden');
      loader.classList.add('show');
    }
  }

  function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.remove('show');
      loader.classList.add('hidden');
    }
  }

  // зірочки на коментах
  function generateStars(rating) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= Math.round(rating);
      const iconId = isFilled ? 'icon-star-filled' : 'icon-star-empty';

      stars.push(`
      <svg class="star-icon" width="20" height="20" fill="currentColor">
        <use href="#${iconId}"></use>
      </svg>
    `);
    }

    return stars.join('');
  }

  async function fetchFeedback() {
    showLoader();
    try {
      const res = await axios.get(
        'https://sound-wave.b.goit.study/api/feedbacks'
      );
      return res.data.data;
    } catch (error) {
      console.error(error.message);
      return [];
    } finally {
      hideLoader();
    }
  }

  async function initFeedbackSwiper() {
    const feedbacks = await fetchFeedback();
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const paginationContainer = document.querySelector('.custom-pagination');

    swiperWrapper.innerHTML = '';
    paginationContainer.innerHTML = '';

    feedbacks.forEach(feedback => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      slide.innerHTML = `
      <div class="feedback-card">
        <div class="feedback-rating">${generateStars(feedback.rating)}</div>
        <p class="feedback-text">${feedback.descr}</p>
        <div class="feedback-info">
          <h3 class="feedback-name">${feedback.name}</h3>
        </div>
      </div>
    `;
      swiperWrapper.appendChild(slide);
    });

    const swiper = new Swiper('.feedback-swiper', {
      modules: [Navigation],
      loop: false,
      navigation: {
        nextEl: '.my-button-next',
        prevEl: '.my-button-prev',
      },
      slidesPerView: 1,
      spaceBetween: 0,
      on: {
        slideChange: () =>
          updatePagination(swiper.realIndex, swiper.slides.length),
      },
    });

    function renderCustomPagination(slideCount) {
      const leftDot = document.createElement('span');
      const centerDot = document.createElement('span');
      const rightDot = document.createElement('span');

      leftDot.classList.add('pagination-dot');
      leftDot.dataset.index = 0;

      centerDot.classList.add('pagination-dot');
      centerDot.dataset.index = Math.floor(slideCount / 2);

      rightDot.classList.add('pagination-dot');
      rightDot.dataset.index = slideCount - 1;

      paginationContainer.append(leftDot, centerDot, rightDot);
    }

    function updatePagination(activeIndex, slideCount) {
      const [leftDot, centerDot, rightDot] =
        document.querySelectorAll('.pagination-dot');
      leftDot.classList.toggle('active', activeIndex === 0);

      leftDot.classList.contains('active')
        ? swiper.navigation.prevEl.classList.add('btn-disabled')
        : swiper.navigation.prevEl.classList.remove('btn-disabled');

      centerDot.classList.toggle(
        'active',
        activeIndex !== 0 && activeIndex !== slideCount - 1
      );
      rightDot.classList.toggle('active', activeIndex === slideCount - 1);

      rightDot.classList.contains('active')
        ? swiper.navigation.nextEl.classList.add('btn-disabled')
        : swiper.navigation.nextEl.classList.remove('btn-disabled');
    }

    paginationContainer.addEventListener('click', e => {
      if (e.target.classList.contains('pagination-dot')) {
        const index = Number(e.target.dataset.index);
        swiper.slideTo(index);
      }
    });

    renderCustomPagination(feedbacks.length);
    updatePagination(swiper.realIndex, feedbacks.length);
  }

  setTimeout(() => {
    initFeedbackSwiper();
  }, 200);

  // Модальне вікно
  const modal = document.querySelector('.modal');
  const btnOpen = document.querySelector('.btn-open');
  const btnClose = document.querySelector('.btn-close');
  const form = document.querySelector('.feedback-form');
  const stars = document.querySelectorAll('.star');

  let currentRating = 0;

  btnOpen.addEventListener('click', () => {
    modal.classList.remove('hidden');
    setTimeout(() => {
      document.body.classList.add('modal-open');
      modal.classList.add('show');
    }, 10);
  });

  btnClose.addEventListener('click', () => {
    closeModal();
  });

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      currentRating = index + 1;
      updateStars(currentRating);
    });
  });

  function updateStars(rating) {
    stars.forEach((star, index) => {
      const use = star.querySelector('use');
      if (index < rating) {
        use.setAttribute('href', '#icon-star-filled');
        star.classList.add('active-star');
      } else {
        use.setAttribute('href', '#icon-star-empty');
        star.classList.remove('active-star');
      }
    });
  }

  function closeModal() {
    document.body.classList.remove('modal-open');
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.add('hidden');
      form.reset();
      updateStars(0);
      currentRating = 0;
      clearValidationErrors();
    }, 300);
  }

  function clearValidationErrors() {
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(err => {
      err.classList.add('hidden');
      err.textContent = '';
    });

    const inputs = form.querySelectorAll('.error');
    inputs.forEach(input => input.classList.remove('error'));
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name = form.elements.name.value.trim();
    const message = form.elements.message.value.trim();

    let isValid = true;

    const fields = [
      {
        input: form.elements.name,
        errorEl: form.elements.name.nextElementSibling,
        message: 'Should be min 2 - max 10 characters',
      },
      {
        input: form.elements.message,
        errorEl: form.elements.message.nextElementSibling,
        message: 'Should be min 10 - max 512 characters',
      },
    ];

    fields.forEach(({ input, errorEl, message }) => {
      const value = input.value.trim();
      let isFieldValid = true;

      if (input === form.elements.name) {
        isFieldValid = value.length >= 2 && value.length <= 10;
      }

      if (input === form.elements.message) {
        isFieldValid = value.length >= 10 && value.length <= 512;
      }

      if (!isFieldValid) {
        input.classList.add('error');
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
        isValid = false;
      } else {
        input.classList.remove('error');
        errorEl.classList.add('hidden');
        errorEl.textContent = '';
      }
    });

    const feedbackData = {
      name: name,
      rating: currentRating,
      descr: message,
    };

    if (feedbackData.rating < 1) {
      showWarnMsg();
      return;
    }

    if (!isValid) return;

    showLoader();

    try {
      const response = await axios.post(
        'https://sound-wave.b.goit.study/api/feedbacks',
        feedbackData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      closeModal();
      showSuccessMsg();
      form.reset();
    } catch (error) {
      showErrorMsg();
      console.error(error);
    } finally {
      hideLoader();
    }
  });
});

function showSuccessMsg() {
  iziToast.success({
    timeout: 3333,
    title: 'Nice!',
    message: `Thanks for the feedback!`,
    position: 'topRight',
  });
}

function showErrorMsg() {
  iziToast.error({
    timeout: 3333,
    title: 'Error!',
    message: `Error sending. Please try again later.`,
    position: 'topRight',
  });
}

function showWarnMsg() {
  iziToast.show({
    timeout: 3333,
    message: `Please rank your feedback.`,
    position: 'topLeft',
  });
}
