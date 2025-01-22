import { useEffect, useState } from "react"

const ScrollToStop = () => {
    const [backToStop, setBackToStop] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setBackToStop(true)
            }
            else {
                setBackToStop(false)
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div>
            {
                backToStop && (
                    <button
                        onClick={scrollUp}
                        style={{
                            position: "fixed",
                            bottom: 30,
                            right: 30,
                            backgroundColor: "#FFAA1D",
                            width: 50,
                            height: 50,
                            borderRadius: "50%"
                        }}
                        
                    >
                        <i style={{fontSize: 18, color: 'white'}} className="fa-solid fa-arrow-up"></i>

                    </button>

                )
            }
        </div>


    )
}

export default ScrollToStop