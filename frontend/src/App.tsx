import { useState } from "react"
import { Tweet } from "./components/Tweet"
import { AppRoutes } from "./Routes"


function App() {
  // const [tweets, setTweets] = useState<string[]>([
  //   'Hello world 1',
  //   'Hello world 2',
  //   'Hello world 3'
  // ])

  // function createTweet () {
  //   setTweets([...tweets, 'Hello world 4'])
  // }

  return (
    <AppRoutes />
    // <div>
    //   {tweets.map(tweet => {
    //     return <Tweet text={tweet} />
    //   })}

    //   <button
    //     onClick={createTweet}
    //     style={{
    //       backgroundColor: '#8257e6',
    //       border: 0,
    //       padding: "6px 12px",
    //       color: '#FFF'
    //     }}
    //   >
    //     Adicionar tweet
    //   </button>
    // </div>
  )
}

export default App
