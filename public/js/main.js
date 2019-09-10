fetch('/api/users')
    .then(response => response.json())
    .then(res =>console.log(res))

    const showModal = () => {
        let modal = document.getElementById("modal");
        if (modal.style.display === "block") {
            modal.style.display = "none";
        } else {
            modal.style.display = "block";
        }
    }
