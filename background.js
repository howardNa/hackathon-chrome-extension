/* eslint-disable func-names */
const contexts = [
  {
    title: 'Search Google',
    contexts: ['selection'],
    id: 'searchGoogle',
  },
  {
    title: 'Search Wikipedia',
    contexts: ['selection'],
    id: 'searchWiki',
  },
  {
    title: 'Search MDN',
    contexts: ['selection'],
    id: 'searchMDN',
  },
  {
    title: 'Search Stack Overflow',
    contexts: ['selection'],
    id: 'searchOverflow',
  },
  {
    title: 'Search Amazon',
    contexts: ['selection'],
    id: 'searchAmazon',
  },
  {
    title: 'Search Urban Dictionary',
    contexts: ['selection'],
    id: 'searchUrbanDictionary',
  },
  {
    title: 'Search Youtube',
    contexts: ['selection'],
    id: 'searchYouTube',
  },
];


chrome.runtime.onInstalled.addListener(() => {
  // our code?
// Search options: MDN, Wiki,
  contexts.forEach((context) => {
    chrome.contextMenus.create(context);
  });
});

chrome.runtime.onMessage.addListener((message) => {
  console.log(message);
  // clearning the menu options
  chrome.contextMenus.removeAll();
  // add based on ids
  contexts.forEach((context) => {
    if (message.includes(context.id)) {
      chrome.contextMenus.create({
        title: context.title,
        contexts: ['selection'],
        id: context.id,
      });
    }
  });
  // TODO #1: save preferences to storage/cache?
});

const searchGoogle = function (highlighted) {
  const search = highlighted.selectionText;
  chrome.tabs.create({
    url: `https://www.google.com/search?q=${search}`,
  });
};

const searchMDN = function (highlighted) {
  const search = highlighted.selectionText;
  chrome.tabs.create({ url: `https://developer.mozilla.org/en-US/search?q=${search}` });
};

const searchOverflow = function (highlighted) {
  const search = highlighted.selectionText;
  chrome.tabs.create({ url: `https://stackoverflow.com/search?q=${search}` });
};

const searchWiki = function (highlighted) {
  const search = highlighted.selectionText;
  chrome.tabs.create({
    url: `https://en.wikipedia.org/w/index.php?search=${search}`,
  });
};

const searchAmazon = function (highlighted) {
  const search = highlighted.selectionText;
  chrome.tabs.create({
    url: `https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=${search}`,
  });
};

const searchUD = function (highlighted) {
  const search = highlighted.selectionText;
  chrome.tabs.create({
    url: `https://www.urbandictionary.com/define.php?term=${search}`,
  });
};

const searchYouTube = function (highlighted) {
  const search = highlighted.selectionText;
  chrome.tabs.create({
    url: `https://www.youtube.com/results?search_query=${search}`,
  });
};


chrome.contextMenus.onClicked.addListener((target) => {
  switch (target.menuItemId) {
    case 'searchGoogle':
      searchGoogle(target);
      break;

    case 'searchMDN':
      searchMDN(target);
      break;

    case 'searchOverflow':
      searchOverflow(target);
      break;

    case 'searchWiki':
      searchWiki(target);
      break;

    case 'searchAmazon':
      searchAmazon(target);
      break;

    case 'searchUrbanDictionary':
      searchUD(target);
      break;

    case 'searchYouTube':
      searchYouTube(target);
      break;

    default:
      break;
  }
});
