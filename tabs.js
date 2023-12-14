const tabsContainer = document.querySelector(".tabs-container");
const tabsList = document.querySelector(".tabs-list");
const tabButtons = tabsList.querySelectorAll(".tab");
const tabPanels = tabsContainer.querySelectorAll(
  ".tab-panel-container > .tab-panel"
);

//first tab is opened by default: SO -- for each tab that isnt the first one - hide the associated panel
tabButtons.forEach((tab, index) => {
  if (index === 0) {
    tab.setAttribute("aria-selected", "true");
  } else {
    tab.setAttribute("tabindex", "-1"); //guidelines of how accessible tab system should work
    tabPanels[index].setAttribute("hidden", "");
  }
});

//by default since the links are associated with the the id's of the content,
// when we click the the tab it will jump to that part of the page which we dont want to happen
//we only did that just in case the user has javascript disabled for some reason
//and if so the content would still make sense and be connected in the right way
//but in the case that they do, we want to prevent the default behavior

tabsContainer.addEventListener("click", function (e) {
  //first we'll look at what we clicked on since we have the event on the entire container
  //as opposed to the the individual tabs
  const clickedTab = e.target.closest("a");

  //if null, aka we didnt actally click on the tab link then just return and do nothing
  if (!clickedTab) return;

  e.preventDefault();
  setActiveTab(clickedTab);
});

tabsContainer.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    default:
      return;
  }
});

//guidelines of how accessible tab system should work
tabPanels.forEach((panel) => {
  panel.setAttribute("tabindex", "0");
});

/********************************************
FUNCTIONS TO SET ACTIVE TAB
param: clickedTab
*********************************************/
function setActiveTab(clickedTab) {
  //Get the active tab and associated active panel
  //We do this by grabbing href of the clicked tab
  //because that it was we used for the ID's of the associated panel
  const activeTab = clickedTab.getAttribute("href");
  const activePanel = document.querySelector(activeTab);

  //RESET TABS: go through and make sure no tab is selected
  tabButtons.forEach((tab) => {
    tab.setAttribute("aria-selected", false);
    tab.setAttribute("tabindex", "-1");
  });
  //we'll also go through all the panels and add hidden to all panels
  tabPanels.forEach((tabPanel) => {
    tabPanel.setAttribute("hidden", true);
  });

  //next we'll set the active tab
  clickedTab.setAttribute("aria-selected", true);
  clickedTab.setAttribute("tabindex", "0");
  clickedTab.focus();

  //and then remove the hidden attribute from the corresponding active panel
  activePanel.removeAttribute("hidden");
}

/********************************************
FUNCTIONS TO SWITCH TABS USING ARROW KEYS
*********************************************/
function moveLeft() {
  const currentTab = document.activeElement;
  //if there is no more tabs to the left
  if (!currentTab.parentElement.previousElementSibling) {
    setActiveTab(tabButtons[tabButtons.length - 1]);
  } else {
    setActiveTab(
      currentTab.parentElement.previousElementSibling.querySelector("a")
    );
  }
}
function moveRight() {
  const currentTab = document.activeElement;
  //if there is no more tabs to the left
  if (!currentTab.parentElement.nextElementSibling) {
    setActiveTab(tabButtons[0]);
  } else {
    setActiveTab(
      currentTab.parentElement.nextElementSibling.querySelector("a")
    );
  }
}
