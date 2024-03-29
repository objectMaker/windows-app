import { createRoot } from 'react-dom/client';
import { AliveScope, KeepAlive, useActivate } from 'react-activation';
import './index.css'
import Nav from './components/Nav'
import MediaList from './components/MediaList'
import Player from './components/Player'
import Root from "./routes/root";
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
                        element: <KeepAlive id="player"><Player /></KeepAlive>
                }
                ]
        },
]);

import GlobalContextComp from './context/GlobalContextComp';

const root = createRoot(document.getElementById('root'));

root.render(<>
        <GlobalContextComp>
                <AliveScope>
                        <Nav />
                        <RouterProvider router={router} />
                </AliveScope>
        </GlobalContextComp>
</>);