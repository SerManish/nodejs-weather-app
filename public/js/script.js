const form = document.querySelector('form');
const input = document.querySelector('input');
const para = document.querySelector('p');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    address = input.value;
    fetch('/weather?address='+address).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
                para.textContent = data.error;
            else
                para.textContent = data.forecast;
        })
    });
})