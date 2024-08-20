import '@/assets/stylesheet/bg.css'
import chillMP4 from '@/assets/wallpapers/coffee-shop.1920x1080.mp4'

const Background = () => {
  return (
    <div className='video-container'>
      <video autoPlay loop muted playsInline className='video-background'>
        <source src={chillMP4} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default Background
