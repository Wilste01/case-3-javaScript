const linksArray = [];


document.getElementById("linkForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    let linkName = inputLinkName.value;
    let linkUrl = inputLinkUrl.value;
    let linkObject = {
        name: linkName,
        url: linkUrl
    };

    linksArray.push(linkObject)
    inputLinkName.value = ''; // Rensa input-fältet
    inputLinkUrl.value = '';



    updateLinksList(); // Uppdatera listan


})


function updateLinksList() {
    let ul = document.getElementById("linksList");
    let wrapper = document.getElementById("ulWrapper")

    if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.id = "ulWrapper";
        document.body.appendChild(wrapper);
    }

    if (!ul) {
        ul = document.createElement('ul');
        ul.id = 'linksList';
        wrapper.appendChild(ul); 
    }

     ul.innerHTML = ''; // Rensa befintlig lista

     linksArray.forEach(link => {
         const li = document.createElement('li');
         const a = document.createElement('a');
         a.href = link.url;
         a.textContent = link.name;
         a.target = '_blank';
         li.appendChild(a);
         ul.appendChild(li);
     });
    
    
}