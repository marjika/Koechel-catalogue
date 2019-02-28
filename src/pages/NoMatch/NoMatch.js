import React from "react";
import { Col, Row, Container } from "../../components/Grid";

const NoMatch = () => (
  <Container fluid>
    <Row>
      <Col size="md-2" />
      <Col size="md-8">
          <h1>404 Page Not Found</h1>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji" className="emoji-span">
              🙄
            </span>
          </h1>
      </Col>
      <Col size="md-2" />
    </Row>
  </Container>
);

export default NoMatch;