import { createRoot } from 'react-dom/client';
import CloseButton from './components/CloseButton';
import './index.css'
const root = createRoot(document.getElementById('root'));
root.render(<>
  <h1 className="text-3xl font-bold underline text-green-300">
    Hello world!
  </h1>
    <CloseButton/>
</>);