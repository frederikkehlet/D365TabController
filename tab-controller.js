//@ts-ignore
var TabController;
(function (TabController) {
    var tabs;
    var currentTab;
    var formContext;
    var keyPresses;
    TabController.onLoad = function (executionContext) {
        formContext = executionContext.getFormContext();
        keyPresses = [];
        tabs = getTabs(formContext);
        currentTab = tabs.filter(function (tab) { return tab.getDisplayState() === "expanded"; })[0];
        setUpEventListeners();
    };
    var getTabs = function (formContext) {
        return formContext.ui.tabs.get();
    };
    var goLeft = function (formContext) {
        var nextTab;
        if (tabs.indexOf(currentTab) == 0)
            nextTab = tabs[tabs.length - 1];
        else
            nextTab = tabs[tabs.indexOf(currentTab) - 1];
        formContext.ui.tabs.get(nextTab.getName()).setFocus();
        currentTab = nextTab;
    };
    var goRight = function (formContext) {
        var nextTab;
        if (tabs.indexOf(currentTab) == tabs.length - 1)
            nextTab = tabs[0];
        else
            nextTab = tabs[tabs.indexOf(currentTab) + 1];
        formContext.ui.tabs.get(nextTab.getName()).setFocus();
        currentTab = nextTab;
    };
    var setUpEventListeners = function () {
        parent.document.addEventListener("keydown", function (event) {
            if (event.code === "ControlLeft" && !keyPresses.includes("ControlLeft")) {
                keyPresses.push(event.code);
            }
            else if (event.code === "ArrowRight" && !keyPresses.includes("ArrowRight")
                && keyPresses.includes("ControlLeft")) {
                keyPresses.push(event.code);
                goRight(formContext);
            }
            else if (event.code === "ArrowLeft" && !keyPresses.includes("ArrowLeft")
                && keyPresses.includes("ControlLeft")) {
                keyPresses.push(event.code);
                goLeft(formContext);
            }
        });
        parent.document.addEventListener("keyup", function (event) {
            keyPresses.splice(keyPresses.indexOf(event.code), 1);
        });
    };
})(TabController || (TabController = {}));
