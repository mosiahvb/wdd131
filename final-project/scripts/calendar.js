const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        let checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add("checkbox-container");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        // Needed to do this to generate an ID for each check box, so lighthouse would not give me an error.
        let checkboxId = "checkbox-" + new Date().getTime();
        checkbox.id = checkboxId;
        checkbox.addEventListener("change", function() {
            li.classList.toggle("checked");
            saveData();
        });

        let label = document.createElement("label");
        label.htmlFor = checkboxId;
        label.textContent = inputBox.value;

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        li.appendChild(checkboxContainer);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function() {
            li.remove();
            saveData();
        });

        li.appendChild(deleteBtn);
        listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function loadData() {
    listContainer.innerHTML = localStorage.getItem("data");
    listContainer.querySelectorAll("input[type=checkbox]").forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            checkbox.parentElement.parentElement.classList.toggle("checked");
            saveData();
        });
    });

    listContainer.querySelectorAll(".delete-btn").forEach(deleteBtn => {
        deleteBtn.addEventListener("click", function() {
            deleteBtn.parentElement.remove();
            saveData();
        });
    });
}

loadData();
