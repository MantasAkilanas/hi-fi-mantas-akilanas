(() => {
    document.addEventListener('DOMContentLoaded', () => {
        if (localStorage.getItem('token') === null) {
            window.location.assign('login.html');
        } else {
            console.log(localStorage.getItem('token'));
            fetch('http://localhost:1337/users', {
                'method': 'GET',
                'headers': {
                    'Authorization': localStorage.getItem('token'),
                    'userID': localStorage.getItem('userid')
                },
                'mode': 'cors',
                'cache': 'default'
            })
                .then((result) => result.json())
                .then((users) => {
                    users.forEach(function (user) {
                        const myDiv = document.querySelector(".users");
                        const h2 = document.createElement("H2");
                        const h2text = document.createTextNode(`${user.brugernavn}`);
                        h2.appendChild(h2text);
                        myDiv.appendChild(h2);

                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
})();