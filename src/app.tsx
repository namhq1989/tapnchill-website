// import '@/bg.css'
// import Background from '@/bg.tsx'
import { Music, Palette, RadioTower, Sparkles, Timer } from 'lucide-react'
import MenuItem from '@/menu-item.tsx'
import MenuMaximize from '@/menu-maximize.tsx'

const audioCtx = new window.AudioContext()

const App = () => {
  return (
    <div id='app-bg'>
      {/*<Background />*/}
      <audio id='effect-sound' loop></audio>
      <div className='sm:p-10 lg:p-0 flex justify-center items-start min-h-screen'>
        <div
          className='flex items-center justify-center isolate aspect-video rounded-xl bg-white/80 shadow-lg ring-1 ring-black/5 p-[20px]
                  sm:relative sm:left-auto sm:right-auto sm:top-auto
                  lg:absolute lg:right-[20px] lg:top-[20px]'
        >
          <div className='grid grid-cols-3 gap-4 w-full max-w-4xl'>
            <MenuItem
              id={'mood'}
              text={'Mood'}
              icon={Music}
              onClick={() => {
                alert('Clicked on MOOD')
              }}
            />
            <MenuItem
              id={'theme'}
              text={'Theme'}
              icon={Palette}
              onClick={() => {
                alert('Clicked on THEME')
              }}
            />
            <MenuItem
              id={'timer'}
              text={'Timer'}
              icon={Timer}
              onClick={() => {
                alert('Clicked on TIMER')
              }}
            />
            <MenuItem
              id={'harmonizer'}
              text={'Harmonizers'}
              icon={RadioTower}
              onClick={() => {
                alert('Clicked on HARMONIZERS')
              }}
            />
            <MenuItem
              id={'effect'}
              text={'Effect'}
              icon={Sparkles}
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
            />
            <MenuMaximize />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
