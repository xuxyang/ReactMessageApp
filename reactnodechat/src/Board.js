import React, { Component } from 'react'
import Message from './Message'
import axios from 'axios'
import io from 'socket.io-client'

class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
        this.add = this.add.bind(this)
        this.eachMessage = this.eachMessage.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:3001/messages')
             .then(res => 
                this.setState({messages: res.data})
            )
        var socket = io('http://localhost:3001');
        socket.on('message', data => {
            this.setState(prevState => ({
                messages: [
                    ...prevState.messages,
                    data
                ]
            }))
        })
    }

    add() {
        axios.post('http://localhost:3001/messages', {
            name: this.refs.Name.value,
            message: this.refs.Message.value
        })
             
    }

    eachMessage(message) {
        return (
            <Message key={message.id}
                     name={message.name} 
                     message={message.message}>
            </Message>
        )
    }

    render() {
        return (
            <div className="container">
                <br/>
                <div className="jumbotron">
                    <h1 className="display-4">Send Message</h1>
                    <br/>
                    <input className="form-control" placeholder="Name" ref="Name"/>
                    <br/>
                    <textarea className="form-control" placeholder="Message" ref="Message"></textarea>
                    <br/>
                    <button className="button button-success"
                            onClick={this.add.bind(null, null)}>Send</button>
                </div>
                <div>
                    {this.state.messages.map(this.eachMessage)}
                </div>
            </div>
        )
    }
}

export default Board