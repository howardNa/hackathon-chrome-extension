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
  chrome.storage.local.set({ options: message }, () => {
    console.log('Saved options');
  });
});

const search = (highlighted, url) => {
  const search = highlighted.selectionText;
  chrome.tabs.create({
    url: `${url}${search}`,
  });
};

chrome.contextMenus.onClicked.addListener((target) => {
  const google = 'https://www.google.com/search?q=';
  const mdn = 'https://developer.mozilla.org/en-US/search?q=';
  const stackOverflow = 'https://stackoverflow.com/search?q=';
  const wiki = 'https://en.wikipedia.org/w/index.php?search=';
  const amazon = 'https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=';
  const urbanDictionary = 'https://www.urbandictionary.com/define.php?term=';
  const youTube = 'https://www.youtube.com/results?search_query=';

  switch (target.menuItemId) {
    case 'searchGoogle':
      search(target, google);
      break;

    case 'searchMDN':
      search(target, mdn);
      break;

    case 'searchOverflow':
      search(target, stackOverflow);
      break;

    case 'searchWiki':
      search(target, wiki);
      break;

    case 'searchAmazon':
      search(target, amazon);
      break;

    case 'searchUrbanDictionary':
      search(target, urbanDictionary);
      break;

    case 'searchYouTube':
      search(target, youTube);
      break;

    default:
      break;
  }
});
