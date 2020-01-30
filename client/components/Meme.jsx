import React, { Component } from 'react'


// Initializing state to save data:
// top text 
// bottom text 
// random image 



class Meme extends Component {
    constructor() {
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: 'http://i.imgflip.com/1bij.jpg'
        };
    }
    render() {
        return <h1>Meme Section</h1>
    }
}

/*make an API call to get memea API and save the data that comes back. 

// /Create the input form */







export default Meme