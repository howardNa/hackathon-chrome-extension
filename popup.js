document.addEventListener('DOMContentLoaded', () => {
  const checksObj = document.getElementsByClassName('checkbox');
  const keys = Object.keys(checksObj);

  // TODO #2: update popup.js to reflect on stored/cached preferences when loading

  function handleChange() {
    // BUSINESS LOGIC:
    // prevent default?
    const message = [];
    keys.forEach((key) => {
      if (checksObj[key].checked) {
        message.push(checksObj[key].id);
      }
    });
    // send our message to background.js
    chrome.runtime.sendMessage(message);
  }

  keys.forEach((key) => {
    checksObj[key].addEventListener('change', handleChange);
  });
});
