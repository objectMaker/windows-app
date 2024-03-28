import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css'
// import HomePage from './Views/HomePage';
import Nav from './components/Nav'
import Content from './components/Content'
import Root from "./routes/root";
import {
        createBrowserRouter,
        RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
        {
                path: "/main_window",
                element: <Root />,
        },
]);

import GlobalContextComp from './context/GlobalContextComp';

const root = createRoot(document.getElementById('root'));

root.render(<>
        <GlobalContextComp>
                <React.StrictMode>
                        <Nav />
                        <Content>
                                <RouterProvider router={router} />
                        </Content>
                        {/* <HomePage /> */}
                </React.StrictMode>
        </GlobalContextComp>
</>);