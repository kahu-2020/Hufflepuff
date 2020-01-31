//import stuff I need to use here
import React from 'react'

// extend the React.Componet class to Meme class
class Meme extends React.Component {
    // use constructor method to build new class
    constructor(props) {
        // implement superagent
        super(props)
        //set initial state values
        this.state = {
            topText: '',
            bottomText: '',
            randImg: './random.jpg',
            allMemeImgs: []
        }
        // bind handlers
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //use inbuilt componentDidMount method to ensure component has mounted
    componentDidMount() {
        //use fetch method to return a promise from our API
        fetch("https://api.imgflip.com/get_memes")
            //take the promise resonse and resolve with the result of parsing as JSON 
            .then(response => response.json())
            //take the jsoned response data and assign it to memes object
            .then(response => {
                const { memes } = response.data
                //set the value of allMemes array to memes
                this.setState({ allMemes: memes })
            })
    }

    //handle changes in textareas
    handleChange(event) {
        // define name and value as those of the current target
        const { name, value } = event.target
        //set state to the current name and value 
        this.setState({ [name]: value })
    }

    // handle the submit event in <form>
    handleSubmit(e) {
        //stop submit from sending back to server
        e.preventDefault()
        //define rand as a random number between 1 and the length of allMemes
        const rand = Math.floor(Math.random() * this.state.allMemes.length)
        //define randMeme as the url property of the rand index of allMemes
        const randMeme = this.state.allMemes[rand].url
        // console.log(randMeme)
        // set the state of randImg to randMeme
        this.setState({
            randImg: randMeme
        })
        // console.log(randImg)
    }
    //render to dom
    render() {
        //return for render method
        return (
            <div className='container'>

                <div className='meme'>
                    {/* img reads state of randImg and sets as src */}
                    <img src={this.state.randImg} alt="meme" />
                    {/*get state from top and bottom textareas and display as <h2>'s */}
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
                {/* use handleSubmit method on <form>'s onSubmit event */}
                <form onSubmit={this.handleSubmit}>
                    <div className='formDisplay'>
                        {/* build textareas, set values to current state, set onChange to handleChange method */}
                        <textarea name='topText' row='1' cols='50' placeholder='Top Text' value={this.state.topText} onChange={this.handleChange}>Welcome to the Meme generator!</textarea>

                        <textarea name='bottomText' row='1' cols='50' placeholder='Bottom Text' value={this.state.bottomText} onChange={this.handleChange}>Welcome to the Meme generator!</textarea>

                        <br />

                        {/* make a button */}
                        <button>Generate</button>
                    </div>


                </form>

            </div>
        )
    }

}

export default Meme
