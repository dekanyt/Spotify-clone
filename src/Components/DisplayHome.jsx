import Navbar from "./Navbar"
import { albumsData, songsData } from "../assets/assets"
import AlbumbItem from "./AlbumbItem"
import SongItem from "./SongItem"
const DisplayHome = () => {
    return (
        <div>
            <Navbar />

            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
                <div className="flex overflow-auto">
                    {
                        albumsData.map((item, i) => (
                            <AlbumbItem key={i} name={item.name} desc={item.desc} id={item.id} image={item.image} />
                        ))
                    }
                </div>
            </div>

            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl ">Today's biggest hits</h1>
                <div className="flex overflow-auto gap-4">
                    {
                    songsData.map((item,i)=>(
                        <SongItem key={i} name={item.name} image={item.image} desc={item.desc} id={item.id}/>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default DisplayHome