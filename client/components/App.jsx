import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Meme from './Meme'


const App = () => {
  return (
    <React.Fragment>
      <Header />
      <div>
        <Meme />
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default App
