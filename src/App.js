import Bundles from './components/Bundles/Bundles'
import ChooseDate from './components/ChooseDate'
import DashBoard from './components/Dashboard/Dashboard'
import Entries from './components/Entries/Entries'
import Login from './components/Login/Login'
import NewEntry from './components/NewEntry'
import EntriesWithDatePicker from './pages/EntriesWithDatePicker'

function App() {
    return (
        <div className="App">
            <EntriesWithDatePicker />
        </div>
    )
}

export default App
