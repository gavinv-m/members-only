const deleteMessage = async (event) => {
  const messageID = Number(event.target.id);
  try {
    const response = await fetch('/delete-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messageID }),
    });
    if (response.ok) {
      const data = await response.json();
      window.location.href = data.redirect;
    } else {
      throw new Error('Failed to delete message');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const deleteBtns = document.querySelectorAll('.delete-message');
  deleteBtns.forEach((button) => {
    button.addEventListener('click', deleteMessage);
  });
});
