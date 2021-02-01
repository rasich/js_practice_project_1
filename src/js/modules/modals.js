const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
    const trigger= document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          windows = document.querySelectorAll('[data-modal]'),
          scroll = calcScroll();

    function closeWindows() {
      windows.forEach(item => {
        item.style.display = 'none';
      });
      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = `0px`;
      
    }
    
    trigger.forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }

        closeWindows();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
      });
    });

    close.addEventListener('click', () => {
      closeWindows();
    });

    modal.addEventListener('click', (e) => {
      if (e.currentTarget === e.target && closeClickOverlay) {
        closeWindows();
      }
    });

    document.addEventListener('keydown', (e) => {
      if(e.keyCode == 27) {
        closeWindows();
      }
    }); 
  }

  function showModalByTime(selector, time) {
    setTimeout(function() {
      document.querySelector(selector).style.display = 'block';
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = `${calcScroll()}px`;
    }, time);
  }

  function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  bindModal('.glazing_price_btn', '.popup_calc', '.popup_calc_close');

  bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
  bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);

  showModalByTime('.popup', 60000);
};

export default modals;
