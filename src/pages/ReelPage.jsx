
import {useEffect, useState} from 'react';
import VideoPlayer from "../components/VideoPlayer.jsx";
import {collection, doc, onSnapshot, updateDoc} from "firebase/firestore";
import {db} from "../config/firebaseConfig.js"

const ReelPage = () => {
    const [reels,setReels]=useState([]);

    useEffect(() => {
        const reelsCollection = collection(db, "reels");

        const unsubscribe = onSnapshot(reelsCollection, (snapshot) => {
            setReels(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    },[])

    const handleLike = async (reelId, currentLikes, isLiked) => {
        const reelDoc = doc(db, "reels", reelId);
        try {

            const newIsLiked = !isLiked;
            const newLikes = newIsLiked ? currentLikes + 1 : currentLikes - 1;

            await updateDoc(reelDoc, {
                likes: newLikes,
                isLiked: newIsLiked,
            });


        } catch (error) {
            console.error("Error updating likes and isLiked status: ", error);
        }
    };

    return (
        <div className="grid h-screen place-items-center bg-black">
            <div className="relative h-[70vh] bg-white rounded-2xl overflow-scroll max-w-96 max-h-screen snap-y snap-mandatory video">
                {reels.map((reel) => (
                    <VideoPlayer
                        key={reel.id}
                        id={reel.id}
                        isLiked={reel.isLiked}
                        channel={reel.channel}
                        avatarSrc={reel.avatarSrc}
                        song={reel.song}
                        likes={reel.likes}
                        comments={reel.comments}
                        url={reel.url}
                        targetLink={reel.targetLink}
                        targetProduct={reel.targetProduct}
                        handleLike={handleLike}
                    />
                ))}
            </div>
        </div>
    );
};

export default ReelPage;