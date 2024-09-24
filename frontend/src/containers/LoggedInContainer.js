import { Icon } from "@iconify/react";
import { Howl, Howler } from 'howler';
import { useState, useLayoutEffect, useRef, useEffect,Children, useContext } from 'react';
import photo from "../files/logo5.png";
import IconText from "../components/IconText";
import TextWithHover from "../components/TextWithHover";

import songContext from "../contexts/songContext";

import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";


const LoggedInContainer = ({ children, curActiveScreen }) => {
    

    const [createPlaylistModalOpen, setCreatePlaylistModalOpen] =
        useState(false);
    const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
    const { playlist, currentSongIndex, setCurrentSongIndex } = useContext(songContext);
    

    const { currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused } = useContext(songContext);
    const firstUpdate = useRef(true);

    useLayoutEffect(() => {

        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (!currentSong) {
            return;
        }
        changeSong(currentSong.track);

    }, [currentSong && currentSong.track]);

    const addSongToPlaylist = async (playlistId) => {
        const songId = currentSong._id;

        const payload = { playlistId, songId };
        const response = await makeAuthenticatedPOSTRequest(
            "/playlist/add/song",
            payload
        );
        if (response._id) {
            setAddToPlaylistModalOpen(false);
        }
    };

    const playSound = () => {
        if (!soundPlayed) {
            return;
        }
        soundPlayed.play();
    };

    const changeSong = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true,
        });
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };

    const pauseSound = () => {
        soundPlayed.pause();
    };

    const togglePlayPause = () => {
        if (isPaused) {
            playSound();
            setIsPaused(false);
        } else {
            pauseSound();
            setIsPaused(true);
        }
    };
    useEffect(() => {
        setIsPaused(false); // Start playing automatically when a song is set
    }, [currentSongIndex]);

    

   
    return (
        <div className="relative h-screen  ">
            {createPlaylistModalOpen && (
                <CreatePlaylistModal
                    closeModal={() => {
                        setCreatePlaylistModalOpen(false);
                    }}
                />
            )}
            {addToPlaylistModalOpen && (
                <AddToPlaylistModal
                    closeModal={() => {
                        setAddToPlaylistModalOpen(false);
                    }}
                    addSongToPlaylist={addSongToPlaylist}
                />
            )}
            <div className="h-full w-full flex">
                {/* This first div will be the left panel */}
                <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-40">
                    <div>
                        {/* This div is for logo */}
                        <div className="logoDiv p-6">
                            <img src={photo} width="125" />
                        </div>
                        <div className="py-5">
                            <IconText
                                iconName={"material-symbols:home"}
                                displayText={"Home"}
                                targetLink={"/home"}
                                active={curActiveScreen === "home"}
                            />
                            <IconText
                                iconName={"material-symbols:search-rounded"}
                                displayText={"Search"}
                                targetLink="/search"
                                active={curActiveScreen === "search"}
                            />
                            <IconText
                                iconName={"icomoon-free:books"}
                                displayText={"Library"}
                                active={curActiveScreen === "library"}
                                targetLink={"/library"}
                            />
                            <IconText
                                iconName={"majesticons:music"}
                                displayText={"My Songs"}
                                targetLink={"/myMusic"}
                                active={curActiveScreen === "myMusic"}
                            />
                        </div>
                        <div className="pt-5">
                            <IconText
                                iconName={"material-symbols:add-box"}
                                displayText={"Create Playlist"}
                                onClick={(notify) => {
                                    setCreatePlaylistModalOpen(true);
                                }}
                            />
                            <IconText
                                iconName={"mdi:cards-heart"}
                                displayText={"Liked Songs"}
                                targetLink={"/like"}
                                active={curActiveScreen === "like"}
                            />
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                            <Icon icon="mingcute:earth-line" />
                            <div className="ml-2 text-sm font-semibold">
                                English
                            </div>
                        </div>
                    </div>
                </div>
                {/* This second div will be the right part(main content) */}

                <div className="h-full w-4/5 bg-app-black overflow-auto pb-20">
                    <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end ">
                        <div className="w-1/2 flex h-full">
                            <div className="w-3/5 flex justify-around items-center">
                                <TextWithHover displayText={"Premium"} />
                                <TextWithHover displayText={"Support"} />
                                <TextWithHover displayText={"Download"} />
                                <div className="h-1/2 border-r border-white"></div>
                            </div>
                            <div className="w-2/5 flex justify-around h-full items-center">
                                <IconText displayText={"Upload Song"} targetLink={"/uploadSong"} />
                                <div className="bg-black h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                                <IconText displayText={"logout"} targetLink={"/logout"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content p-8 pt-0 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
            {currentSong && (
                <div className="absolute bottom-0 left-0 w-full h-16 bg-app-black text-white flex items-center px-3  ">
                    <div className="w-1/4 flex items-center">
                        <img src={currentSong.thumbnail} className="w-14 h-14 rounded" />

                        <div className="pl-5">
                            <div className="text-sm hover:underline cursor-pointer">{currentSong.name}</div>
                            <div className="text-xs text-gray-400 hover:underline cursor-pointer">{currentSong.artist.firstName + " " + currentSong.artist.lastName}</div>
                        </div>
                    </div>
                    <div className="w-1/2 flex items-center justify-center">
                        <div className="flex w-1/3 justify-between items-center">
                            <Icon icon="ph:shuffle-fill" fontSize={15} className="cursor-pointer text-gray-400 hover:text-white" />
                            <Icon icon="mage:previous-fill" fontSize={15} className="cursor-pointer text-gray-400 hover:text-white" />
                            <Icon icon={isPaused ? "gridicons:play" : "gridicons:pause"} fontSize={35} className="cursor-pointer text-gray-400 hover:text-white"
                                onClick={togglePlayPause}
                            />
                            <Icon icon="mage:next-fill" fontSize={15} className="cursor-pointer text-gray-400 hover:text-white" />
                            <Icon icon="bx:repeat" fontSize={15} className="cursor-pointer text-gray-400 hover:text-white" />
                        </div>
                    </div>
                    <div className="w-1/4 flex items-end justify-end pr-4 space-x-6">
                        <Icon
                            icon="ic:round-playlist-add"
                            fontSize={30}
                            className="cursor-pointer text-gray-500 hover:text-white"
                            onClick={() => {
                                setAddToPlaylistModalOpen(true);
                            }}
                        />
                        <Icon
                            icon="ph:heart-bold"
                            fontSize={25}
                            className="cursor-pointer text-gray-500 hover:text-white"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};





export default LoggedInContainer;