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
            li.classList.toggle("checked", this.checked);
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
    let tasks = [];
    listContainer.querySelectorAll("li").forEach(li => {
        let checkbox = li.querySelector("input[type=checkbox]");
        let task = {
            text: li.querySelector("label").textContent,
            checked: checkbox.checked
        };
        tasks.push(task);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadData() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => {
            let li = document.createElement("li");
            let checkboxContainer = document.createElement("div");
            checkboxContainer.classList.add("checkbox-container");

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.checked;
            if (task.checked) {
                li.classList.add("checked");
            }
            checkbox.addEventListener("change", function() {
                li.classList.toggle("checked", this.checked);
                saveData();
            });

            let label = document.createElement("label");
            label.textContent = task.text;

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
        });
    }
}

loadData();
