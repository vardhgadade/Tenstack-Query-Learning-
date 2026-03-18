import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router,Route,Routes, BrowserRouter } from 'react-router-dom'
import { Navbar } from './Components/Navbar'
import { MainLayout } from './Components/MainLayout'
import { Home } from './Pages/Home'
import { FetchOld } from './Pages/FetchOld'
import { FetchRq } from './Pages/FetchRq'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Individual } from './Pages/Individual'


const queryClient= new QueryClient()

function App() {
  return (
   <>
   <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
   <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='Fetch-Old' element={<FetchOld />} />
        <Route path='Fetch-RQ' element={<FetchRq />} />
        <Route path='/Ind/:id' element={<Individual />} />
        <Route path='/rq/:id' element={<Individual />} />
      </Route>
     </Routes>
   </Router>
   </QueryClientProvider>
   </>
  )
}

export default App
