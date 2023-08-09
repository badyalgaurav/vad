import React, { useState } from "react"
import { interpolateInferno } from "https://cdn.skypack.dev/d3-scale-chromatic@3"
const App=()=>{
    async function test(){
//declaring VAD
try {
    const myvad = await window.vad.MicVAD.new({
      positiveSpeechThreshold: 0.8,
      minSpeechFrames: 5,
      preSpeechPadFrames: 10,
      onFrameProcessed: (probs) => {
        const indicatorColor = interpolateInferno(probs.isSpeech / 2)
        document.body.style.setProperty("--indicator-color", indicatorColor)
      },
      onSpeechEnd: (arr) => {
        const wavBuffer = window.vad.utils.encodeWAV(arr)
        const base64 = window.vad.utils.arrayBufferToBase64(wavBuffer)
        const url = `data:audio/wav;base64,${base64}`
        const el = addAudio(url)
        const speechList = document.getElementById("playlist")
        speechList.prepend(el)
      },
    })
    // window.myvad = myvad

    clearInterval(loading)
    window.toggleVAD = () => {
      console.log("ran toggle vad")
      if (myvad.listening === false) {
        myvad.start()
        document.getElementById("toggle_vad_button").textContent =
          "STOP VAD"
        document.getElementById("indicator").textContent = "VAD is running"
      } else {
        myvad.pause()
        document.getElementById("toggle_vad_button").textContent =
          "START VAD"
        document.getElementById(
          "indicator"
        ).innerHTML = `VAD is <span style="color:red">stopped</span>`
        const indicatorColor = interpolateInferno(0)
        document.body.style.setProperty("--indicator-color", indicatorColor)
      }
    }
    window.toggleVAD()
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
test();
function addAudio(audioUrl) {
    const entry = document.createElement("li")
    const audio = document.createElement("audio")
    audio.controls = true
    audio.src = audioUrl
    entry.classList.add("newItem")
    entry.appendChild(audio)
    return entry
  }

  const loading = setInterval(() => {
    const indicator = document.getElementById("indicator")
    const [message, ...dots] = indicator.innerHTML.split(".")
    indicator.innerHTML = message + ".".repeat((dots.length + 1) % 7)
  }, 200)

return(<><p>Hello world</p>
<div class="control-row">
          <div id="indicator">
            VAD is <span style={{color: "red"}}>LOADING</span>
          </div>
          <button id="toggle_vad_button"  disabled>
            START VAD
          </button>
        </div>
        <ol id="playlist" reversed></ol>
</>)
}

export default App;