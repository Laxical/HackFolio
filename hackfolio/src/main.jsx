import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from '../store/store.jsx';
// import { PersistGate } from 'redux-persist/integration/react'
// import  { persistor } from '../store/store.jsx';
// import { Provider } from 'react-redux'  // <-- Add this import
// import store from '../store/store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    {/* <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate> */}
<App />
    </BrowserRouter>

    </Provider>
  </StrictMode>,
)


