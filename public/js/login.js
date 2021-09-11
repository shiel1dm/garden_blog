const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      header: { 'Content-Type': 'application/json'}
    })

    if(response.ok) {
      
      document.location.replace('/')
      console.log(response)
    } else {
      console.log(email,password)
      alert('Failed to log in')
    }
  }
}

document.querySelector('#login')
document.addEventListener('submit', loginFormHandler);