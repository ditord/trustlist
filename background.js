const tabsHistory = new Map();
chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab)=>{
  
    chrome.tabs.sendMessage(tabId,{
        type:"UPDATE",
        tabUrl : tab.url
    },{},(response)=>{
      
       setIcon(response);
       tabsHistory.set(tabId,response);
    })

})
chrome.runtime.onMessage.addListener((obj,sender,sendResponse)=>{
    if(obj.message == "POPUP_OPPENED"){
      sendResponse(tabsHistory.get(obj.tabId))
    }
})
chrome.tabs.onActivated.addListener((activeInfo)=>{
            if(tabsHistory.get(activeInfo.tabId)){
              setIcon(tabsHistory.get(activeInfo.tabId))
              chrome.runtime.sendMessage(
                {
                  type:"UPDATE_POPUP_IMAGE",
                  imgType : tabsHistory.get(activeInfo.tabId)
              }
              )
            }else{
              setIcon('UNKNOWN')
              chrome.runtime.sendMessage(
                {
                  type:"UPDATE_POPUP_IMAGE",
                  imgType : 'UNKNOWN'
              }
              )
            }
     
        })

function setIcon(response){
  switch (response){
    case "SAFE": {
      chrome.action.setIcon({
        path:{
          "48" : "/img/Logo_Green_48.png"
        }
      })
      break;
    }
    case "UNSAFE" :{
      chrome.action.setIcon({
        path:{
          "48" : "/img/Logo_Red_48.png"
        }
      })
      break;
    }
    case "UNKNOWN" :{
      chrome.action.setIcon({
        path:{
          "48" : "/img/Logo_Yellow_48.png"
        }
      })
      break;
    }
  }
}