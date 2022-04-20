import './App.css'
import getLocation from './features/getLocation';
import { increment } from './redux/appSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks'

const App = () => {
  const counter = useAppSelector(store => store.appSlice.value);
  const dispatch = useAppDispatch();

  getLocation();

  return (
    <div className="App">
      <button
        onClick={() => dispatch(increment())}
      >
        {counter}
      </button>
    </div>
  )
}

export default App
