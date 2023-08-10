import React, { useState } from "react"
// import { interpolateInferno } from "https://cdn.skypack.dev/d3-scale-chromatic@3"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone,faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
const App=()=>{
  const [color,setColor]=useState("grey");
  const [isMuted, setIsMuted] = useState(true);
        // Apply the calculated color to the component's style
  const componentStyle = {
    // backgroundColor: color,
    fontSize: '50px', // Set the icon's font size
    color:color,
    
  };
   // Apply the calculated color to the larger button's style
   const buttonStyle = {
    backgroundColor: "blue",
    padding: '15px 30px', // Larger padding for a bigger button
    color: 'white',
    border: 'none',
    borderRadius: '10px', // Rounded corners for a more prominent look
    fontSize: '20px', // Larger font size
    cursor: 'pointer',
    display: 'block',


  };

  // Center the button and div using flexbox
  const containerStyle = {
    display: 'flex',
    // flexWrap: 'wrap', // Wrap content into new lines
    flexDirection: 'column', // Arrange items in a column
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Make the container fill the screen vertically
    
  };

  const itemStyle = {
    margin: '10px 0', // Add margin to create space between items
  };
  const indicatorStyle = {
    color: 'red',
  };

    async function initVAD(){
//declaring VAD
try {
    const myvad = await window.vad.MicVAD.new({
      positiveSpeechThreshold: 0.8,
      minSpeechFrames: 5,
      preSpeechPadFrames: 10,
      onFrameProcessed: (probs) => {
        
       if (probs.isSpeech > 0.5){
        setColor("green");
        console.log("user is speaking");
       }
      },
      onSpeechEnd: (arr) => {
        // const wavBuffer = window.vad.utils.encodeWAV(arr)
        // const base64 = window.vad.utils.arrayBufferToBase64(wavBuffer)
        // const url = `data:audio/wav;base64,${base64}`
        // const el = addAudio(url)
        // const speechList = document.getElementById("playlist")
        // speechList.prepend(el)
        console.log("user stopped speaking");
        setColor("grey");

      },
    })
    // window.myvad = myvad

    clearInterval(loading)
    window.toggleVAD = () => {
    
      console.log("ran toggle vad")
      // if (myvad.listening === false) {
        myvad.start()
        document.getElementById("toggle_vad_button").textContent =
          "STOP VAD"
        document.getElementById("indicator").textContent = "VAD is running"

      // } else {
      //   myvad.pause()
      //   document.getElementById("toggle_vad_button").textContent =
      //     "START VAD"
      //   document.getElementById(
      //     "indicator"
      //   ).innerHTML = `VAD is <span style="color:red">stopped</span>`
      // }
    }
    // window.toggleVAD()
    document.getElementById("toggle_vad_button").disabled = false
    document.getElementById("toggle_vad_button").addEventListener("click",window.toggleVAD); 
    document.getElementById("indicator").textContent = "VAD is ready. Click on start VAD"
  } catch (e) {
    console.error("Failed:", e)
    clearInterval(loading)
    document.getElementById(
      "indicator"
    ).innerHTML = `<span style="color:red">VAD failed to load</span>`
  }
  
}
initVAD();
// function addAudio(audioUrl) {
//     const entry = document.createElement("li")
//     const audio = document.createElement("audio")
//     audio.controls = true
//     audio.src = audioUrl
//     entry.classList.add("newItem")
//     entry.appendChild(audio)
//     return entry
//   }

  const loading = setInterval(() => {
    const indicator = document.getElementById("indicator")
    const [message, ...dots] = indicator.innerHTML.split(".")
    indicator.innerHTML = message + ".".repeat((dots.length + 1) % 7)
  }, 200)
 
return(<>

    
    <div style={containerStyle}>
      <div id="indicator" style={itemStyle}>
        VAD is <span style={indicatorStyle}>LOADING</span>
      </div>
      <FontAwesomeIcon icon={faMicrophone} style={{ ...componentStyle, ...itemStyle }} />

      <button id="toggle_vad_button" style={{ ...buttonStyle, ...itemStyle }} disabled>
        START VAD
      </button>
      <ol id="playlist" reversed style={itemStyle}></ol>
    </div>
             
</>)
}

export default App;