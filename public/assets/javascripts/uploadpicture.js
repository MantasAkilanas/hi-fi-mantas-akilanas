addEventListener("DOMContentLoaded", () => {
    document.querySelector("#form").addEventListener("submit", (event) => {
        event.preventDefault();
        let form = document.querySelector('#form')
        let data = new FormData(form);
  
        // ingen headers sendes med, browseren sætter automatisk de korrekte headers alt efter formens indhold
        let init = {
           method: 'post',
           body: data,
           cache: 'no-cache'
        };
  
        let request = new Request(`http://localhost:1337/image`, init);
  
        fetch(request)



    })
})