import {Routes, Route} from 'react-router-dom'
import Main from './page/main'
import LandingNav from "./page/LandingPage/LandingNav";
import LandingPage from './page/LandingPage'

function App() {
    return (
        <div className="">
            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={'/landing-page'} element={<LandingPage/>}/>
            </Routes>
        </div>
    );
}

export default App;