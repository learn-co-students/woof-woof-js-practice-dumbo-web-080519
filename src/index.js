  let url = 'http://localhost:3000/pups'
  let pupDiv = document.getElementById('dog-bar')
  let showDiv = document.getElementById('dog-info')


  fetch(url)
  .then(res => res.json())
  .then(pupsArr => {
    pupsArr.forEach(pup => {
      pupDiv.innerHTML += `<span data-id="${pup.id}">${pup.name}</span>`
    })
  })


  pupDiv.addEventListener('click', function(evt){
    if(evt.target.tagName === "SPAN"){
      evt.preventDefault()
      let pupId = evt.target.dataset.id
      fetch(url + `/${pupId}`)
      .then(res => res.json())
      .then(pup => {
        if(pup.isGoodDog === true){
          showDiv.innerHTML = `
          <img src=${pup.image}><br>
          <h2>${pup.name}</h2>
          <button data-btnid="${pup.id}" data-good="good-dog-btn">Good Dog!</button>
          `
        } else {
          showDiv.innerHTML = `
          <img src=${pup.image}><br>
          <h2>${pup.name}</h2>
          <button data-btnid="${pup.id}" data-bad="bad-dog-btn">Bad Dog!</button>
          `
        }
      })
    }
  })

  showDiv.addEventListener('click', function(evt){
    if(evt.target.tagName === 'BUTTON'){
      evt.preventDefault()

      let pupID = evt.target.dataset.btnid
      let btn = evt.target


      fetch(url + `/${pupID}`, {
        method: 'PATCH',
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Accept': 'application/json'
        // }
        })
        .then(res => res.json())
        .then(pupObj => {

          if(pupObj.isGoodDog === true){
            pupObj.isGoodDog = false
            btn.innerText = 'Bad Dog!'
          } else {
            pupObj.isGoodDog = true
            btn.innerText = 'Good Dog!'
          }
        })
    }
  })
