import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { TextArea, FormBtn } from "../../components/Form";
import './Edits.css';

class Edits extends Component {
    state = {
      user: "",
      item: {},
      editable: false,
      notes: ""
    };

    componentDidMount() {
        this.loadNote();
      }

      loadNote = () => {
        API.getNotes(this.props.match.params.id)
        .then(res => this.setState({ item: res.data, editable:false }))
        .catch(err => console.log(err));
      }

      handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    noteEdit = (id) => {
        if (!this.state.editable) {
            this.setState({ editable:true, notes:this.state.item.notes })
        }
        else {
            this.setState({ editable:false})
        }
    }

    handleFormSubmit = event => {
        event.preventDefault();
          API.editNote({
            notes: this.state.notes,
            id: this.state.item._id
          })
            .then(res => this.loadNote())
            .catch(err => console.log(err));
      };

    render() {
        return (
            <div className="musicNotes" style={{paddingTop:"25px"}}> 
                <Container fluid>
                    <Row>
                        <Col size="md-6">
                            <h3>{this.state.item.title}</h3>
                            {(this.state.item.timeFrame) &&
                            <h6>Time Frame: {this.state.item.timeFrame}</h6>}
                            <h5>{this.state.item.notes}</h5>
                            <button className="noteEdit" onClick={() => this.noteEdit(this.state.item._id)}>Edit Notes</button>
                        </Col>
                        <Col size="md-6">
                            {(this.state.editable) &&
                            <form>
                            <TextArea
                                value={this.state.notes}
                                onChange={this.handleInputChange}
                                name="notes"
                            />
                            <FormBtn
                                // disabled={!(this.state.title)}
                                onClick={this.handleFormSubmit}
                            >
                                Submit Note
                            </FormBtn>
                            </form>}
                        </Col>
                    </Row>
                </Container>
                  </div>
    );
  }
}

export default Edits;