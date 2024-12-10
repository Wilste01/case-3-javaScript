
const defaultLinksArray = JSON.parse(localStorage.getItem("linksArray")) || {
    music: [],
    movies: [],
    news: [],
    socialMedia: [],
};
const storedLinksArray = JSON.parse(localStorage.getItem("linksArray")) || {};
const linksArray = Object.assign(defaultLinksArray, storedLinksArray);



let idCounter = parseInt(localStorage.getItem("idCounter")) || 1;

document.getElementById("linkForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const inputLinkName = document.getElementById("inputLinkName");
    const inputLinkUrl = document.getElementById("inputLinkUrl");
    const inputLinkCategory = document.getElementById("inputLinkCategory");


    let linkName = inputLinkName.value;
    let linkUrl = inputLinkUrl.value;
    let linkCategory = inputLinkCategory.value;


    let linkObject = {
        name: linkName,
        url: linkUrl,
        category: linkCategory,
        id: `${linkName}-${idCounter}`,
        favorite: false,
    };
    // kategori matchar name och linkName
    let nameExists = (linksArray[linkCategory] || []).some(link => link.name === linkName);

    if (nameExists) {
        let userConfirmed = confirm("Detta länknamnet finns redan. Vill du lägga till det ändå?");
        if (userConfirmed) {
            switch (linkCategory) {
                case "music":
                    linksArray[linkCategory].push(linkObject);
                    document.getElementById("inputLinkName").value = "";
                    document.getElementById("inputLinkUrl").value = "";
                    idCounter++;
                    localStorage.setItem("idCounter", idCounter);
                    updateLinksList();
                    saveLinksToLocalStorage();
                    break;
                case "movies":
                    linksArray[linkCategory].push(linkObject);
                    document.getElementById("inputLinkName").value = "";
                    document.getElementById("inputLinkUrl").value = "";
                    idCounter++;
                    localStorage.setItem("idCounter", idCounter);
                    updateLinksList();
                    saveLinksToLocalStorage();
                    break;
                case "news":
                    linksArray[linkCategory].push(linkObject);
                    document.getElementById("inputLinkName").value = "";
                    document.getElementById("inputLinkUrl").value = "";
                    idCounter++;
                    localStorage.setItem("idCounter", idCounter);
                    updateLinksList();
                    saveLinksToLocalStorage();
                    break;
                case "socialMedia":
                    linksArray[linkCategory].push(linkObject);
                    document.getElementById("inputLinkName").value = "";
                    document.getElementById("inputLinkUrl").value = "";
                    idCounter++;
                    localStorage.setItem("idCounter", idCounter);
                    updateLinksList();
                    saveLinksToLocalStorage();
                    break;
            }
        }
    } else {
        switch (linkCategory) {
            case "music":
                linksArray[linkCategory].push(linkObject);
                document.getElementById("inputLinkName").value = "";
                document.getElementById("inputLinkUrl").value = "";
                idCounter++;
                localStorage.setItem("idCounter", idCounter);
                updateLinksList();
                saveLinksToLocalStorage();
                break;
            case "movies":
                linksArray[linkCategory].push(linkObject);
                document.getElementById("inputLinkName").value = "";
                document.getElementById("inputLinkUrl").value = "";
                idCounter++;
                localStorage.setItem("idCounter", idCounter);
                updateLinksList();
                saveLinksToLocalStorage();
                break;
            case "news":
                linksArray[linkCategory].push(linkObject);
                document.getElementById("inputLinkName").value = "";
                document.getElementById("inputLinkUrl").value = "";
                idCounter++;
                localStorage.setItem("idCounter", idCounter);
                updateLinksList();
                saveLinksToLocalStorage();
                break;
            case "socialMedia":
                linksArray[linkCategory].push(linkObject);
                document.getElementById("inputLinkName").value = "";
                document.getElementById("inputLinkUrl").value = "";
                idCounter++;
                localStorage.setItem("idCounter", idCounter);
                updateLinksList();
                saveLinksToLocalStorage();
                break;
        }
    }
});



function updateLinksList() {
    const content0 = document.querySelector("#content0 .sortable-list"); 
    const content90 = document.querySelector("#content90 .sortable-list"); 
    const content180 = document.querySelector("#content180 .sortable-list");
    const content270 = document.querySelector("#content270 .sortable-list"); 



    // Rensa alla innehåll först
    content0.innerHTML = "";
    content90.innerHTML = "";
    content180.innerHTML = "";
    content270.innerHTML = "";

    for (let category in linksArray) {
        linksArray[category].forEach(link => {
            // Kontrollerar om länken redan finns i listan
            if (!document.getElementById(link.id)) {
                const linkContainer = document.createElement("div");
                linkContainer.className = "linkContainer item";
                linkContainer.setAttribute("draggable", "true");

                const linkElement = document.createElement("li");
                linkElement.className = "item";
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

                favbut.appendChild(favoriteIcon);
                favSlideContainer.appendChild(favbut);
                linkContainer.appendChild(favSlideContainer);


                deleteButton.appendChild(deleteIcon);
                editButton.appendChild(editIcon);
                buttonsContainer.appendChild(editButton);
                buttonsContainer.appendChild(deleteButton);

                div.appendChild(a);
                linkElement.appendChild(div);
                linkElement.appendChild(buttonsContainer);
                linkContainer.appendChild(linkElement);

                // Lägg till länken i rätt kategori
                switch (link.category) {
                    case "news":
                        content0.appendChild(linkContainer);
                        break;
                    case "socialMedia":
                        content90.appendChild(linkContainer);
                        break;
                    case "music":
                        content180.appendChild(linkContainer);
                        break;
                    case "movies":
                        content270.appendChild(linkContainer);
                        break;
                }
            }
        });
    }




    // -------- DRAG & DROP FUNKTION

    const sortableLists = document.querySelectorAll(".sortable-list");
    sortableLists.forEach(sortableList => {
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
    });
}



// Hitta närmaste <li>-element
function getClosestLiId(element) {
    const closestLi = element.closest("li");

    if (closestLi) {
        return closestLi.id;
    }
}

// Hitta rätt a element

function getClosestAContent(element) {
    const closestA = element.closest("a");

    if (closestA) {
        // console.log(closestLi.id);
        return closestA.textContent;
    }
}

// Radera länk
function linkDelete(event) {
    const closestLiId = getClosestLiId(event.target);
    if (closestLiId) {
        // Hitta rätt kategori och ta bort länken från arrayen
        for (let category in linksArray) {
            const index = linksArray[category].findIndex(link => link.id === closestLiId);
            if (index !== -1) {
                linksArray[category].splice(index, 1);
                updateLinksList();
                saveLinksToLocalStorage();
                break;
            }
        }
    }
}








// Byta namn på länk

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
            }
        }
    }
}

// Favourite fill toggle

function favoriteLink(event) {
    const icon = event.target;
    icon.classList.toggle("material-symbols-outlined-fill");

    const closestLiId = getClosestLiId(icon);
    if (closestLiId) {
        for (let category in linksArray) {
            const link = linksArray[category].find(link => link.id === closestLiId);
            if (link) {
                link.isFavorite = icon.classList.contains("material-symbols-outlined-fill");
                saveLinksToLocalStorage();
                break;
            }
        }
    }
}

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



// Förhindra incesering av kod i input fälten

function saveLinksToLocalStorage() {
    localStorage.setItem("linksArray", JSON.stringify(linksArray)); // Spara länkar i localStorage
    localStorage.setItem("idCounter", idCounter.toString());
}

function sanitizeInput(input) {
    var element = document.createElement("div");
    element.innerText = input;
    return element.innerHTML;
}




// --------------- DIAL KNOB


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
        // console.log(`Applying rotation: ${angle}`);
        knob.style.transform = `rotate(${angle}deg)`;
        const closestSnapAngle = findClosestSnapAngle(angle);
        showContent(closestSnapAngle);
    }

    function showContent(angle) {
        const snapAngles = [0, 90, 180, 270];
        snapAngles.forEach(snapAngle => {
            const contentDiv = document.getElementById(`content${snapAngle}`);
            if (contentDiv) {
                if (snapAngle === angle) {
                    contentDiv.classList.remove('hidden');
                    updateLinksList(); // Uppdaterar länkarna 
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
        const normalizedRotation = ((currentRotation % 360) + 360) % 360; 
        const closestSnapAngle = findClosestSnapAngle(normalizedRotation);

        // gå till närmsta positionen
        const delta = calculateShortestRotation(normalizedRotation, closestSnapAngle);
        currentRotation = closestSnapAngle; // Uppdatera currentRotation till närmaste snapAngle
        applyRotation(currentRotation);
    });

    const snapButtons = document.querySelectorAll('.dialButton');
    snapButtons.forEach(button => {
        button.addEventListener('click', function () {
            const angle = parseInt(button.getAttribute('data-angle'));
            applyRotation(angle);
            currentRotation = angle; 
            // updateLinksList();
        });
    });
});


window.onload = function () {
    const elementsToHide = document.querySelectorAll('.content');
    elementsToHide.forEach(element => {
        element.classList.add('hidden');

    });
};