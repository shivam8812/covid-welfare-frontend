import React,{ Component } from 'react';
import './Provide.css';
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect 
} from "react-router-dom";
import  './Notifications.css'
import axios from 'axios';
class Notifications extends Component {
    constructor(props){
        super(props);
        this.state = {
            provideReqs:[],seekReqs:[],othersReqs:[],clickedUser:[],seektext:""
        }
        this.getProvideReqs=this.getProvideReqs.bind(this);
        this.getSeekReqs=this.getSeekReqs.bind(this);
        this.getothersReqs=this.getothersReqs.bind(this);
        this.showDetails=this.showDetails.bind(this);
    }
    componentDidMount(){
        this.getProvideReqs();
        this.getSeekReqs();
        this.getothersReqs();
    }
    getProvideReqs(){
        axios.get(`https://hidden-reef-87983.herokuapp.com/notification/providereq/`,
                {
                  headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
    
        })
        .then(response => {
            this.setState({
                provideReqs:response.data.users,
            })
            console.log(this.state.provideReqs);
        })
        .catch( error =>{
            console.log(error);
        }
        )
    }
    getSeekReqs(){
        axios.get(`https://hidden-reef-87983.herokuapp.com/notification/seekreq/`,
                {
                  headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
    
        })
        .then(response => {
            this.setState({
                seekReqs:response.data.users,
            })
            console.log(this.state.seekReqs);
        })
        .catch( error =>{
            console.log(error);
        }
        )
    }
    getothersReqs(){
        axios.get(`https://hidden-reef-87983.herokuapp.com/notification/`,
                {
                  headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
    
        })
        .then(response => {
            this.setState({
                othersReqs:response.data.notifications,
            })
            console.log(response);
        })
        .catch( error =>{
            console.log(error);
        }
        )
    }
    showDetails(username){
        axios.get(`https://hidden-reef-87983.herokuapp.com/api/${username}`,{
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })      
        .then(response => {
            this.setState({
                clickedUser:response.data,
            })
            console.log(this.state.clickedUser);
        })
        .catch(error => {
            console.log(error);
        })
        axios.get(`https://hidden-reef-87983.herokuapp.com/api/${username}/seek`,{
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })      
        .then(response => {
            this.setState({
                seektext:response.data.seek_text,
            })
        })
        .catch(error => {
            console.log(error);
        })
    }
    render(){
        return(
            <div className="notification-prnt">
                <div className="notification-cntr">
                    <div className="notification-left">
                        <Navbar />
                    </div>
                    <div className="notification-center">
                        <div className="nofis">
                        <div className="nofis-card">
                        <h4>Your provide requests</h4>
                        <div>
                            {this.state.provideReqs.map(request => (
                                <div>
                                    <text>You have requested to help</text> <text value={request} className="req-name" onClick={() => this.showDetails(request)}> {request}</text>
                                </div>  
                            ))}
                        </div>
                        </div>
                        <div className="nofis-card">
                        <h4>Your seek requests</h4>
                        <div>
                            {this.state.seekReqs.map(request => (
                                <div>
                                    <p>You have requested to get help from</p> <p value={request} className="req-name" onClick={() => this.showDetails(request)}> {request}</p>
                                </div>
                            ))}
                        </div>
                        </div>
                        <div className="nofis-card">
                        <h4>People who have requested from you</h4>
                        <div>
                            {this.state.othersReqs.map(request => (
                                <div>
                                    <p value={request} className="req-name" onClick={() => this.showDetails(request.text.split(" ")[0])}>{request.text}</p><p>{request.time.slice(0,10)}</p>
                                </div>
                            ))}
                        </div>
                        </div>
                        </div>
                    </div>
                    <div className="notification-right">
                        {   (Object.keys(this.state.clickedUser).length > 0)
                            ?<div className="details">
                            <div className="detail-heading">Username</div><div className="detail-text"> {this.state.clickedUser.username}</div>
                            <div className="detail-heading">Adrress</div><div className="detail-text"> {this.state.clickedUser.address}</div>
                            <div className="detail-heading">Blood group</div><div className="detail-text"> {this.state.clickedUser.blood_group}</div>
                            <div className="detail-heading">Contact number</div><div className="detail-text"> {this.state.clickedUser.contact}</div>
                            <div className="detail-heading">Occupation</div><div className="detail-text"> {this.state.clickedUser.occupation}</div>
                            <div className="detail-heading">Seektext</div><div className="detail-text"> {this.state.seektext}</div>
                            </div>
                            :<div>Click on a notification to see its details</div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Notifications;