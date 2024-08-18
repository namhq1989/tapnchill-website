# tap-n-chill

```javascript
const audioCtx = new window.AudioContext()

onClick={async () => {
    const effectSound = document.getElementById(
      'effect-sound',
    ) as HTMLAudioElement | null
    if (!effectSound) return
    
    const soundSrc = await import('@/assets/effects/raining.mp3')
    const response = await fetch(soundSrc.default)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
    
    const source = audioCtx.createBufferSource()
    source.buffer = audioBuffer
    source.loop = true // Enable seamless looping
    
    source.connect(audioCtx.destination)
    source.start(0)
}}
```
