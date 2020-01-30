import React from 'react'


class Meme extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topText: '',
            bottomText: '',
            randImg: './random.jpg',
            allMemes: []
        }
        this.handleChange = this.handleChange.bind(this)
        // this.componentDidMount = this.componentDidMount.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes") 
        .then(response => response.json())
        .then(response => {
            const { memes } = response.data
            this.setState({ allMemes: memes })
        })
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit(e){
        e.preventDefault()

        const rand = Math.floor(Math.random() * this.state.allMemes.length)
        const randMeme = this.state.allMemes[rand].url
        console.log(randMeme)
        this.setState({
            randImg: randMeme
        })
        console.log(randImg)
    }
    
    render() {
        return (
            <div className='container'>

                <div className='meme'>
                    <img src={this.state.randImg} alt="meme" />
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className='formDisplay'>
                        <textarea name='topText' row='1' cols='50' placeholder='Top Text' value={this.state.topText} onChange={this.handleChange}></textarea>

                        <textarea name='bottomText' row='1' cols='50' placeholder='Bottom Text' value={this.state.bottomText} onChange={this.handleChange}></textarea>

                        <br>
                        </br>

                        <button>Generate</button>
                    </div>


                </form>

            </div>
        )
    }

}

export default Meme
