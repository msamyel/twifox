document.addEventListener('DOMContentLoaded', function () {

    const selectListDropdown = document.getElementById("select-list-dropdown");
    const selectActionDropdown = document.getElementById("select-action-dropdown");
    const confirmBtn = document.getElementById("set-action-button");

    selectListDropdown.addEventListener('change', handleListSelectionChanged, false);
    confirmBtn.addEventListener('click', setListAction, false);

    // track selected user actions
    let userChoices = {};
    loadUserChoices();
    
    function loadUserChoices() {
        chrome.storage.local.get(["userChoices"], (result) => {
            if (result.userChoices === undefined) {
                return;
            }
            userChoices = result.userChoices;
            // refresh currently selected list option
            handleListSelectionChanged();
        });
    }
    
    function getSelectedString(dropdown) {
        return dropdown.options[dropdown.selectedIndex].text;
    }

    function getSelectedValue(dropdown) {
        return dropdown.options[dropdown.selectedIndex].value;
    }

    function updateLocalStorage(listValue, actionValue) {
        chrome.storage.local.set({'userChoices': userChoices}).then(() => {});
    }

    function setActionValueFromLocalStorage(listValue) {
        
        const actionValue = userChoices[listValue];
        
        if (actionValue === undefined) {
            // alert(`Seznam ${listValue} nemá přiřazenou akci.`);
            selectActionDropdown.selectedIndex = 0;
            return;
        }
        // alert(`Seznam ${listValue} ma prirazenou akci ${actionValue}.`)
        selectActionDropdown.value = actionValue;
    }

    function handleListSelectionChanged() {
        const selectedListValue = getSelectedValue(selectListDropdown);
        setActionValueFromLocalStorage(selectedListValue);
    }

    function setListAction() {
        const listValue = getSelectedValue(selectListDropdown);
        const actionValue = getSelectedValue(selectActionDropdown);

        userChoices[listValue] = actionValue;
        // alert(`K seznamu ${listValue} byla přiřazena akce ${actionValue}`);
        updateLocalStorage();
    }
});