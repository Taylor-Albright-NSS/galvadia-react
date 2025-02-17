import { Container } from "reactstrap"
import "../styles/colors.css"

export const areaDisplay = (area) => {
    return (
        <div className="my-2">
            <p style={{color: "green"}}>{area.heading}</p>
            <p>{area.description}</p>
            <span className="d-flex">
                <p>Exits: </p>
                {area.exits.map((direction, index) => {return <p className="mx-1 green" key={index}>{direction}</p>})}
            </span>
        </div>
    )
}