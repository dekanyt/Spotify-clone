import { createContext, useEffect, useRef, useState } from 'react';
import { songsData } from '../assets/assets';

const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, settrack] = useState(songsData[0]);
    const [playstatus, setplaystatus] = useState(false);
    const [time, settime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totaltime: {
            second: 0,
            minute: 0
        }
    });

    const play = () => {
        audioRef.current.play();
        setplaystatus(true);
    };
    const pause = () => {
        audioRef.current.pause();
        setplaystatus(false);
    };
    const playWithID = async (id) => {
        await settrack(songsData[id]);
        await audioRef.current.play();
        setplaystatus(true);
    }

    const previous = async ()=>{
           
        if(track.id>0){
            await settrack(songsData[track.id-1]);
            await audioRef.current.play();
            setplaystatus(true);
        }

    }
    const next = async ()=>{
           
        if(track.id<songsData.length -1 ){
            await settrack(songsData[track.id+1]);
            await audioRef.current.play();
            setplaystatus(true);
        }

    }

    const seekSong = async (e)=>{
     audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration);
     
    } 

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                settime(
                    {
                        currentTime: {
                            second: Math.floor(audioRef.current.currentTime % 60),
                            minute: Math.floor(audioRef.current.currentTime / 60)
                        },
                        totaltime: {
                            second: Math.floor(audioRef.current.duration % 60),
                            minute: Math.floor(audioRef.current.duration / 60)
                        }
                    }
                )
            }
        }, 1000);
    }, [audioRef])

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        settrack,
        playstatus,
        setplaystatus,
        time,
        settime,
        play,
        pause,
        playWithID,
        previous,
        next,
        seekSong
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );
};

export { PlayerContext, PlayerContextProvider };