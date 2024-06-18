import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, BasketPage, CheckoutPage, CataloguePage, AccountPage, NotFoundPage, ProductPage, LoginPage, RegisterPage } from './pages'
import { Footer, Header, Navbar } from './components'
import useBasket from './hooks/useBasket'
    
import './App.scss'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { fetchUser } from './reducers/user.reducer'

function App() {
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    useBasket()

    const [menuOpen, setMenuOpen] = useState(false)

    return <div className={classNames('app', { 'app--locked': menuOpen })}>
        <BrowserRouter>
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/products/:productId' element={<ProductPage/>}/>
                <Route path='/catalogue/:category?' element={<CataloguePage/>}/>
                <Route path='/basket' element={<BasketPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/account' element={<AccountPage/>}/>
                <Route path='/checkout' element={<CheckoutPage/>}/>
                <Route path='/*' element={<NotFoundPage/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </div>
}

export default App;