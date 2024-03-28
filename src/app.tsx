import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css'
import Nav from './components/Nav'
import MediaList from './components/MediaList'
import Player from './components/Player'
import Root from "./routes/root";
import {
        createBrowserRouter,
        RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
        {
                path: "/main_window",
                element: <Root />,
                children: [{
                        path: 'list',
                        element: <MediaList />
                },
                {
                        path: 'player',
                        element: <Player />
                }
                ]
        },
]);

import GlobalContextComp from './context/GlobalContextComp';

const root = createRoot(document.getElementById('root'));

root.render(<>
        <GlobalContextComp>
                <React.StrictMode>
                        <Nav />
                        <RouterProvider router={router} />
                </React.StrictMode>
        </GlobalContextComp>
</>);