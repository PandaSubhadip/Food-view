import React, { useRef, useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import { Link , useNavigate} from 'react-router-dom'
import FoodUploder from './FoodUploder'

// const samplePosts = [
//   {
//     id: 1,
//     src: 'https://ik.imagekit.io/iwztbvfhc/6202680-uhd_2160_3840_25fps_xR-WTjKNB.mp4',
//     description: 'Delicious food from our partner store — try the spicy bowl today!'
//   },
//   {
//     id: 2,
//     src: 'https://ik.imagekit.io/iwztbvfhc/6202680-uhd_2160_3840_25fps_xR-WTjKNB.mp4',
//     description: 'Fresh ingredients and great taste. Limited time offer at the store.'
//   },
//   {
//     id: 3,
//     src: 'https://ik.imagekit.io/iwztbvfhc/6202680-uhd_2160_3840_25fps_xR-WTjKNB.mp4',
//     description: 'Order now and get free delivery for new users.'
//   }
// ]
 
const Home = () => {
  const containerRef = useRef(null)

  // Autoplay the visible video when scrolled into view
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const items = container.querySelectorAll('.reel-item')
      items.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const video = item.querySelector('video')
        if (!video) return
        // When item is mostly visible, play; otherwise pause
        if (rect.top >= -50 && rect.top <= 50) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      })
    }

    handleScroll()
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])
     const[video, setVideo] = useState([]);

     useEffect(() => {
    axios.get('http://localhost:3000/api/v1/food/videos',{       withCredentials: true }    )
      .then((response) => {
        setVideo(response.data.foodVideos);
      } )
}, []);

  const navigate = useNavigate();
  return (
    <div className="reels-container" ref={containerRef}>
      {video.map((post) => (
        <div className="reel-item" key={post._id}>
          <video
            className="reel-video"
            src={post.video}
            muted
            loop
            playsInline
            preload="metadata"
          />

          <div className="reel-overlay">
            <p className="reel-description">{post.description}</p>
            <Link className="visit-store"  to ={"/Utils/"  + post.foodPartner} >Visit Store</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home