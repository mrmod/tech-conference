const got = require('got')
const url = require('url')

const apiKey = 'f97710e53bb940988a73c69e45d1ff42'
const searchUrl = 'https://api.cognitive.microsoft.com/bing/v5.0/search'
const localIP = '67.169.49.159'
const limit = 10
const techConferences  = [
  // 'javascript', 'angular', 'react', 'reactjs', 'redux',
  // 'ai', 'artificial intelligence', 'bayes', 'neural network',
  'machine learning', 'chatbot', 'bot',

]

const search = (term, offset) => {
  if (offset === null || offset === undefined) {
    offset = 0
  }
  console.log(`TRACE: Searching for ${term}`)
  const bingOptions = {
    headers: {
      'Ocp-Apim-Subscription-Key': apiKey,
      'X-Search-ClientIp': localIP,
    }
  }
  const query = `q=${term}&mkt=en-us&count=${limit}&offset=${offset}`
  return got(`${searchUrl}?${query}`, bingOptions)
  .then(decodeResponse)
  .catch((err) => console.log('ERROR:', err))
}

const snippets = (searchResponse) => searchResponse.webPages.value.forEach(showSnippet)

const urlSet = (searchResponse) => searchResponse.webPages.value.map(selectHostname)

const selectHostname = (pageUrl) => url.parse(pageUrl).hostname

const showSnippet = (page) => {
  console.log(`Page: ${page.url}\n${page.snippet}\n`)
}

const showTechConferences = () => techConferences.map((t) => {
  console.log(`\n-- ${t} conference --\n`)
  search(`${t} conference`).then(snippets)
})

const fetchConferenceTopic = (topic) => search(`${topic} conference`)

// TODO: Give the UI a struct like
/*
 {
  topics: [
  {
    topic: topic,
    pages: [WebPage]
  }
  ]}
*/

// TODO: Find dates in Urls
// TODO: Create tech term list

/*
  https://dev.cognitive.microsoft.com/docs/services/56b43eeccf5ff8098cef3807/operations/56b4447dcf5ff8098cef380d
  Response: {
    _type
    instrumentation: {
      pingUrlBase, pageLoadPingUrl
    }
    webPages: {
      webSearchUrl, webSearchUrlPingSuffix, totalEstimatedMatches
      value: []
    }
  }

  WebPage: {
    id
    name
    url
    urlPingSuffix
    displayUrl
    snippet
    deepLinks: []
    about: [name:]
    dateLastCrawled: "YYYY-MM-DDTHH:mm:ss"
  }
*/
const decodeResponse = (response) => JSON.parse(response.body)

// search('javascript conference')
// .then(snippets)
showTechConferences()
