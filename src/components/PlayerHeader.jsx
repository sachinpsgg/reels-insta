
import {CameraIcon} from "lucide-react";

const PlayerHeader = () => {
    return (
        <div className="flex justify-between items-center absolute w-full text-white p-2">
            <h2 className="font-medium text-2xl ">Reels</h2>
            <CameraIcon size={20} color="white"/>
        </div>
    );
};

export default PlayerHeader;