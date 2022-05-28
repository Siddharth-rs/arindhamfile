import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import { ArrowCircleDownIcon } from "@heroicons/react/outline";
import { MenuAlt2Icon } from "@heroicons/react/outline";
import { menuState } from "../atoms/menuAtom";

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const playlistId = useRecoilValue(playlistIdState);
  const [menu, setMenu] = useRecoilState(menuState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => console.log("Something went wrong!...", err));
    }
  }, [spotifyApi, playlistId]);

  console.log(playlist);

  return (
    <div
      className={`h-screen overflow-y-scroll scrollbar-hide flex-grow ${
        menu ? "hidden" : ""
      }`}
    >
      <header className="absolute top-5 right-4 left-4 flex justify-between">
        <div>
          <MenuAlt2Icon
            className="h-10 w-10 sm:hidden"
            onClick={() => setMenu(!menu)}
          />
        </div>
        <div
          className="text-white text-xs flex items-center text-center bg-black space-x-2 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 shadow-lg"
          onClick={() => signOut()}
        >
          <img
            className="rounded-full h-10 w-10"
            src={session?.user.image}
          ></img>
          <div className="">
            <p className="hidden sm:inline pr-3">{session?.user.name}</p>
            <p className="pr-3 text-gray-400">Logout</p>
          </div>
        </div>
      </header>

      <div>
        <section className="flex  bg-gradient-to-b to-black from-green-500 h-60 items-end text-white">
          <div className="flex items-end space-x-3 p-5">
            <img
              className=" sm:h-32 sm:w-32 w-20 h-20"
              src={playlist?.images?.[0]?.url}
            ></img>
            <div className="text-3xl sm:text-5xl font-semibold text-white p-2  max-w-screen-sm truncate">
              {playlist?.name}
            </div>
          </div>
        </section>

        <section className="sm:p-4 pl-2">
          {playlist?.tracks.items.map((track, id) => (
            <div
              key={track.track.id}
              className="text-gray-400 pl-5 pb-3 pt-3 pr-5 grid grid-cols-2 hover:bg-gray-900 hover:bg-opacity-50 rounded-lg"
            >
              <div className="flex">
                <div className="grid grid-cols-2">
                  <p>{id + 1}</p>
                  <img
                    className="h-10 w-10 rounded-md hidden md:inline"
                    src={track.track.album.images[0].url}
                  />
                </div>
                <div className="pl-6">
                  <p className="text-white w-44 max-w-screen-lg truncate">{track.track.name}</p>
                  <p className="text-xs">{track.track.artists[0].name}</p>
                </div>
              </div>
              <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="pl-2 pr-2 hidden md:inline">
                  {track.track.album.name}
                </p>
                <ArrowCircleDownIcon className="h-6 w-6 cursor-pointer hover:text-white" />
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Center;
