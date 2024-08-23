import '@/assets/stylesheet/bg.css'
import useMoodStore from '@/mood/store.ts'

const Background = () => {
  const currentTheme = useMoodStore((state) => state.currentTheme)

  return (
    <div className='video-container'>
      <video
        key={currentTheme.id}
        autoPlay
        loop
        muted
        playsInline
        className='video-background'
      >
        <source
          src={`/wallpapers/${currentTheme.background}`}
          type='video/mp4'
        />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default Background
