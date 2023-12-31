/*
localStorage = {
    allTasksObj = JSON.stringify([{content: string, id: date.now(), isCompleted: boolean}])
}
*/

const makeTabActive = (tabName) => {
  switch (tabName) {
    case "All":
      document.getElementsByClassName("allTab")[0].style.borderBottom = "4px solid #2F80ED";
      document.getElementsByClassName("activeTab")[0].style.borderBottom = "none";
      document.getElementsByClassName("completedTab")[0].style.borderBottom = "none";
      break;
    case "Active":
      document.getElementsByClassName("activeTab")[0].style.borderBottom = "4px solid #2F80ED";
      document.getElementsByClassName("allTab")[0].style.borderBottom = "none";
      document.getElementsByClassName("completedTab")[0].style.borderBottom = "none";
      break;
    case "Completed":
      document.getElementsByClassName("completedTab")[0].style.borderBottom = "4px solid #2F80ED";
      document.getElementsByClassName("allTab")[0].style.borderBottom = "none";
      document.getElementsByClassName("activeTab")[0].style.borderBottom = "none";
      break;
    default:
      break;
  }
}

const deleteAll = () => {
  const newList = getTasksList().filter((task) => !task.isCompleted);
  localStorage.setItem("allTasks", JSON.stringify(newList));

  createTasksList("All");
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

const setTaskCompleteById = (id, value, currentTab) => {
  const allTasks = getTasksList();
  for (let i = 0; i < allTasks.length; i++) {
    // console.log(allTasks[i]);
    if (allTasks[i].id === id) {
      // console.log(allTasks[i]);
      allTasks[i].isCompleted = value;
      break;
    }
  }
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  createTasksList(currentTab);
};

const clearTasksList = (id) => {
  const allTasks = getTasksList();
  const newTasksList = allTasks.filter((task) => task.id !== id);
  localStorage.setItem("allTasks", JSON.stringify(newTasksList));
  document.getElementById("parent" + id).remove();
};

const createDeleteBtn = (id) => {
  const deleteBtn = document.createElement("i");
  deleteBtn.innerHTML = "delete";
  deleteBtn.addEventListener("click", () => {
    clearTasksList(id);
  });
  deleteBtn.classList.add("deleteBtn");
  // material-symbols-outlined
  deleteBtn.classList.add("material-symbols-outlined");

  deleteBtn.style.display = "flex";
  return deleteBtn;
};

const createCheckBoxElement = (id, isCompleted, content, currentTab) => {
  const parentDivEl = document.createElement("div");
  parentDivEl.id = "parent" + id;
  const taskEl = document.createElement("input");
  parentDivEl.style.display = "flex";

  taskEl.setAttribute("type", "checkbox");
  taskEl.id = id;
  taskEl.addEventListener("change", (e) => {
    setTaskCompleteById(
      parseInt(e.currentTarget.id, 10),
      e.target.checked,
      currentTab
    );
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

  console.log(localStorage.getItem("currentTab"));
  if (currentTab === "Completed") {
    parentDivEl.appendChild(createDeleteBtn(id));
  }
  return parentDivEl;
};

const createTasksList = (currentTab) => {
  const tasksList = getTasksList().filter((task) => {
    if (currentTab === "Completed" && task.isCompleted) {
      return task;
    } else if (currentTab === "Active" && !task.isCompleted) {
      return task;
    } else if (currentTab === "All") {
      return task;
    }
  });

  if (currentTab === "Completed") {
    const el = document.getElementsByClassName("textInput");
    if (el && el.length) {
      el[0].classList.replace("textInput", "hideTextInput");
    }
    if (tasksList && tasksList.length) {
      const hideDeleteAllDiv =
        document.getElementsByClassName("hideDeleteAllDiv");
      if (hideDeleteAllDiv && hideDeleteAllDiv.length) {
        hideDeleteAllDiv[0].classList.replace(
          "hideDeleteAllDiv",
          "deleteAllDiv"
        );
      }
    }
  } else {
    const el = document.getElementsByClassName("hideTextInput");
    if (el && el.length) {
      el[0].classList.replace("hideTextInput", "textInput");
    }
    const deleteAllDiv = document.getElementsByClassName("deleteAllDiv");
    if (deleteAllDiv && deleteAllDiv.length) {
      deleteAllDiv[0].classList.replace("deleteAllDiv", "hideDeleteAllDiv");
    }
  }
  console.log({ tasksList, currentTab });
  //clear html element
  const tasksListsEl = document.getElementById("tasksList");
  tasksListsEl.innerHTML = "";

  tasksList.forEach((task) => {
    const allTasksElement = createCheckBoxElement(
      task.id,
      task.isCompleted,
      task.content,
      currentTab
    );
    tasksListsEl.appendChild(allTasksElement);
  });
  makeTabActive(currentTab);
};

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

  const allTasks = getTasksList();

  allTasks.push(task);
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  console.log({ allTasks, value });
  createTasksList("All"); //switch to all tab
  addTaskInputEl.value = "";
};

// createTasksList("All");
document.getElementById("defaultOpen").click();
