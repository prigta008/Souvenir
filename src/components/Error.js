import React from 'react'

export const Error = (props) => {
    return (
        <span style={{ "color": props.type }}>{props.children}</span>
    )
}

export const Loading = () => {
    return (
        <>
            Loading....
        </>
    )
}
