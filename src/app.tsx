import { createRoot } from 'react-dom/client';
import './index.css'
import HomePage from './Views/HomePage';

import GlobalContextComp from './context/GlobalContextComp';
const root = createRoot(document.getElementById('root'));

root.render(<>
            <GlobalContextComp>
                    <HomePage/>
            </GlobalContextComp>
</>);