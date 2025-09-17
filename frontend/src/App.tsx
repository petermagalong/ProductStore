import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import { useThemeStore } from './store/useThemeStore';
function App() {
  const { theme } = useThemeStore();
  return (
    <div data-theme={theme} className='min-h-screen bg-base-200 transition-colors duration-300'>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/product/:id" element={<ProductPage />}></Route>
      </Routes>
    </div>
  )
}

export default App