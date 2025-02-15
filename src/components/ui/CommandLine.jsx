import { Input } from "reactstrap"
import { handleEnterPress } from "../../ui functions/uiFunctions"

export const CommandLine = () => {

    const handleInput = () => {

    }

    return (
        <Input 
            type="text"
            style={{border: "4px solid green", height: "30px", padding: 0}}
            onChange={handleInput}
            onKeyDown={(e) => {handleEnterPress(e)}}
            />
    )
}