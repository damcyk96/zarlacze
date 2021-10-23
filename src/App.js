import DashBoard from './components/Dashboard/Dashboard'
import Entries from './components/Entries/Entries'
import Login from './components/Login/Login'
import NewEntry from './components/NewEntry'

function App() {
    return (
        <div className="App">
            <NewEntry />
            <Entries />
        </div>
    )
}

export default App
