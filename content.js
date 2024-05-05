   (()=>{
    let safe;
    let unsafe;
    let currentDomain;
    getDomainsList().then((data)=>{
        safe = data.safe;
        unsafe = data.unsafe;
      })
      

      chrome.runtime.onMessage.addListener((obj,sender,sendResponse)=>{
          if(obj.type === "UPDATE"){
            currentDomain = getDomain(obj.tabUrl)
            if(inDomainList(currentDomain,safe)){
                sendResponse("SAFE")
                return;
            }else if(inDomainList(currentDomain,unsafe)){
               sendResponse("UNSAFE")
                return;
            }
            sendResponse("UNKNOWN")
           

          }
      })
})();



 


function getDomainsList (){
    return fetch(chrome.runtime.getURL('./list.json'))
    .then(response => response.json())
}

function getDomain(url) {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  }

  
function inDomainList(domain,list){
    const domainParts = domain.split('.');
    let subdomain = '';
    if(domainParts.length === 3){
        subdomain = domainParts[0]
        domain = domainParts[1] + '.' + domainParts[2]
    }
    for(site of list){
        if(site.url == domain ){
            if(!subdomain)return true;
            if(site.subdomains.includes(subdomain))return true;
        }
    }
    return false;
}