import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import HelloWorld from './components/HelloWorld'

export default function App(){
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/hello' element={<HelloWorld />}></Route>
			</Routes>
		</BrowserRouter>
	)
}
	