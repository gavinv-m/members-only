const showDialog = () => {
  const dialog = document.getElementById('add-message-dialog');
  dialog.showModal();
};

const closeDialog = () => {
  const dialog = document.getElementById('add-message-dialog');
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = '';
  dialog.close();
};

const submitForm = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const errorMessage = document.getElementById('error-message');

  try {
    const response = await fetch('/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      closeDialog();
    } else {
      errorMessage.textContent = 'Failed to submit message';
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const addMessageBtn = document.getElementById('add-message-btn');
  addMessageBtn.addEventListener('click', showDialog);

  const cancelBtn = document.getElementById('cancel-btn');
  cancelBtn.addEventListener('click', closeDialog);

  const form = document.getElementById('add-message-form');
  form.addEventListener('submit', submitForm);
});
