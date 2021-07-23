import React from 'react'

const Message = ({msg,bgColor}) => {
    let styles = {
        padding: '1rem',
        marginBotton: '1rem',
        textAlign: 'center',
        color: "#fff",
        fontWeigth: "bold",
        backgroundColor: bgColor,
    }
    return (
        <div style={styles}>
            <p>{msg}</p>
        </div>
    )
}
export default Message;
