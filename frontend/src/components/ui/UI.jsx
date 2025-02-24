/* eslint-disable react/prop-types */
import { Container, Col, Row } from "reactstrap"
import { MainWindow } from "./MainWindow";
import { PlayerBar } from "./PlayerBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { CommandLine } from "./CommandLine";
import { DevWindow } from "./DevWindow";

export const UI = () => {
    return (
        <Container 
            style={{
                maxWidth: "2100px", 
                width: "100%", 
                maxHeight: "1200px",
                height: "100%",
                border: "4px solid red",
                padding: 0
            }}>
            <Col style={{border: "4px solid green", height: "100%"}}>
                <Row className="gx-0" style={{border: "4px solid purple", height: "100%"}}>
                    <Col style={{flex: "0 0 67%", maxWidth: "67%", border: "4px solid pink"}}>
                        <MainWindow />
                        <CommandLine />
                        <DevWindow />
                        {/* <PlayerBar /> */}
                    </Col>

                    <Col style={{border: "4px solid pink"}}>
                        <Row className="gx-0 row-2" style={{border: "4px solid blue", height: "34%"}}></Row>
                        <Row className="gx-0 row-2" style={{border: "4px solid blue", height: "66%"}}></Row>
                    </Col>
                </Row>
            </Col>
        </Container>
    )
}