const got = require('got')

const apiKey = 'f97710e53bb940988a73c69e45d1ff42'
const searchUrl = 'https://api.cognitive.microsoft.com/bing/v5.0/search'
const localIP = '67.169.49.159'
const limit = 10

const search = (term) => {
  console.log(`TRACE: Searching for ${term}`)
  const bingOptions = {
    headers: {
      'Ocp-Apim-Subscription-Key': apiKey,
      'X-Search-ClientIp': localIP,
    }
  }
  const query = `q=${term}&mkt=en-us&count=${limit}`
  return got(`${searchUrl}?${query}`, bingOptions)
  .then(decodeResponse)
  .catch((err) => console.log('ERROR:', err))
}

const snippets = (searchResponse) => {
  searchResponse.webPages.value.forEach(showSnippet)
}

const showSnippet = (page) => {
  console.log(`Page: ${page.url}\n${page.snippet}\n`)
}

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


search('javascript conference')
.then(snippets)
