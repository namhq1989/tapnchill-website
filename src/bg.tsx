import '@/assets/stylesheet/bg.css'
import useMoodStore from '@/mood/store.ts'

const Background = () => {
  const currentMood = useMoodStore((state) => state.currentMood)

  return (
    <div className='video-container'>
      <video
        key={currentMood.id}
        autoPlay
        loop
        muted
        playsInline
        className='video-background'
      >
        <source
          src={`/wallpapers/${currentMood.background}`}
          type='video/mp4'
        />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default Background
