// const linksArray = [];
const linksArray = JSON.parse(localStorage.getItem("linksArray")) || []; // Läs in tidigare länkar eller starta tom
// let idCounter = 1;
let idCounter = parseInt(localStorage.getItem("idCounter")) || 1;

document.getElementById("linkForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let linkName = inputLinkName.value;
    let linkUrl = inputLinkUrl.value;
    let linkObject = {
        name: linkName,
        url: linkUrl,
        id: `${linkName}-${idCounter}`,
    };
    let nameExists = linksArray.some(link => link.name === linkName);

    if (nameExists) {
        let userConfirmed = confirm("Detta länknamnet finns redan. Vill du lägga till det ändå?");
        if (userConfirmed) {
            linksArray.push(linkObject);
            document.getElementById("inputLinkName").value = "";
            document.getElementById("inputLinkUrl").value = "";
            idCounter++;
            updateLinksList();
            saveLinksToLocalStorage();
        }
    } else {
        linksArray.push(linkObject);
        document.getElementById("inputLinkName").value = ""; // Rensa input-fältet
        document.getElementById("inputLinkUrl").value = "";
        idCounter++;
        updateLinksList(); // Uppdatera listan med ny funktion nedan
        saveLinksToLocalStorage();
    }

})


function updateLinksList() {
    let ul = document.getElementById("linksList");
    let wrapper = document.getElementById("ulWrapper")

    if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.id = "ulWrapper";
        linkForm.appendChild(wrapper);
    }

    if (!ul) {
        ul = document.createElement("ul");
        ul.id = "linksList";
        ul.className = "sortable-list"
        wrapper.appendChild(ul);
    }

    ul.innerHTML = ""; // Rensa befintlig lista

    linksArray.forEach(link => {

        const linkContainer = document.createElement("div");
        linkContainer.className = "linkContainer";

        const linkElement = document.createElement("li");
        linkElement.className = "item";
        linkElement.setAttribute("draggable", "true");
        linkElement.id = link.id;

        const div = document.createElement("div");
        div.className = "details";


        const a = document.createElement("a");
        a.href = link.url;
        a.textContent = link.name;
        a.target = "_blank";



        const buttonsContainer = document.createElement("div");
        buttonsContainer.className = "liButtonsContainer";


        const deleteButton = document.createElement("button");
        deleteButton.className = "linkButtons";
        deleteButton.type = "button";
        deleteButton.addEventListener('click', linkDelete);

        const deleteIcon = document.createElement("span");
        deleteIcon.className = "material-symbols-outlined";
        deleteIcon.textContent = "delete";





        const editButton = document.createElement("button");
        editButton.className = "linkButtons";
        editButton.type = "button";
        editButton.addEventListener('click', editLink);

        const editIcon = document.createElement("span");
        editIcon.className = "material-symbols-outlined";
        editIcon.textContent = "edit";


        const favoriteButton = document.createElement("button");
        favoriteButton.className = "favoriteButton";
        favoriteButton.type = "button";
        favoriteButton.addEventListener("click", favoriteLink)

        const favoriteIcon = document.createElement("span");
        favoriteIcon.className = "material-symbols-outlined";
        favoriteIcon.textContent = "favorite";


        // Rörig mess av vissualisera vad som ska vara i vad....
        div.appendChild(a);
        linkElement.appendChild(div);
        editButton.appendChild(editIcon);
        buttonsContainer.appendChild(editButton);
        deleteButton.appendChild(deleteIcon);
        buttonsContainer.appendChild(deleteButton);
        linkElement.appendChild(buttonsContainer);
        favoriteButton.appendChild(favoriteIcon);
        linkContainer.appendChild(favoriteButton);
        linkContainer.appendChild(linkElement);
        ul.appendChild(linkContainer);
    });


}

// Hitta närmaste <li>-element
function getClosestLiId(element) {
    const closestLi = element.closest("li");

    if (closestLi) {
        // console.log(closestLi.id);
        return closestLi.id;
    }
}


function linkDelete(event) {
    const closestLiId = getClosestLiId(event.target);
    if (closestLiId) {
        // Ta bort länken från arrayen
        const index = linksArray.findIndex(link => link.id === closestLiId);
        if (index !== -1) {
            linksArray.splice(index, 1);
            updateLinksList();
            saveLinksToLocalStorage();
        }
    }
}

function getClosestAContent(element) {
    const closestA = element.closest("a");

    if (closestA) {
        // console.log(closestLi.id);
        return closestA.textContent;
    }
}


function editLink(event) {
    // Hittar först närsmta li där allt ligger i
    // sen vidare till rätt anchor och ändra textContent med promt
    const closestLi = event.target.closest("li");

    if (closestLi) {
        const anchor = closestLi.querySelector("div > a");

        if (anchor) {
            const newText = prompt("Ange ny text för länken:", anchor.textContent);

            if (newText) {
                anchor.textContent = newText;
                console.log(`Texten för länken har uppdaterats till: ${newText}`);
            }
        }
    }
}


function favoriteLink(event) {
    const icon = event.target;
    icon.classList.toggle("material-symbols-outlined-fill");
    
}






    // Förhindra incesering av kod i input fälten

    function saveLinksToLocalStorage() {
        localStorage.setItem("linksArray", JSON.stringify(linksArray)); // Spara länkar i localStorage
    }

    function sanitizeInput(input) {
        var element = document.createElement("div");
        element.innerText = input;
        return element.innerHTML;
    }

    // Ladda listan vid sidstart
    document.addEventListener("DOMContentLoaded", () => {
        if (linksArray.length > 0) {
            updateLinksList(); // Uppdatera listan om data finns i localStorage
        }
    });



    //-------------------------- Drag & Drop

    document.addEventListener("DOMContentLoaded", () => {
        if (linksArray.length > 0) {
            updateLinksList(); // Uppdatera listan om data finns i localStorage
        }

        const sortableList = document.querySelector(".sortable-list");

        if (sortableList) {
            sortableList.addEventListener("dragstart", (e) => {
                if (e.target.classList.contains("item")) {
                    setTimeout(() => e.target.classList.add("dragging"), 0);
                }
            });

            sortableList.addEventListener("dragend", (e) => {
                if (e.target.classList.contains("item")) {
                    e.target.classList.remove("dragging");
                }
            });

            const initSortableList = (e) => {
                e.preventDefault();
                const draggingItem = document.querySelector(".dragging");
                let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];
                let nextSibling = siblings.find(sibling => {
                    const rect = sibling.getBoundingClientRect();
                    return e.clientY <= rect.top + rect.height / 2;
                });
                sortableList.insertBefore(draggingItem, nextSibling);
            };

            sortableList.addEventListener("dragover", initSortableList);
            sortableList.addEventListener("dragenter", e => e.preventDefault());
        }
    });





