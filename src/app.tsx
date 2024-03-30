import { createRoot } from 'react-dom/client';
import { AliveScope, KeepAlive } from 'react-activation';
import GlobalContextComp from './context/GlobalContextComp';
import Nav from './components/Nav'
import Subtitle from './components/Subtitle'
import MediaList from './components/MediaList'
import Player from './components/Player'
import Root from "./routes/root";
import './index.css'

import {
        createHashRouter,
        RouterProvider,
} from "react-router-dom";

const router = createHashRouter([
        {
                path: "/",
                element: <Root />,
                children: [{
                        path: 'list',
                        element: <KeepAlive id="list"><MediaList /></KeepAlive>
                },
                {
                        path: 'player',
                        element: <KeepAlive id="player">
                                             <Subtitle />
                                             <Player />
                                        </KeepAlive>
                }
                ]
        },
]);



const root = createRoot(document.getElementById('root'));

root.render(<>
        <GlobalContextComp>
                <AliveScope>
                        <Nav />
                        <RouterProvider router={router} />
                </AliveScope>
        </GlobalContextComp>
</>);