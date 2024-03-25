import { createRoot } from 'react-dom/client';
import CloseButton from './components/CloseButton';
import './index.css'
const root = createRoot(document.getElementById('root'));
root.render(<>
  <div className="text-3xl font-bold underline text-green-300">
    Hello world!
  </div>
    <CloseButton/>
</>);