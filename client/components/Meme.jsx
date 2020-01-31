import React from 'react'

// created a parent class which sets an ultimate beahviour and a default 'state'
class Meme extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            // this is the behaviour of the class/or state
            topText: '',
            bottomText: '',
            randImg: './random.jpg',
            allMemes: []
        }
        this.handleChange = this.handleChange.bind(this)
        // this.componentDidMount = this.componentDidMount.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // creating a method for getting the data
    componentDidMount() {
        // using this API to provide images for our meme
        fetch("https://api.imgflip.com/get_memes") 
        // once the fetch has found the API then convert into a JSON object so we cans read the data
        .then(response => response.json())
        .then(response => {
            // setting previous JSON object and making it a JS variable called 'memes' that we can then reuse easily
            const { memes } = response.data
            // we are setting the 'allMemes' state to the response data called 'memes'
            this.setState({ allMemes: memes })
        })
    }
    // this method sets the state of the text box and handles our text input
    handleChange(event) {
        //create a new variable that targets where to save this information
        const { name, value } = event.target
        //set the state of our class to the target variable.
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
