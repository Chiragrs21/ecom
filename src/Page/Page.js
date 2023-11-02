import React from 'react'
import './Page.css'

function Page({ totalposts, postperpage, setcurrentpage }) {

    let pages = [];

    for (let i = 1; i <= Math.ceil(totalposts / postperpage); i++) {
        pages.push(i);
    }
    return (
        <div className='Page'>
            {pages.map((page, index) => {

                return <button key={index} onClick={() => {
                    setcurrentpage(page)
                }}>{page}</button>

            })}
        </div>
    )
}

export default Page
