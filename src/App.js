import { useMicVAD, utils } from "@ricky0123/vad-react"

import React, { useState } from "react"

// ref https://github.com/ricky0123/vad/blob/master/site/src/js/demo.tsx

const App=()=> {
    const [demoStarted, setDemoStarted] = useState(false)

    return (
        <div className="pb-2">
            {!demoStarted && (
                <StartDemoButton startDemo={() => setDemoStarted(true)} />
            )}
            {demoStarted && <ActiveDemo />}
        </div>
    )
}

export default App;
function StartDemoButton({ startDemo }: { startDemo: () => void }) {
    return (
        <div className="flex justify-center">
            <button
                onClick={startDemo}

            >
                Start demo
            </button>
        </div>
    )
}

function ActiveDemo() {
    const [audioList, setAudioList] = useState([])
    const vad = useMicVAD({
        startOnLoad: true,
        onSpeechEnd: (audio) => {
            //const wavBuffer = utils.encodeWAV(audio)
            //const base64 = utils.arrayBufferToBase64(wavBuffer)
            //const url = `data:audio/wav;base64,${base64}`
            //setAudioList((old) => [url, ...old])
        },
    })

    if (vad.loading) {
        return <Loading />
    }

    if (vad.errored) {
        console.log(vad.errored)
        return <Errored />
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-48 flex items-center">
                <div className="w-24 flex justify-center items-center">
                    {vad.listening && vad.userSpeaking && <HighEnergyCube />}
                    {vad.listening && !vad.userSpeaking && <LowEnergyCube />}
                    {!vad.listening && <DeactivatedCube />}
                </div>
                <div className="w-24 flex justify-start items-center">
                    <div
                        className="underline underline-offset-2 text-rose-600 grow"
                        onClick={vad.toggle}
                    >
                        {vad.listening && "Pause"}
                        {!vad.listening && "Start"}
                    </div>
                </div>
            </div>
            <ol
                id="playlist"
                className="self-center pl-0 max-h-[400px] overflow-y-auto no-scrollbar list-none"
            >
                {audioList.map((audioURL) => {
                    return (
                        <li className="pl-0" key={audioItemKey(audioURL)}>
                            <audio src={audioURL} controls />
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

const audioItemKey = (audioURL: string) => audioURL.substring(-10)

function Loading() {
    return (
        <div className="flex justify-center">
            <div className="animate-pulse text-2xl text-rose-600">Loading</div>
        </div>
    )
}

function Errored() {
    return (
        <div className="flex justify-center">
            <div className="text-2xl text-rose-600">Something went wrong</div>
        </div>
    )
}

const DeactivatedCube = () => {
    return (
        <div className="bg-gradient-to-l from-[#2A2A2A] to-[#474747] h-10 w-10 rounded-[6px]" />
    )
}

const LowEnergyCube = () => {
    return (
       <><p>low energy</p></>
    )
}

const HighEnergyCube = () => {
    return (
        <><p>high energy</p></>

    )
}



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
