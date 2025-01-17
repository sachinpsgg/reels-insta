

import {BadgeCheck, Ellipsis, HeartIcon, MessageCircle, Music, Send} from "lucide-react";

// eslint-disable-next-line react/prop-types
const PlayerFooter = ({avatarSrc,channel,song,comments,likes,targetLink,targetProduct,onLike,isLiked}) => {
    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: `Check out this video from ${channel}`,
                    text: `Watch this amazing video! 🎥`,
                    url: targetLink,
                })
                .then(() => console.log("Content shared successfully!"))
                .catch((error) => console.error("Error sharing content:", error));
        } else {
            alert("Your browser does not support the Web Share API. Try copying the link manually.");
        }
    };
    return (
        <>
            <div className="relative ml-5 bottom-20">
                <div className="absolute bottom-0 text-white flex justify-center items-center mb-5 gap-2">
                    <img className="rounded-full  bg-blue-600 border border-yellow-500" src={avatarSrc} alt="avatar" width={25} height={25} />
                    <h3 className="flex flex-row items-center justify-center gap-1 m-0">
                        {channel} <BadgeCheck size={10} color="white" className="mt-1"/>
                    </h3>
                    <button className="bg-transparent text-[12px] border-2 border-white rounded w-12">Follow</button>
                    <button className="glow-on-hover" type="button"
                            onClick={() => (window.location.href = targetLink)}>{targetProduct}</button>
                </div>

                <div className="h-fit ml-7 mb-2 w-8/12">
                    <Music size={15}  color="black" className="absolute rounded-full bg left-1 mt-2"/>
                    <marquee className="text-white font-medium"> {song}</marquee>
                </div>
                <div className="absolute bottom-0 right-0 p-4">
                    <div className="flex flex-col gap-4">
                        <div><HeartIcon cursor="pointer" size={24} color="white" fill={`${isLiked?'red':'none'}`}  onClick={onLike}/><span className="text-white text-sm">{likes}</span>
                        </div>
                        <div><MessageCircle cursor="pointer" size={24} color="white"/><span
                            className="text-white text-sm">{comments}</span>
                        </div>
                        <Send size={24} onClick={handleShare} cursor="pointer" color="white"/>
                        <Ellipsis size={24} cursor="pointer" color="white"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlayerFooter;
