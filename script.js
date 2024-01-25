let submit = document.getElementById('btn')
let input  = document.getElementById('input')
let audio = document.querySelector('.audio')
let meaning = document.querySelector('.meanings')
let searchedWord = document.querySelector('.word')
let oral = document.querySelector('.speech-work')
let clear = document.querySelector('.clear')

console.log();

clear.addEventListener('click', () => {
    input.value = ''
    oral.innerHTML = ''
    searchedWord.innerHTML = ''
    audio.innerHTML = ''
    meaning.innerHTML = ''

})

const fetchData = (word) =>{
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((res) =>{
        return res.json()
        .then((data => {
            displayData(data)
        })  
        )
    })
    .catch(error => {
        handleErrors(error)
        
    })
}

const handleErrors = (error) =>{
    console.error('Error fetching data:', error)
        oral.innerHTML = ''
        searchedWord.innerHTML = ''
        audio.innerHTML = ''
        meaning.innerHTML = 'No record found'
}

const displayData = (data) =>{
    oral.innerHTML = `${data[0].phonetics[0].text}`
    searchedWord.innerHTML = `${data[0].word}`
    meaning.innerHTML = `${data[0].meanings[0].definitions[0].definition}`
    audio.innerHTML = `<div class="audio"><audio controls><source src="${data[0].phonetics[0].audio}" type="audio/mpeg">audio></div>`
}

submit.addEventListener('click', ()=>{
let word = input.value
    fetchData(word)
})
