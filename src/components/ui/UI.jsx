import { Container, Col, Row } from "reactstrap"
import { MainWindow } from "./MainWindow";
import "bootstrap/dist/css/bootstrap.min.css";
import { CommandLine } from "./CommandLine";

export const UI = () => {
    return (
        <Container 
            style={{
                maxWidth: "2100px", 
                width: "100%", 
                maxHeight: "1200px",
                height: "1000px",
                border: "10px solid red",
                padding: 0
            }}>
            <Col style={{border: "10px solid green", height: "100%"}}>
                <Row className="gx-0" style={{border: "10px solid purple", height: "100%"}}>
                    <Col className="col-8" style={{border: "10px solid pink"}}>
                        {/*Main Window*/}
                        <Row className="gx-0 row-2" style={{border: "10px solid blue", height: "75%"}}>
                            <MainWindow />
                            <CommandLine />
                        </Row>
                        <Row className="gx-0 row-2" style={{border: "10px solid blue", height: "25%"}}>
                        </Row>
                    </Col>
                    <Col style={{border: "10px solid pink"}}>
                    <Row className="gx-0 row-2" style={{border: "10px solid blue", height: "34%"}}>
                    </Row>
                    <Row className="gx-0 row-2" style={{border: "10px solid blue", height: "66%"}}>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Container>
    )
}