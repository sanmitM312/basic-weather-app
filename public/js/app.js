
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')



msgOne.textContent = ''
msgTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault(); // needed to prevent the default
  // browser behaviour of refreshing, and telling that we are gonna do everything
  
  msgOne.textContent = 'Loading Weather Stats...'
  msgTwo.textContent = ''

  const location = search.value;
  fetch('/weather?address=' + location).then(
    (response) => {
      response.json().then((data) => {
        if (!data.error) {
          msgOne.textContent = data.forecast
          msgTwo.textContent = data.location
        } else {
          msg1.textContent = data.error
        }
      });
    }
  );
});
