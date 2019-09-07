fetch('/api/users')
    .then(response => response.json())
    .then(res =>console.log(res))
