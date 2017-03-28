'use strict'
const spyArray = [
    {
        "id": 12,
        "time": "2017-03-02 22:55",
        "category": "Wife",
        "title": "Title 1",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.",
        "coordinates": {
            "lat": 60.2196781,
            "lng": 24.8079786
        },
        "thumbnail": "http://placekitten.com/320/300",
        "image": "http://placekitten.com/768/720",
        "original": "http://placekitten.com/2048/1920"
    },
    {
        "id": 15,
        "time": "2017-03-01 19:23",
        "category": "Wife",
        "title": "Title 2",
        "details": "Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ",
        "coordinates": {"lat": 60.3196781, "lng": 24.9079786},
        "thumbnail": "http://placekitten.com/321/300",
        "image": "http://placekitten.com/770/720",
        "original": "http://placekitten.com/2041/1920"
    },
    {
        "id": 34,
        "time": "2017-12-04 09:45",
        "category": "Girlfriend",
        "title": "Title 3",
        "details": "Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ",
        "coordinates": {"lat": 60.3196781, "lng": 24.9079786},
        "thumbnail": "http://placekitten.com/319/300",
        "image": "http://placekitten.com/769/720",
        "original": "http://placekitten.com/2039/1920"
    }
]
const mainDiv = document.getElementById("image_list")
const imgTag = document.getElementById("imageId")
const imageTitle = document.getElementById("imageTitle")
const wifes = document.getElementById("wife")
const gfriends = document.getElementById("gfriend")
const image_catagory = document.getElementById("image_catagory")
const view = document.getElementById("view")
const add = document.getElementById("add")
const imagesContainer = document.getElementById("images-container")
const createContainer = document.getElementById("create-container")
const cancelForm = document.getElementById("cancelForm")
const addForm = document.getElementById("add-form")
const newCategory = document.getElementById("newCategory")
const newTile = document.getElementById("newTitle")
const details = document.getElementById("newDescription")
const image = document.getElementById("newImage")
//const myModal = document.getElementById("myModal")

//routing

add.addEventListener('click', ()=>{
    imagesContainer.style.display='none'
    createContainer.style.display='block'

})
cancelForm.addEventListener('click', ()=>{
    imagesContainer.style.display='block'
    createContainer.style.display='none'

})


addForm.on('submit', (event)=> {
    event.preventDefault()

    // create app array for exisiting apps
    const spy = {

        category: newCategory.value,
        title: newTile.value,
        description: details.value,
        image: image.value
    }
    if (spy.title) {
        appList.add(spy)
            .then(function (app) {
                imagesContainer.style.display='block'
                createContainer.style.display='none'
            })
    }
})

/*applist.add = function (app) {
    app.id = Math.random().toString(36).substr(2, 7)
    return applist.findAll()
        .then(function (apps) {
            apps.push(app)
            localStorage.setItem('apps', JSON.stringify(apps))
            return app
        })
}*/

//creates a div for all images found inside of the array
spyArray.forEach((image) => {
    const row = document.createElement('div')
    row.dataset.id = image.id
    row.className = "col-sm-6 col-md-4"
    row.innerHTML = `
     <div class = "thumbnail">
         <img src = ${image.thumbnail} alt="image">
      </div>
      
      <div class = "caption">
         <h3>${image.title}</h3>
         <p>${image.details}</p>
         <div>
            <a href = "#" id=${image.id} data-title=${image.title} data-map=${image.coordinates} class = "btn btn-primary"  role = "button" data-toggle="modal" data-target="#myModal">
               View
            </a> 
         </div>
     </div>
     `
    mainDiv.appendChild(row)
    }
)

//Loads the modal for the real size of the image
mainDiv.addEventListener('click', (event) => {
    event.preventDefault()
    const clickedButton = event.target
    const id = clickedButton.id
    console.log(id)
    const clickedImage = spyArray.filter((image)=>
        image.id == id )

    imgTag.src = clickedImage[0].image
    imageTitle.innerHTML = clickedImage[0].title
    
    //Loads the map on top
    class ShowMap {
        static showMap(){
            const uluru = clickedImage[0].coordinates
            console.log(uluru)
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: uluru
            });
            const marker = new google.maps.Marker({
                position: uluru,
                map: map

            })
        }
    }

    ShowMap.showMap()
    /*myModal.on("shown.bs.modal",  () => {
        google.maps.event.trigger(map, "resize");
    });*/

})
// filters the items with category wife
wifes.addEventListener('click', ()=> {
    const wifeCats = spyArray.filter( (images)=>
         images.category =='Wife'
    )
    console.log(wifeCats)
    wifeCats.forEach( (wife) => {
        const catDiv = document.createElement('div')
        catDiv.innerHTML=`
        <div class = "thumbnail">
        <img src = ${wife.thumbnail} alt="image">
        </div>
      
        <div class = "caption">
      
         <h3>${wife.title}</h3>
         <p>${wife.details}</p>
         <p>${wife.time}</p>
         
         </div>
`
        image_catagory.appendChild(catDiv)
    })
} )

// filters the items with category girlfriend

gfriends.addEventListener('click', ()=> {
    const gCats = spyArray.filter( (images) =>
         images.category =='Girlfriend'
    )
    gCats.forEach( (girl)=> {
        const gDiv = document.createElement('div')
        gDiv.innerHTML=`
        <div class = "thumbnail">
        <img src = ${girl.thumbnail} alt="image">
        </div>
      
        <div class = "caption">
      
         <h3>${girl.title}</h3>
         <p>${girl.details}</p>
         
         </div>
`
        image_catagory.appendChild(gDiv)
    })
} )

const appList= {}
let spyStorage=[]

appList.findAll =  () =>{
    let appsData = spyStorage.getItem('apps')
    let apps = appsData ? JSON.parse(appsData) : []
    return Promise.resolve(apps)
}

appList.add = function (app) {
    app.id = Math.random().toString(36).substr(2, 7)
    return appList.findAll()
        .then(function (apps) {
            apps.push(app)
            spyStorage.setItem('apps', JSON.stringify(apps))
            return app
            console.log(spyStorage)
        })
}



