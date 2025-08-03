import React from "react"

// !class Based component in React
class UserClass extends React.Component{
    constructor(props) {
        
        super(props);
        this.state = {
          user: { name: "Rohit Maurya", location: "Delhi" },
        };
    }

   async componentDidMount() {
    const data = await fetch("https://api.github.com/users/akshaymarch7");
    const json = await data.json();
    this.setState({ user: json });
   }
    // ! First constructor is called then render() is called then componentDidMount() is called
    render() {
       
         return (
           <div className="user-card">
             <img
               src={this.state.user.avatar_url}
               alt=""
               style={{ width: 80 }}
             />
             <h2>Name : {this.state.user.name}</h2>
             <h3>Location : {this.state.user.location}</h3>
             <h3>Github: {this.state.user.url}</h3>
           </div>
         ); 
    }
}
export default UserClass;


