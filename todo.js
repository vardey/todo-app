// const allTasks = localStorage.getItem("allTasks");

/*
allTasksObj = [{content: string, id: date.now(), isCompleted: boolean}]
*/
const clearTasksList = (id) => {
  if (id === "tasksList") {
    const tasksList = document.getElementById(id);
    tasksList.innerHTML = "";
  } else {
    document.getElementById("parent" + id).remove();
  }
};

const getTasksList = () => {
  const allTasks = localStorage.getItem("allTasks");
  let allTasksList = [];
  try {
    allTasksList = JSON.parse(allTasks) || [];
  } catch (e) {
    allTasksList = [];
  } finally {
    return allTasksList;
  }
};

const setTaskCompleteById = (id) => {
  const allTasks = getTasksList();
  for (let i = 0; i < allTasks.length; i++) {
    // console.log(allTasks[i]);
    if (allTasks[i].id === id) {
      // console.log(allTasks[i]);
      allTasks[i].isCompleted = true;
      break;
    }
  }
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  //   console.log({ allTasks, id });
  clearTasksList("tasksList");
  initTasksList();
};

const createDeleteBtn = (id) => {
  const deleteBtn = document.createElement("span");
  deleteBtn.innerHTML = "delete";
  deleteBtn.addEventListener("click", () => {
    clearTasksList(id);
  });
  deleteBtn.classList.add("deleteBtn");
  // material-symbols-outlined
  deleteBtn.classList.add("material-symbols-outlined");
  return deleteBtn;
};

const createCheckBoxElement = (id, isCompleted, content) => {
  const parentDivEl = document.createElement("div");
  parentDivEl.id = "parent" + id;
  const taskEl = document.createElement("input");

  taskEl.setAttribute("type", "checkbox");
  taskEl.id = id;
  taskEl.addEventListener("change", (e) => {
    setTaskCompleteById(parseInt(e.currentTarget.id, 10));
  });
  const taskLabel = document.createElement("label");
  taskLabel.innerHTML = content;
  if (isCompleted) {
    taskEl.setAttribute("checked", "true");
    taskLabel.innerHTML = "<del>" + content + "</del>";
    taskLabel.id = "label_completed" + id;
    parentDivEl.classList.add("listType_completed");
  } else {
    taskLabel.id = "label_active" + id;
    parentDivEl.classList.add("listType_active");
  }
  taskLabel.htmlFor = id;

//   taskLabel.appendChild(taskEl);
  parentDivEl.appendChild(taskEl);
  parentDivEl.appendChild(taskLabel);

  if (isCompleted) {
    parentDivEl.appendChild(createDeleteBtn(id));
  }
  return parentDivEl;
};

const initTasksList = () => {
  const allTasksList = getTasksList();
  //   console.log(allTasksList);
  const allTasksListEl = document.getElementById("tasksList");

  allTasksList.forEach((task) => {
    const allTasksElement = createCheckBoxElement(
      task.id,
      task.isCompleted,
      task.content
    );
    allTasksListEl.appendChild(allTasksElement);
  });
};

function openTab(evt, tabName) {
  switch (tabName) {
    case "Completed":
      for (let element of document.getElementsByClassName(
        "listType_completed"
      )) {
        element.style.display = "flex";
      }
      for (let element of document.getElementsByClassName("deleteBtn")) {
        element.style.display = "flex";
      }
      for (let element of document.getElementsByClassName("listType_active")) {
        element.style.display = "none";
      }

      break;
    case "Active":
      for (let element of document.getElementsByClassName("listType_active")) {
        element.style.display = "flex";
      }
      for (let element of document.getElementsByClassName(
        "listType_completed"
      )) {
        element.style.display = "none";
      }

      break;
    case "All":
      // all
      for (let element of document.getElementsByClassName(
        "listType_completed"
      )) {
        element.style.display = "flex";
      }
      for (let element of document.getElementsByClassName("listType_active")) {
        element.style.display = "flex";
      }
      for (let element of document.getElementsByClassName("deleteBtn")) {
        element.style.display = "none";
      }

      break;
    default:
      //do nothing
      break;
  }
}

const addTask = () => {
  console.log("add task called");
  const addTaskInputEl = document.getElementById("addTaskInput");
  const value = addTaskInputEl.value;
  if (!value || !value.length) {
    alert("Please enter a task.");
    return;
  }
  const id = Date.now();
  const task = { content: value, id, isCompleted: false };

  let allTasks = localStorage.getItem("allTasks");
  try {
    allTasks = JSON.parse(allTasks) || [];
  } catch (e) {
    allTasks = [];
  }
  allTasks.push(task);
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  console.log({ allTasks, value });
  clearTasksList("tasksList");
  initTasksList();
  addTaskInputEl.value = "";
};

initTasksList();
// open all tab by default
document.getElementById("defaultOpen").click();
