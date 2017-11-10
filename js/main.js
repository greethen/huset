function getAllEvents() {
    fetch("http://gretagerulyte.com/wordpress/wp-json/wp/v2/events?_embed&per_page=20")
        .then(res=>res.json())
        .then(showEvents)
}

function getAllEventsByTag(id) {
    fetch("http://gretagerulyte.com/wordpress/wp-json/wp/v2/events?_embed&tags="+id)
        .then(res=>res.json())
        .then(showEvents)
}

function getSingleEventbyId(oneId) {
    fetch("http://gretagerulyte.com/wordpress/wp-json/wp/v2/events/"+oneId+"?_embed")
        .then(res=>res.json())
        .then(showSingleEvent)
}

function getMenu(){
    fetch("http://gretagerulyte.com/wordpress/wp-json/wp/v2/tags")
//    fetch("http://gretagerulyte.com/wordpress/wp-json/wp/v2/categories")
    .then(e=>e.json())
    .then(showMenu)
}


function showMenu(tags){
    //console.log(tags);
    let lt = document.querySelector("#linkTemplate").content;
    tags.forEach(function(tag){
        if(tag.count > 0){
    let clone = lt.cloneNode(true);
    let parent = document.querySelector("#tagMenu");
    clone.querySelector("a").textContent=tag.name;
    clone.querySelector("a").setAttribute("href","index.html?tagid="+tag.id);
    parent.appendChild(clone);
        }
    });

   //http://gretagerulyte.com/wordpress/wp-json/wp/v2/events?tags=11
}

function showSingleEvent(json){
    console.log(json);
    let list = document.querySelector("#list");
    let template = document.querySelector("#singleTemplate").content;
    let clone = template.cloneNode(true);
    let img = clone.querySelector("img");
    let date = clone.querySelector(".date");
    let time = clone.querySelector(".time");
    let doorsOpen = clone.querySelector(".doorsOpen span");
    let price = clone.querySelector(".price span");
    let location = clone.querySelector(".location");
    let linkToBuy = clone.querySelector(".linkToBuy");
    //let linkToFb = clone.querySelector(".linkToFb");

    //let shortDescription = clone.querySelector(".shortDescription");

    clone.querySelector("h1").textContent = json.title.rendered;
    clone.querySelector(".content").innerHTML = json.content.rendered;
    img.setAttribute("src", json._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url);
    date.textContent = json.acf.date;
    time.textContent = json.acf.starting_time;
    doorsOpen.textContent = json.acf.doors_open;
    price.textContent = json.acf.price;
    location.textContent = json.acf.location;
    linkToBuy.setAttribute("href", json.acf.link_to_buy_a_ticket);
    //linkToFb.setAttribute("href", json.acf.facebook_link);

    //shortDescription.innerHTML = json.acf.small_description;
    //clone.querySelector(".price span").textContent = json.acf.price;
    list.appendChild(clone);
}

// showing all events
function showEvents(data) {
    console.log(data);
    let list = document.querySelector("#list");
    let template = document.querySelector("#eventTemplate").content;

    data.forEach(function (theEvent) {
        let clone = template.cloneNode(true);
        let title = clone.querySelector("h1"); //maybe not title but other name
        let excerpt = clone.querySelector(".excerpt");
        let price = clone.querySelector(".price span");
        let img = clone.querySelector("img");
        let link = clone.querySelector("a.readMore");
        let shortDescription = clone.querySelector(".shortDescription");

        //check those after getting the link
        title.textContent = theEvent.title.rendered;
        shortDescription.innerHTML = theEvent.acf.small_description;
        price.textContent = theEvent.acf.price;
        console.log(theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
        img.setAttribute("src", theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url);
        link.setAttribute("href", "index.html?id="+theEvent.id);
        //shortDescription.innerHTML = theEvent.acf.small_description;
        list.appendChild(clone);
    })

}

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let tagid = searchParams.get("tagid");

getMenu();

if (id) {

    getSingleEventbyId(id);
}
else if(tagid){
    getAllEventsByTag(tagid);
}
else {
    //console.log("test");
    getAllEvents();
}
