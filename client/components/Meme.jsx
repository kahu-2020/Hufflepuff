import React, { Component } from 'react'


class Meme extends Component {
    constructor() {
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: 'http://i.imgflip.com/1bij.jpg',
            allMemeImg: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes") 
        .then(response => response.json())
        .then(response => {
            const { memes } = response.data
            console.log(memes)
            this.setState({ allMemeImg: memes })
        })
    }

    handleChange(event) {
        const {name, value} = event.target 
        this.setState({ [name]: value })
    }

    handleSubmit(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImg.length)
        const randMemeImg = this.state.allMemeImg[randNum].url 
        this.setState({ randomImg: randMemeImg })
    }

    render() {
        return (
            <div>
                
                <form className="meme-form">
                    <input 
                        type='text'
                        name='topText'
                        placeholder='Top Text'
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input 
                        type='text'
                        name='BottomText'
                        placeholder='Bottom Text'
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />


                    <button>Generator!</button>
                </form>

                <div className='meme'>
                    <img src={this.state.randomImg} alt="" />
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>


                </div>

            </div>
        )
        
    }



}









export default Meme