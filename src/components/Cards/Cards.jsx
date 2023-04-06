import Card from '../Card/Card'
import CardsStyles from './Cards.module.css'
// import { useSelector } from 'react-redux'


export default function Cards({dogs}){
    //const dogs = useSelector((state) => state.showDogs)
    return(
        <div className={CardsStyles.cards}>
            {
                dogs.length > 0 ? dogs.map((dog, index) => {
                    return <Card
                        key={index}
                        id={dog.id}
                        image={dog.image}
                        name={dog.name}
                        temperament={dog.temperaments}
                        weight={dog.weight}
                        madeInDB={dog.madeInDB}
                    />
                }) : <div className={CardsStyles.No}>
                    <h2>No hay perros con esas especificaciones</h2>
                    <h3>Oprimir Boton Reset para quitar filtros</h3>
                </div>
            }
        </div>
    ) 
}