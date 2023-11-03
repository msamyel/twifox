document.addEventListener('DOMContentLoaded', function() {
    /* Add your event listeners here */

    const selectListDropdown = document.getElementById("select-list-dropdown");
    const selectActionDropdown = document.getElementById("select-action-dropdown");
    const confirmBtn = document.getElementById("set-action-button");

    confirmBtn.addEventListener('click', setListAction, false);

    function getSelectedString(dropdown) {
        return dropdown.options[dropdown.selectedIndex].text;
    }

    function setListAction() {
        const listName = getSelectedString(selectListDropdown);
        const actionName = getSelectedString(selectActionDropdown);
        alert(`K seznamu ${listName} byla přiřazena akce ${actionName}`);
    }
});