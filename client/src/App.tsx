import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import { QuoteProvider } from './components/quote/QuoteModalContext'
import Home from './pages/Home'
import Produtos from './pages/Produtos'
import Servicos from './pages/Servicos'
import Contato from './pages/Contato'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <QuoteProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/servicos" element={<Servicos />} />
              <Route path="/contato" element={<Contato />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </QuoteProvider>
    </HashRouter>
  )
}
