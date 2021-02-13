import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';

class FavIcon extends Component {
    state = {
        id: this.props.id,
        color: this.props.color,
        size: this.props.size,
        fav: this.props.favStatus
    }

    render() {
        return (
            <Ionicons name={this.state.fav === true ? 'ios-heart' : 'ios-heart-empty'} size={25} color="blue" onPress={() =>this.props.callBack(this.props.id)}/>
        )
    }
}
export default FavIcon;

