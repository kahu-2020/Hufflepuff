import React from 'react'
import { Link } from 'react-router-dom' 


class Meme extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topText: '',
            bottomText: '',
            randId: '',
            randImg: './random.jpg',
            allMemes: [],
            isVisible: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes") 
        .then(response => response.json())
        .then(response => {
            const { memes } = response.data
            // console.log(memes)
            this.setState({ allMemes: memes })
        })
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleClick(event) {
        const{ name, value } = event.target
        this.setState({
            [name]: false
        })
    }

    handleSubmit(e){
        e.preventDefault()

        const rand = Math.floor(Math.random() * this.state.allMemes.length)
        const randMeme = this.state.allMemes[rand].url
        this.setState({
            randImg: randMeme,
            randId: this.state.allMemes[rand].id,
        })
        console.log(this.state.allMemes)
    }
    
    render() {
        return (
            <div className='container'>

                <div className='meme'>
                    <img src={this.state.randImg} alt="meme" />
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
                {this.state.isVisible && <form onSubmit={this.handleSubmit}>
                    <div className='formDisplay'>
                        <textarea name='topText' row='1' cols='50' placeholder='Top Text' value={this.state.topText} onChange={this.handleChange}>Welcome to the Meme generator!</textarea>
                        <textarea name='bottomText' row='1' cols='50' placeholder='Bottom Text' value={this.state.bottomText} onChange={this.handleChange}>Welcome to the Meme generator!</textarea>
                        <br>
                        </br>
                        <button>Generate</button>
                    </div>


                </form>}
            </div>
        )
    }

}

export default Meme
