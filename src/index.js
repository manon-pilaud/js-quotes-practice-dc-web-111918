document.addEventListener('DOMContentLoaded',()=>{
  fetchQuotes()
})
//View
function fetchQuotes(){
  fetch('http://localhost:3000/quotes')
  .then(response=>response.json())
  .then(quotes=>{
    quotes.forEach(quote =>{
      displayQuote(quote)
    })
  })
}

function displayQuote(quote){
  let container = document.querySelector('.container')
  let li = document.createElement('li')
  li.classList.add('quote-card')
  container.appendChild(li)

  let blockquote = document.createElement('blockquote')
  blockquote.classList.add('blockquote')
  li.appendChild(blockquote)

  let paragraph = document.createElement('p')
  paragraph.classList.add('mb-0')
  paragraph.innerText = quote.quote
  blockquote.appendChild(paragraph)

  let footer = document.createElement('footer')
  footer.classList.add('blockquote-footter')
  footer.innerText = quote.author
  blockquote.appendChild(footer)

  let br = document.createElement('br')
  blockquote.appendChild(br)

  let likesButton = document.createElement('button')
  likesButton.classList.add('btn-success')
  likesButton.id = quote.id
  likesButton.innerText = `Likes: ${quote.likes}`
  likesButton.addEventListener("click",likesClickEvent)
  blockquote.appendChild(likesButton)

  let deleteButton = document.createElement('button')
  deleteButton.classList.add('btn-danger')
  deleteButton.id = quote.id
  deleteButton.innerText = `Delete`
  deleteButton.addEventListener("click",deleteClickEvent)
  blockquote.appendChild(deleteButton)
}


//Create
document.querySelector('form').addEventListener('submit',e=>{
  e.preventDefault()
  postNewQuote(e)
  e.target.reset()
})

function postNewQuote(e){
  let quote = e.currentTarget[0].value
  let author = e.currentTarget[1].value
  let likes = 0
  fetch('http://localhost:3000/quotes',{
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({
      quote: quote,
      author: author,
      likes: likes
    })
  })
  .then(response=>response.json())
  .then(newQuote=>displayQuote(newQuote))
}


//Update
function likesClickEvent(e){
  let quoteId = e.currentTarget.id
  let likes = e.currentTarget.innerText.split(" ")[1]
  let newLikes = parseInt(likes) + 1
  console.log(newLikes)
  e.currentTarget.innerText = `Likes: ${newLikes}`
  updateLikes(quoteId,newLikes)
}

function updateLikes(quoteId,newLikes){

  fetch(`http://localhost:3000/quotes/${quoteId}`,{
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({
      likes: `${newLikes}`
    })
  })
  .then(response=>response.json())
}




//Delete
function deleteClickEvent(e){
  let quoteId = e.currentTarget.id
  deleteQuote(quoteId)
}

function deleteQuote(quoteId){

  fetch(`http://localhost:3000/quotes/${quoteId}`,{
    method: "DELETE"
    })
  .then(response=>response.json())
  .then(()=>{
    document.querySelector(`button[id="${quoteId}"]`).parentElement.parentElement.remove()
  })
}
