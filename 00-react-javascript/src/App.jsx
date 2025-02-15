import { useContext, useEffect, useState } from 'react'
import Header from './component/playout/header'
import { Outlet } from 'react-router-dom'
import { getAccount } from './util/api'
import { AuthContext } from './component/context/auth.context'
import { Spin } from 'antd';
import FooterLayout from './component/playout/footer'

function App() {
    const { setAuth, loading, setLoading } = useContext(AuthContext)
    useEffect(() => {
        const fetchAccountApi = async () => {
            setLoading(true)

            const res = await getAccount()
            setAuth({
                isAuthenticated: true,
                user: {
                    email: res.email,
                    name: res.name
                }
            })

            setLoading(false)
        }

        fetchAccountApi()
    }, [])

    return (
        <>
            {loading === true ?
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}> <Spin/> </div>
                :
                <>
                    <Header />
                    <Outlet />
                    <FooterLayout/>

                </>
            }

        </>
    )
}

export default App
