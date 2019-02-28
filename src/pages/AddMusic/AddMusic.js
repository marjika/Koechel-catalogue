import React, { Component } from "react";
import { BrowserRouter as Router, Link} from 'react-router-dom';
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import './AddMusic.css';


class AddMusic extends Component {
  state = {
    user: "",
    repertoire: [],
    title: "",
    composer: "",
    time: "",
    notes: ""
  };
  constructor() {
    super();
    this.userId = "";
  }

  // When the component mounts, load catalog and save them to this.state.repertoire
  componentDidMount() {
      API.getUserId()
        .then(res =>
            this.setState({ user: res.data.user._id }, () => {
                this.loadRepertoire(this.state.user); 
            })
        )
        .catch(err => console.log(err));
  }

  loadRepertoire = id => {
    API.getSaved(this.state.user)
      //.then(res => console.log(res.data.catalog))
      .then(res =>
        this.setState({ repertoire: res.data.catalog, title: "", composer: "", time: "", notes: "" }, () => {
            console.log(this.state.repertoire)
        })
      )
      .catch(err => console.log(err));
  };

  deleteMusic = id => {
    API.deleteMusic(id)
      .then(res => this.loadRepertoire(this.state.user))
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

//   When the form is submitted, use the API.saveCatalog method to save the music data
//   Then reload from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.saveCatalog({
        title: this.state.title,
        composer: this.state.composer,
        timeFrame: this.state.time,
        notes: this.state.notes,
        id: this.state.user
      })
        .then(res => this.loadRepertoire(this.userId))
        .catch(err => console.log(err));
    }
  };

  toEdits = (id) => {
    this.props.history.push("/edits/" + id)
  }

  render() {
    return (
      <div className="musicList">
      <Container fluid>
        <Row>
            <Col size="md-6 sm-12">
                {this.state.repertoire.length ? (
                <List>
                    {this.state.repertoire.map(piece => {
                    return (
                        <ListItem key={piece._id}>
                          <Link to={"/edits/" + piece._id} style={{color: "white", fontSize:"18px"}}>
                              <strong>
                              {piece.title} by {piece.composer}
                              </strong>
                          </Link>
                        <DeleteBtn onClick={() => this.deleteMusic(piece._id)} style={{float:"right"}} />
                        </ListItem>
                    );
                    })}
                </List>
                ) : (
                <h3>No Results to Display</h3>
                )}
            </Col>
            <Col size="md-6">
                <form>
                <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    placeholder="Title (required)"
                />
                <Input
                    value={this.state.composer}
                    onChange={this.handleInputChange}
                    name="composer"
                    placeholder="Composer"
                />
                <Input
                    value={this.state.time}
                    onChange={this.handleInputChange}
                    name="time"
                    placeholder="Time Frame"
                />
                <TextArea
                    value={this.state.notes}
                    onChange={this.handleInputChange}
                    name="notes"
                    placeholder="Notes"
                />
                <FormBtn
                    disabled={!(this.state.title)}
                    onClick={this.handleFormSubmit}
                >
                    Add to Repertoire
                </FormBtn>
                </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AddMusic;

//this.props.history.push("/game")
//onClick={this.toEdits}