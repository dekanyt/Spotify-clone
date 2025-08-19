import { Route, Routes, useLocation } from "react-router-dom"
import DisplayHome from "./DisplayHome"
import DisplayAulbm from "./DisplayAulbm"
import { useEffect, useRef } from "react"
import { albumsData } from "../assets/assets"


const Display = () => {

  const displayref = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes('/album');
  const albumId = isAlbum ? location.pathname.slice(-1) : "";
  const bgColor = albumsData[Number(albumId)].bgColor;


  useEffect(()=>{
   if(isAlbum){
    displayref.current.style.background = `linear-gradient(${bgColor}, #121212)`
   }  
   else{
     displayref.current.style.background = `#121212`;
   }
  })
  return (
    <div ref={displayref} className="w-[100%] m-2 px-6 pt-4 rouunded bg-[#1212121] text-white overflow-auto lg:w-[75%] lg:ml=0">

            <Routes>
                <Route path="/" element={<DisplayHome/>} />
                <Route path="/album/:id" element={<DisplayAulbm/>}/>
            </Routes>
        
        
    </div>
  )
}

export default Display
