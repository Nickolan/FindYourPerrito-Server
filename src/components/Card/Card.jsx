import { Link } from "react-router-dom"
import CardStyle from "./Card.module.css"

export default function Card({id, image, name, temperament, weight, madeInDB}){
    if (madeInDB) {
        let temperaments = temperament.map(temp => {
            return ` ${temp.name}`
        })
        temperament = temperaments.toString().trim()
    }
    return (
        <div className={CardStyle.marco}>
            <Link to={`/detail/${id}`}>
            <img className={CardStyle.foto} src={image} alt={name} />
            <h2 className={CardStyle.letters}>Race: {name}</h2>
            <h2 className={CardStyle.letters}>Temperament/s: {temperament}</h2>
            <h2 className={CardStyle.letters}>Weight: ({weight})Kg </h2>
            </Link>
            
        </div>
    )
}