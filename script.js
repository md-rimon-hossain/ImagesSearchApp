const accessKey = "p851oS0FfNS90mply7BN6VJHpL1wX3jXGJKdTl6YPaA"

const form = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const imageContainer = document.querySelector(".image-container");
const imageResult = document.querySelector(".image-rasult");
const showMoreButton = document.getElementById("show-more-button");


let dataInput = "";
let page = 1;

async function searchImages(){
    dataInput = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${dataInput}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results

    if(page ===1 ){
        imageContainer.innerHTML = ""
    }
    // handle error
    if(dataInput === ""){
        const errorP = document.createElement("p")
        errorP.classList.add("errorP")
        errorP.innerHTML = "অনুগ্রহ  করে আপনার পছন্দদের ফটোর নাম  লিখুন "
        imageContainer.style.justifyContent = "center"
        imageContainer.appendChild(errorP)
    }

    results.map((result)=>{


        // ekhane html er element create kora hoiese
        const  imageWrapper = document.createElement("div")
        imageWrapper.classList.add("image-rasult")
        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html 
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        imageContainer.appendChild(imageWrapper)

    })

    page++;
    if(page>1){
        showMoreButton.style.display = "block"
    }
    // handle error
    if(dataInput === ""){
        showMoreButton.style.display = "none"
    }
}


form.addEventListener("submit",(event)=>{
    event.preventDefault()
    page = 1
    searchImages()
})

// show more button and again image genarate
showMoreButton.addEventListener("click",()=>{
    searchImages()
})