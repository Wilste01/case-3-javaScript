const linksArray = [];


document.getElementById("linkForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    let linkName = inputLinkName.value;
    let linkUrl = inputLinkUrl.value;
    let linkObject = {
        name: linkName,
        url: linkUrl
    };
    let nameExists = linksArray.some(link => link.name === linkName);

    if (nameExists) {
        let userConfirmed = confirm("Detta länknamnet finns redan. Vill du lägga till det ändå?");
        if (userConfirmed) {
            linksArray.push(linkObject);
            document.getElementById('inputLinkName').value = ''; 
            document.getElementById('inputLinkUrl').value = ''; 
            updateLinksList(); 
        }
    } else {
        linksArray.push(linkObject);
        document.getElementById('inputLinkName').value = ''; // Rensa input-fältet
        document.getElementById('inputLinkUrl').value = ''; 
        updateLinksList(); // Uppdatera listan med ny funktion nedan
    }

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


// Förhindra incesering av kod i input fälten

function sanitizeInput(input) {
    var element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}

var userInput = document.getElementById("inputLinkName", "inputLinkUrl").value;
var sanitizedInput = sanitizeInput(userInput);