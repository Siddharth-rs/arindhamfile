import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuState } from "../atoms/menuAtom";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import {XIcon} from "@heroicons/react/outline"

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [menu, setMenu] = useRecoilState(menuState);
  console.log(menu);

  console.log(playlistId);

  useEffect(() => {
    spotifyApi.getUserPlaylists().then((data) => {
      setPlaylists(data.body.items);
    });
  }, [session, spotifyApi]);

  // console.log(playlists);
  return (
    <div
      className={`h-screen overflow-y-scroll overflow-x-hidden scrollbar-hide border-gray-600 border-r-2 p-4 ${
        menu ? "w-full text-center" : "hidden"
      } sm:inline w-50 md:text-sm`}
    >
    <div className={`${menu ? '' : 'hidden'}`} onClick={() => setMenu(!menu)}>
    <XIcon className="h-10 w-10 text-white" />
    </div>
      <div className="text-white text-2xl sm:text-2xl md:text-3xl font-semibold pb-4">
        <p>Playlists</p>
      </div>
      <div className="text-gray-400 sm:text-sm pr-4">
        {playlists.map((playlist) => (
          <p
            className="cursor-pointer hover:text-white p-1.5 w-50"
            key={playlist.id}
            onClick={() => {
              setPlaylistId(playlist.id);
              menu ? setMenu(!menu) : null;
            }}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
