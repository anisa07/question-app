import {useState} from "react";
import {TitleContainer} from "./style"

interface TitleProps {
    text: string,
    info?: string
}

export const Title = ({text, info}: TitleProps) => {
    const [infoVisible, setInfoVisible] = useState(false);

    const handleMouseEnter = () => {
        setInfoVisible(true)
    }
    const handleMouseLeave = () => {
        setInfoVisible(false)
    }

    return (<TitleContainer>
        <h3 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {text}
            {infoVisible && info && <span className="prompt">{info}</span>}
        </h3>
    </TitleContainer>)
}
