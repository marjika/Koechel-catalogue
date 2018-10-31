import React, { Component } from "react";
//import Jumbotron from "../../components/Jumbotron";
//import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
//import { Input, TextArea, FormBtn } from "../../components/Form";
import './Edits.css';

class Edits extends Component {
    // Setting our component's initial state
    state = {
      user: "",
      item: {}
    };
    constructor() {
      super();
    }

    componentDidMount() {
        API.getNotes(this.props.match.params.id)
          .then(res => this.setState({ item: res.data }))
          .catch(err => console.log(err));
      }

    render() {
        return (
            <div className="musicNotes" style={{paddingTop:"25px"}}> 
                <Container fluid>
                    <Row>
                        <Col size="md-6">
                            <p>These are your music notes.</p>
                            <h3>{this.state.item.title}</h3>
                            <h5>{this.state.item.notes}</h5>
                            {(this.state.item.timeFrame) &&
                            <h5>date: {this.state.item.timeFrame}</h5>}
                        </Col>
                        <Col size="md-6" />
                    </Row>
                </Container>
                  </div>
    );
  }
}

export default Edits;