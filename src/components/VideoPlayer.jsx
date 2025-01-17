
import {useEffect, useRef, useState} from 'react';
import PlayerHeader from "./PlayerHeader.jsx";
import PlayerFooter from "./PlayerFooter.jsx";
import {Volume2, VolumeOff} from "lucide-react";


const VideoPlayer = ({avatarSrc,targetLink,channel,comments,url,likes,song,targetProduct,id,handleLike,isLiked}) => {
    const videoRef = useRef(null);
    const [isVideoPlaying,setIsVideoPlaying] =useState(true);
    const [isMuted, setIsMuted] = useState(true);

    const onVideoPress=()=>{
        videoRef.current.play();
        if(isVideoPlaying){
            videoRef.current.pause();
            setIsVideoPlaying(false);
        }
        else {
            videoRef.current.play();
            setIsVideoPlaying(true);
        }
    }


    useEffect(() => {
        const videoElement = videoRef.current;

        const observerOptions = {
            root: null,
            threshold: 0.75,
        };

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoElement.currentTime = 0;
                    videoElement.play();
                    setIsVideoPlaying(true);
                } else {

                    videoElement.pause();
                    videoElement.currentTime = 0;
                    setIsVideoPlaying(false);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        if (videoElement) observer.observe(videoElement);

        return () => {
            if (videoElement) observer.unobserve(videoElement);
        };
    }, []);

    const onMuteUnmutePress = () => {
        const videoElement = videoRef.current;
        if (isMuted) {
            console.log("muted")
            videoElement.muted = false;
            setIsMuted(false);
        } else {
            console.log("unmuted")
            videoElement.muted = true;
            setIsMuted(true);
        }
    };
    return (
        <>
            <div className="w-full h-full snap-start relative">
                <PlayerHeader/>
                <video
                    onClick={onVideoPress}
                    ref={videoRef}
                    className="h-full w-full object-fill"
                    src={url}
                    muted={isMuted}
                    loop
                    autoPlay={true}
                />
                <div className="absolute bottom-4 left-5 z-10 flex space-x-4">
                    {isMuted ? (
                        <VolumeOff size="20" color="white" onClick={onMuteUnmutePress}/>
                    ) : (
                        <Volume2 size="20" color="white" onClick={onMuteUnmutePress}/>
                    )}
                </div>
                <PlayerFooter avatarSrc={avatarSrc} isLiked={isLiked} targetLink={targetLink}
                              onLike={() => handleLike(id, likes, isLiked)} targetProduct={targetProduct}
                              channel={channel}
                              likes={likes} song={song} comments={comments}/>
            </div>
        </>
    );
};

export default VideoPlayer;

