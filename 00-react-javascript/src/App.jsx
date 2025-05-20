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
                }}> <Spin /> </div>
                :
                <div className="flex flex-col min-h-screen">

                    <div className="flex flex-col min-h-screen">
                        {/* 2. Header fixed, nên content cần padding-top cho nó xuống dưới header */}
                        <Header />
                        {/* 3. Main content: flex-1 để giãn nở, padding-top bằng đúng chiều cao header (vd: 64px) */}
                        <main className="flex-1 pt-16">
                            <Outlet />
                        </main>
                        {/* 4. Footer “bình thường” nằm cuối flex container */}
                        <FooterLayout />
                    </div>
                </div>
            }

        </>
    )
}

export default App
