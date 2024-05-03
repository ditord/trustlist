chrome.runtime.onInstalled.addListener(function () {
  // Fetch the list of safe domains from the text file
  fetch(chrome.runtime.getURL('safe.txt'))
    .then(response => response.text())
    .then(data => {
      // Extract safe domains from the text file
      const safeDomains = data.split('\n').map(safedomain => safedomain.trim());

      chrome.webNavigation.onCompleted.addListener(function (details) {
        // Default value
        let value = 0;

       


// Fetch the list of safe domains from the text file
fetch(chrome.runtime.getURL('unsafe.txt'))
.then(response => response.text())
.then(data => {
  // Extract safe domains from the text file
  const unsafeDomains = data.split('\n').map(unsafedomain => unsafedomain.trim());

  chrome.webNavigation.onCompleted.addListener(function (details) {
    // Default value
    let value = 0;


        // Assign values based on conditions (you can add more conditions as needed)

 // Check if the current URL matches any safe domain
 for (const domain of safeDomains) {
  if (details.url.includes(safedomain)) {
    value = 1;
    break;
  }
}

 // Check if the current URL matches any unsafe domain
 for (const domain of unsafeDomains) {
  if (details.url.includes(unsafedomain)) {
    value = 2;
    break;
  }
}


        } else if (details.url.includes("anotherexample.com")) {
          value = 3;
        }

        // Save the assigned value in storage
        chrome.storage.local.set({ [details.url]: value }, function () {
          console.log("Value assigned for URL:", details.url);
        });
      });
    })
    .catch(error => console.error('Error fetching safe domains:', error));
});
