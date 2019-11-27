import React, {Component} from 'react'
import Sticky from 'react-sticky-el';

export default class NavbarMenu extends Component {
    logout(){
        sessionStorage.clear()
        window.location.reload()
    }

    render(){
        return(
            <div className="navigation-bar">
                                   
                    <nav className="navbar navbar-expand-md bg-info navbar-dark">
                        <a className="navbar-brand" href="/">{sessionStorage.Name}</a>
                        <img src={sessionStorage.Photo} alt=""></img>                    
                        
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                            <div className="fa fa-bars"></div>
                        </button>
                        
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">                        
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/search">Search</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/" onClick={this.logout}>Logout</a>
                                </li>
                                                              
                            </ul>
                        </div>  
                    </nav>                    
                
            </div>
        )            
    } 
}