import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import SignIn from './Components/SignIn/SignIn'
import Rank from './Components/Rank/Rank'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import RequestForm from './Components/RequestForm/RequestForm'
import Particles from 'react-particles-js' 
import Register from './Components/Register/Register'
import ErrorImageLink from './error'
import './App.css';

const ParticlesSet = {
   particles: {
      number:{
        value:110,
        density: {
          enable:true,
          value_area:800
        }
      }
    } 
}

const InitialState = {
       input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
      error:false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component {
  constructor() {
    super();
    this.state = InitialState;  
  }

   UploadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation =(data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row *height)
    }
  }

  displayFaceBox =  (box) =>{
    this.setState({box: box});
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

 onButtonClick = () => {
    if (this.state.input){
       this.setState({imageUrl: this.state.input});
     fetch('https://morning-plains-16860.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
      .then(response=>response.json())
      .then(response => {
        if (response) {
          fetch('https://morning-plains-16860.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log);
            this.setState({
                  error:false,
              })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
    }
    else {
      console.log("blabla")
      this.setState({
          error:true,
      })
    }
  }

    onRouteChange = (route) => {
      if (route === 'signout' ) {
        this.setState(InitialState)
      }else if(route === 'Home'){
        this.setState({isSignedIn:true})
      }
      this.setState({route : route});
    }   
  render(){
     return(
          <div className ='App'>
                <Particles className="particles"  params={ParticlesSet}/>
                <Navigation isSignedIn ={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
                {this.state.route === 'Home'
                  ?
                    <div>
                          <Logo/>
                          <Rank
                                 name={this.state.user.name}
                                entries={this.state.user.entries} 
                          />
                          <RequestForm  onInputChange={this.onInputChange} 
                                        onButtonClick ={this.onButtonClick}/>
                            {this.state.error ? <ErrorImageLink/> :                        
                              <FaceRecognition box ={this.state.box}
                                               imageUrl={this.state.imageUrl}/> }
                    </div>
                    :(
                      this.state.route === 'SignIn'
                    ?<SignIn  UploadUser = {this.UploadUser} onRouteChange = {this.onRouteChange}/>
                    : <Register 
                          UploadUser = {this.UploadUser} onRouteChange = {this.onRouteChange}/>
                    )
               }
          </div>
          );
       }
      }


          
export default App;
