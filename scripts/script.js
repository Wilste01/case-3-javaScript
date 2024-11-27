// const linksArray = [];
const linksArray = JSON.parse(localStorage.getItem("linksArray")) || []; // Läs in tidigare länkar eller starta tom



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
            saveLinksToLocalStorage();
        }
    } else {
        linksArray.push(linkObject);
        document.getElementById('inputLinkName').value = ''; // Rensa input-fältet
        document.getElementById('inputLinkUrl').value = '';
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
        ul = document.createElement('ul');
        ul.id = 'linksList';
        ul.className = "sortable-list"
        wrapper.appendChild(ul);
    }

    ul.innerHTML = ''; // Rensa befintlig lista

    linksArray.forEach(link => {
        // cardDiv = document.createElement("div");
        // cardDiv.id = "cardDiv";

        const li = document.createElement('li');
        li.className = "item";
        li.setAttribute("draggable", "true");

        const div = document.createElement("div");
        div.className = "details";

        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.name;
        a.target = '_blank';

        const deleteButton = document.createElement("span")
        deleteButton.className = "material-symbols-outlined";
        deleteButton.textContent = "delete";

        const icon = document.createElement('span');
        icon.className = "material-symbols-outlined";
        icon.textContent = "drag_indicator";

        div.appendChild(a);
        li.appendChild(div);
        li.appendChild(icon);
        ul.appendChild(li);
    });


}

// ---------- Remove function








// Förhindra incesering av kod i input fälten

function saveLinksToLocalStorage() {
    localStorage.setItem("linksArray", JSON.stringify(linksArray)); // Spara länkar i localStorage
}

function sanitizeInput(input) {
    var element = document.createElement('div');
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




