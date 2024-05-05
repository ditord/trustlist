const popupImage =  document.getElementById('popup_image')
const popupRaiting = document.getElementById('page_raiting')

chrome.runtime.onMessage.addListener((obj,sender,sendResponse)=>{
            console.log(obj)
           if(obj.type === 'UPDATE_POPUP_IMAGE'){
                updatePopupContent(obj.imgType);
           }
    
})

window.onload =()=>{
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
            chrome.runtime.sendMessage({message:"POPUP_OPPENED",tabId:tabs[0].id},{},(response)=>{
                updatePopupContent(response);
            })
    })
}

function updatePopupContent(type){
    switch (type){
        case "SAFE": {
            popupImage.src = "./img/Logo_Green.png";
            popupRaiting.innerHTML = "This Web site is Safe!";
            popupRaiting.style.color = "green";
            break;
        }
        case "UNSAFE":{
            popupImage.src = "./img/Logo_Red.png";
            popupRaiting.innerHTML = "This Web site is Unsafe!";
            popupRaiting.style.color = "red";
            break;
        }
        case "UNKNOWN":{
            popupImage.src = "./img/Logo_Yellow.png";
            popupRaiting.innerHTML = "This Web site is Unknown!";
            popupRaiting.style.color = "yellow";
            break;
        }
    }
}