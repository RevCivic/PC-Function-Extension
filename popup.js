accountLoad.addEventListener("click", async () => {
   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
   chrome.scripting.executeScript({
      target: { tabId: tab.id},
      function: startAccountLoad,
   });
});

function startAccountLoad() {
   var stateToGet = prompt("Enter State Abbreviation","PA");
   var stateData = {};
   for(var i=0;i<states.state.length;i++) {
      console.log("testing "+i)
      if(states.state[i].abbreviation == stateToGet) {
         stateData.name = states.state[i].name;
         stateData.abbr = states.state[i].abbreviation;
      }
   }
   
   if(Object.keys(stateData) === 0) {
      if(confirm("Didn't find a state with that abbreviation, try again? (Cancel will default to PA)")) {
         startAccountLoad();
      } else {
         stateData = {"name":"Pennsylvania","abbr":"PA"};
      }
   } else {
      alert(stateData.abbr);
   }
}