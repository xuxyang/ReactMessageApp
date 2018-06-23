import React, { Component } from 'react'

class Message extends Component {
    render () {
        return (
            <div>
                <h4>{this.props.name}</h4>
                <p>{this.props.message}</p>
            </div>
        )
    }
}

export default Message