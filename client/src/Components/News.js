import React, { Component } from 'react'
import Post from './Post';

export default class News extends Component {
    render() {
        return (
            <div>
                <Post name="younes" />
                <Post />
            </div>
        )
    }
}
