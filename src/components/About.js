import React from "react";
import User from "./User";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {}
  render() {
    return (
      <div>
        <div>About</div>
        <User />
        <UserClass />
      </div>
    );
  }
}

export default About;
//rafce
