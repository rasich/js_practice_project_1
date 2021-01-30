import checkNumInputs from './checkNumInputs';

const forms = (state) => {
  const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');
  
  checkNumInputs('input[name="user_phone"]');  
  
  const message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро с Вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let res = await fetch(url, {
      method: 'POST',
      body: data
    });

    return await res.text();
  };

  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
  };

  form.forEach(item => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.appendChild(statusMessage);

      const formData = new FormData(item);

      if (item.getAttribute('data-calc') === 'end') {
        if (!state.type) {
          state.type = 'tree';
        }
        for (let key in state) {
          formData.append(key, state[key]);
          state[key] = '';
        }
        document.querySelectorAll('.checkbox').forEach(item => {
          item.checked = false;
        });
        document.querySelectorAll('.form-control').forEach(item => {
          item.value = 'tree';
        });
      }
      
      postData('assets/server.php', formData)
        .then(res => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => statusMessage.textContent = message.failure)
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });

      setTimeout(() => {
        document.querySelector('.popup_calc_end').style.display = 'none';
        document.body.style.overflow = '';
      }, 1500);
    });
  });
};

export default forms;