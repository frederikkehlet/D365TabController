//@ts-ignore
namespace TabController
{
    let tabs: Array<Xrm.Controls.Tab>;
    let currentTab: Xrm.Controls.Tab;
    let formContext: Xrm.FormContext;
    let keyPresses: Array<string>;

    export const onLoad = (executionContext: Xrm.Events.EventContext): void =>
    {
        formContext = executionContext.getFormContext();
        keyPresses = [];
        tabs = getTabs(formContext);
        currentTab = tabs.filter(tab => tab.getDisplayState() === "expanded")[0];
        setUpEventListeners();
    }   

    const getTabs = (formContext: Xrm.FormContext): Array<Xrm.Controls.Tab> => 
    { 
        return formContext.ui.tabs.get(); 
    }

    const goLeft = (formContext: Xrm.FormContext): void =>
    {  
        let nextTab: Xrm.Controls.Tab;       
        
        if (tabs.indexOf(currentTab) == 0) nextTab = tabs[tabs.length - 1];      
        else nextTab = tabs[tabs.indexOf(currentTab) - 1];
        
        formContext.ui.tabs.get(nextTab.getName()).setFocus();
        currentTab = nextTab;
    }

    const goRight = (formContext: Xrm.FormContext): void => 
    {
        let nextTab: Xrm.Controls.Tab;
        
        if (tabs.indexOf(currentTab) == tabs.length - 1) nextTab = tabs[0];       
        else nextTab = tabs[tabs.indexOf(currentTab) + 1];
                
        formContext.ui.tabs.get(nextTab.getName()).setFocus();
        currentTab = nextTab;
    }

    const setUpEventListeners = (): void => 
    {
        parent.document.addEventListener("keydown", (event) => 
        {
            if (event.code === "ControlLeft" && !keyPresses.includes("ControlLeft"))
            {
                keyPresses.push(event.code);
            } 
            else if (event.code === "ArrowRight" && !keyPresses.includes("ArrowRight")
            && keyPresses.includes("ControlLeft"))
            {
                keyPresses.push(event.code);
                goRight(formContext);
            }
            else if (event.code === "ArrowLeft" && !keyPresses.includes("ArrowLeft")
            && keyPresses.includes("ControlLeft"))
            {
                keyPresses.push(event.code);
                goLeft(formContext);
            }
        });

        parent.document.addEventListener("keyup", (event) =>
        {
            keyPresses.splice(keyPresses.indexOf(event.code),1);
        });
    }
}

