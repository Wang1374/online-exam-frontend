import { Link } from "react-router-dom"

export const Home : React.FC = () =>{
    return (
        <div>
            Home
            <Link to="/user">USer</Link>
        </div>
    )
}