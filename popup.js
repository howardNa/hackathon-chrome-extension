

document.addEventListener('DOMContentLoaded', () => {
  const popup = chrome.extension.getViews({ type: 'popup' })[0];
  const checksObj = popup.document.getElementsByClassName('checkbox');
  const keys = Object.keys(checksObj);

  // alert(`Got this many checkboxes: ${keys.length}`);


  chrome.storage.local.get('options', (stored) => {
    if (stored !== undefined) {
      // alert(`Got stored options: ${stored.options}`);
      keys.forEach((key) => {
        if (checksObj[key].hasAttribute('checked')) {
          checksObj[key].removeAttribute('checked');
        }
      });
      stored.options.forEach((id) => {
        popup.document.getElementById(id).setAttribute('checked', true);
      });
    }
  });

  function handleChange(e) {
    console.log('before', e.target);
    const checked = e.target.hasAttribute('checked');
    if (checked) {
      e.target.removeAttribute('checked');
    } else {
      e.target.setAttribute('checked', true);
    }
    // console.log('after', e.target);
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
