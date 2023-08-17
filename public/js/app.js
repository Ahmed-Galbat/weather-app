//index js script

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTow = document.getElementById('message-2')



weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent ='Loading...!'
    messageTow.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if (data.error) {
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTow.textContent = data.forecast
        }
    })
})
})