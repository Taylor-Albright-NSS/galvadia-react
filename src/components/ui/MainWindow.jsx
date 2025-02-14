import { Col, Container, Row } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css";



export const MainWindow = () => {
    return (
        <Container 
            className="test" 
            style={{
                maxWidth: "1200px", 
                width: "1200px", 
                maxHeight: "1200px",
                height: "800px",
                border: "4px solid red"
            }}>
            <Col>
                <Row className="d-flex flex-row">
                    <Col>
                        <Row>
                            Main Window
                        </Row>
                        <Row>
                            Bottom UI
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            Monster icons
                        </Row>
                        <Row>
                            Area and npc display
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Container>
    )
}