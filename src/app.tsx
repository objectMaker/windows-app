import { createRoot } from 'react-dom/client';
import Nav from './components/Nav';
import './index.css'
import Player from './components/Player';
const root = createRoot(document.getElementById('root'));
root.render(<>
    <Nav />
    <Player />
</>);