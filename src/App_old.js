// #### Reference :--> https://github.com/ricky0123/vad/blob/master/examples/react-bundler/src/index.jsx

// import { useMicVAD, utils } from "@ricky0123/vad-react"
import { MicVAD } from "@ricky0123/vad-web"

import React, { useState } from "react"

// ref https://github.com/ricky0123/vad/blob/master/site/src/js/demo.tsx

const App=()=> {
    const [demoStarted, setDemoStarted] = useState(false)

    const fetchDataAsync = async () => {
        try {
            const myvad = await MicVAD.new({
                onSpeechEnd: (audio) => {
                  // do something with `audio` (Float32Array of audio samples at sample rate 16000)...
                  console.log("test");
                },
              })
              myvad.start()
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
  // Call the async function immediately
  fetchDataAsync();
    return (
        <div className="pb-2">
           
        </div>
    )
}

export default App;



//#NEW
//import { useMicVAD, utils } from "@ricky0123/vad-react"
//import React, { useReducer, useState } from "react"


//import { MicVAD } from "@ricky0123/vad-web"

// function  App() {
//    const [audioList, setAudioList] = useState([])
//    const vad = useMicVAD({
//        onSpeechEnd: (audio) => {
//            const wavBuffer = utils.encodeWAV(audio)
//            const base64 = utils.arrayBufferToBase64(wavBuffer)
//            const url = `data:audio/wav;base64,${base64}`
//            setAudioList((old) => [url, ...old])
//        },
//    })

//    debugger;
//    //const myvad = await MicVAD.new({
//    //    onSpeechEnd: (audio) => {
//    //        // do something with `audio` (Float32Array of audio samples at sample rate 16000)...
//    //    },
//    //})
//    //myvad.start()
//    return (
//        <div>
//            <h1>Demo of @ricky0123/vad-react</h1>
//            {vad.userSpeaking && <UserSpeaking />}
//            {!vad.userSpeaking && <UserNotSpeaking />}
//            <ol id="playlist">
//                {audioList.map((audioURL) => {
//                    return (
//                        <li key={audioURL.substring(-10)}>
//                            <audio controls src={audioURL} />
//                        </li>
//                    )
//                })}
//            </ol>
//        </div>
//    )
//}
//export default App;
//function UserSpeaking() {
//    return <span style={{ color: "green" }}>user is speaking</span>
//}

//function UserNotSpeaking() {
//    return <span style={{ color: "red" }}>user is not speaking</span>
//}




//import React, { useReducer, useState, useEffect } from "react"

//import { useMicVAD, utils } from "@ricky0123/vad-react"




//const App=() =>{
//    const [audioList, setAudioList] = useState([])

 
//    const vad = useMicVAD({
//            onSpeechEnd: (audio) => {
//            },
//        })
      
  
  
//    debugger;

//    function UserSpeaking() {
//        return <span style={{ color: "green" }}>user is speaking</span>
//    }

//    function UserNotSpeaking() {
//        return <span style={{ color: "red" }}>user is not speaking</span>
//    }
//    return (
//        <div>
//            <h1>Demo of @ricky0123/vad-react</h1>
//            <button onClick={vad.toggle}>Toggle VAD</button>
//            {vad.listening && <div>VAD is running</div>}
//            {!vad.listening && <div>VAD is NOT running</div>}
//            {vad.userSpeaking && <UserSpeaking />}
//            {!vad.userSpeaking && <UserNotSpeaking />}
//            <ol id="playlist">
//                {audioList.map((audioURL) => {
//                    return (
//                        <li key={audioURL.substring(-10)}>
//                            <audio controls src={audioURL} />
//                        </li>
//                    )
//                })}
//            </ol>
//        </div>
//    )
//}

//export default App;
