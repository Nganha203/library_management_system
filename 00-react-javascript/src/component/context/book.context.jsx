import { createContext, useState } from "react";

const BookContext = createContext()

const BookProvider = (props) => {
    const [listBook, setListBook] = useState([])
    
    return (
        <BookContext.Provider value={{listBook, setListBook}}>
            {props.children}
        </BookContext.Provider>
    )
}

export { BookContext, BookProvider }