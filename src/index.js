let dogBar = document.querySelector('#dog-bar')
let url = 'http://localhost:3000/pups'
let mainContainer = document.querySelector('#dog-info')
let goodDogFilterbutton = document.getElementById("good-dog-filter")
let onOffButton = document.getElementById("on-and-off")

/// SLAP ALL THE DOGS ON THE DOM ///
function slapItOnTheDom(pup){
  dogBar.innerHTML += `<span data-id="${pup.id}">${pup.name}</span>`
}

// when you fetch a single dog, remember to wipe out the innerhtml of the main container before slaping it = ""

/// SHOW PAGE FOR INDIVIDUAL DOG ///
function showPup(object){
 let buttonText = object.isGoodDog ? "Good dog!" : "Bad dog!"
 mainContainer.innerHTML = ""
 mainContainer.innerHTML = `
 <img src="${object.image}"/>
 <h2> ${object.name}</h2>
 <button data-id="${object.id}"id="toggle-button" data-gb=${object.isGoodDog}>${buttonText}</button>`
}

//// FETCH ALL THE DOGS ////
fetch(url)
.then(res => res.json())
.then(resObjectArray => resObjectArray.forEach(pup =>
 slapItOnTheDom(pup))
)
.then(console.log("I finish first fetch"))

/// EVENT LISTENER FOR DOGBAR  ///
dogBar.addEventListener("click", function(event){

/// CHECK IF SPAN CLICKED WHERE THE DOGS WRITTEN WITHIN ///
  if (event.target.tagName === "SPAN"){

    /// THEN FETCH THE DOG FROM DATABASE WHO IS CLICKED ///
    fetch(`http://localhost:3000/pups/${event.target.dataset.id}`)
    .then(res => res.json())
    .then(object => {
      showPup(object)
    })
  }
})


/// TO CHANGE THE GOOD DOG TO BAD DOG VESA VERSA ///
mainContainer.addEventListener("click", function(event){
  let targetElement = event.target
  if(targetElement.tagName === "BUTTON"){
    let booleanValue = targetElement.dataset.gb === "true" ? true : false


    fetch(`http://localhost:3000/pups/${targetElement.dataset.id}`,{
      method: 'PATCH',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        isGoodDog: !booleanValue
      })
    })
      .then(res => res.json())
      .then(obj => {
      let buttonText = obj.isGoodDog ? "Good dog!" : "Bad dog!"
      targetElement.dataset.gb = obj.isGoodDog
      targetElement.innerText = buttonText

    })
  }
})

/// FILTER GOOD DOGS ///

goodDogFilterbutton.addEventListener("click", function(event){
  // fetch all the dogs
    let currentText = onOffButton.innerText

    if (currentText === "OFF") {
      onOffButton.innerText = "ON"
    } else {
      onOffButton.innerText =  "OFF"
    }

     dogBar.innerHTML = ""
    if (onOffButton.innerText === "ON"){
      fetch(url)
      .then(res => res.json())
      .then(objectArray => objectArray.filter(function(object) {

        if (object.isGoodDog === true){
        dogBar.innerHTML += `<span data-id="${object.id}">${object.name}</span>`
      }
    })
  )} else {
    fetch(url)
    .then(res => res.json())
    .then(objectArray => objectArray.forEach(pup =>
    slapItOnTheDom(pup)))
  }
})
