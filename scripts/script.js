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
    let wrapper = document.getElementById("wrapper");

    if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.id = "wrapper";
        linkForm.appendChild(wrapper);
    }

    if (!ul) {
        ul = document.createElement("ul");
        ul.id = "linksList";
        ul.className = "sortable-list";
        wrapper.appendChild(ul);

        const linkWrapper = document.createElement("div");
        linkWrapper.className = "linkWrapper";

        // const dialWrapper = document.createElement("div");
        // dialWrapper.className = "dialWrapper";

        // const dialKnob = document.createElement("div");
        // dialKnob.className = "dialKnob";
        // dialKnob.id = "dialKnob";
        // linkWrapper.appendChild(dialWrapper);
        // dialWrapper.appendChild(dialKnob);
        // wrapper.appendChild(dialWrapper)
    }

    ul.innerHTML = ""; // Rensa befintlig lista

    linksArray.forEach(link => {


        const linkContainer = document.createElement("div");
        linkContainer.className = "linkContainer item";
        linkContainer.setAttribute("draggable", "true");
        // linkContainer.id = link.id;

        const linkElement = document.createElement("li");
        linkElement.className = "item";
        //  linkElement.setAttribute("draggable", "true");
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


        // const favoriteButton = document.createElement("button");
        // favoriteButton.className = "favoriteButton";
        // favoriteButton.type = "button";
        // favoriteButton.addEventListener("click", favoriteLink);

        const favoriteIcon = document.createElement("span");
        favoriteIcon.className = "material-symbols-outlined spanExclude";
        favoriteIcon.textContent = "favorite";

        const favSlideContainer = document.createElement("div");
        favSlideContainer.id = `${link.id}FavouriteButtonContainer`;
        favSlideContainer.className = "FavouriteButtonContainer";

        const favbut = document.createElement("button");
        favbut.className = "buttonCenter";
        favbut.type = "button";
        favbut.id = `${link.id}FavouriteButton`;
        favbut.onclick = toggleAnimation;




        // Rörig mess av vissualisera vad som ska vara i vad....
        div.appendChild(a);
        linkElement.appendChild(div);
        editButton.appendChild(editIcon);
        buttonsContainer.appendChild(editButton);
        deleteButton.appendChild(deleteIcon);
        buttonsContainer.appendChild(deleteButton);
        linkElement.appendChild(buttonsContainer);
        // favoriteButton.appendChild(favoriteIcon);
        // linkContainer.appendChild(favoriteButton);
        favbut.appendChild(favoriteIcon);
        favSlideContainer.appendChild(favbut);
        linkContainer.appendChild(favSlideContainer);
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
    const sortableList = document.querySelector(".sortable-list");

    if (sortableList) {
        sortableList.addEventListener("dragstart", (e) => {
            if (e.target.classList.contains("item")) {
                isDragging = true;
                setTimeout(() => e.target.classList.add("dragging"), 0);
            }
        });

        sortableList.addEventListener("dragend", (e) => {
            if (e.target.classList.contains("item")) {
                isDragging = false;
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
        sortableList.addEventListener("dragenter", (e) => e.preventDefault());
    }
});



// Sibling

const initSortableList = (e) => {
    e.preventDefault();

    const draggingItem = document.querySelector(".dragging");
    let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

    // Hitta nästa syskon baserat på musposition
    let nextSibling = siblings.find(sibling => {
        const rect = sibling.getBoundingClientRect();
        return e.clientY <= rect.top + rect.height / 2;
    });

    // Om nästa syskon inte finns, sätt nextSibling till null
    if (!nextSibling) {
        sortableList.appendChild(draggingItem); // Lägg till i slutet om inget syskon hittas
    } else {
        sortableList.insertBefore(draggingItem, nextSibling);
    }
};


// ---------- Favourite toggle animation


function toggleAnimation(event) {
    const button = event.target;
    const buttonCenter = button.closest('.buttonCenter');
    const buttonContainer = button.closest('.button');

    if (buttonCenter.classList.contains('animate-forward')) {
        buttonCenter.classList.remove('animate-forward');
        buttonCenter.classList.add('animate-backward');
    } else {
        buttonCenter.classList.remove('animate-backward');
        buttonCenter.classList.add('animate-forward');
    }

    if (buttonContainer.classList.contains('animate-forward')) {
        buttonContainer.classList.remove('animate-forward');
        buttonContainer.classList.add('animate-backward');
    } else {
        buttonContainer.classList.remove('animate-backward');
        buttonContainer.classList.add('animate-forward');
    }

}
// Dial knob


document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.getElementById("dialWrapper");
    const knob = document.getElementById("dialKnob");
    const snapAngles = [0, 90, 180, 270]; // Positioner i vinklarna där olika kategorierna finns.
    let currentRotation = 0; // start värde vid sidinladdning
    let isDragging = false;
    let lastAngle = null;

    // beräknar vinkeln i grader mellan en punkt (x, y)
    function getAngle(x, y) {
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        return Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    }

    function calculateShortestRotation(lastAngle, newAngle) {
        let delta = newAngle - lastAngle;
        if (delta > 180) delta -= 360; // medsols positivt
        if (delta < -180) delta += 360; // motsols negativt
        return delta;
    }

    function findClosestSnapAngle(angle) {
        return snapAngles.reduce(function (prev, curr) {
            return Math.abs(curr - angle) < Math.abs(prev - angle) ? curr : prev;
        });
    }

    function applyRotation(angle) {
        console.log(`Applying rotation: ${angle}`);
        knob.style.transform = `rotate(${angle}deg)`;
        const closestSnapAngle = findClosestSnapAngle(angle);
        showContent(closestSnapAngle);
    }

    function showContent(angle) {
        console.log(`Showing content for angle: ${angle}`);
        snapAngles.forEach(snapAngle => {
            const contentDiv = document.getElementById(`content${snapAngle}`);
            if (contentDiv) {
                if (snapAngle === angle) {
                    contentDiv.classList.remove('hidden');
                } else {
                    contentDiv.classList.add('hidden');
                }
            }
        });
    }

    function updateRotation(e) {
        if (!isDragging) return;
        const newAngle = getAngle(e.clientX, e.clientY);
        const delta = calculateShortestRotation(lastAngle, newAngle);
        currentRotation += delta;
        currentRotation = ((currentRotation % 360) + 360) % 360; // Normalisera till 0-359
        applyRotation(currentRotation);
        lastAngle = newAngle; // Uppdaterar vinkel
    }

    wrapper.addEventListener('mousedown', function (e) {
        isDragging = true;
        lastAngle = getAngle(e.clientX, e.clientY);
        wrapper.style.cursor = 'grabbing';
        document.body.classList.add('no-select');
    });

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        updateRotation(e);
    });

    document.addEventListener('mouseup', function () {
        if (!isDragging) return;
        isDragging = false;
        wrapper.style.cursor = 'grab';
        document.body.classList.remove('no-select');

        // Hitta närmaste vinkel positionen
        const normalizedRotation = ((currentRotation % 360) + 360) % 360; // Normalisera till 0-359
        const closestSnapAngle = findClosestSnapAngle(normalizedRotation);

        // gå till närmsta vinkel positionen
        const delta = calculateShortestRotation(normalizedRotation, closestSnapAngle);
        currentRotation = closestSnapAngle; // Uppdatera currentRotation till närmaste snapAngle
        applyRotation(currentRotation);
    });

    const snapButtons = document.querySelectorAll('.dialButton');
    snapButtons.forEach(button => {
        button.addEventListener('click', function () {
            const angle = parseInt(button.getAttribute('data-angle'));
            applyRotation(angle);
            currentRotation = angle; // Uppdatera currentRotation
        });
    });
});
