import { get } from 'https'


function callExternalApi (url) {
    return new Promise ((resolve, reject) => {
      
      const req = get(url, (res) => {
        let body = ""
  
        res.on("data", (chunk) => {
          body += chunk
        })
  
        res.on("end", () => {
          try {
            var json = JSON.parse(body)  
            } catch (error) {
              reject(error)
            }
            resolve(json)
          })
      })

      req.on("error", (err) => {
        throw new Error(`Error: ${err.message}`)
      })

      req.end()
    })
  }


export default callExternalApi 