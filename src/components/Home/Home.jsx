import SearchBar from '../SearchBar/SearchBar'
import Cards from '../Cards/Cards'
import { useSelector, useDispatch } from 'react-redux'
import { getTemperaments, orderDogs, filterByOrigin, filterByTemps, getAllDogs, reset } from '../../Redux/actions'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HomeStyle from './Home.module.css'
import icon from '../../images/Perrito2.png'
import create from '../../images/91535 (1).png'
import loading from '../../images/gifdog.gif'
//import loading from '../../images/giphy.gif'



export default function Home(){

  const dispatch = useDispatch()
  const temps = useSelector((state) => state.temperaments)
  const dogs = useSelector((state) => state.showDogs)
  const [paginaActual, setPaginaActual] = useState(1)
  const [isLoading, setisLoading] = useState(false)
  const dogsForPage = 8;
  const lastDog = paginaActual * dogsForPage;
  const firstDog = lastDog - dogsForPage;
  const currentDogs = dogs.slice(firstDog, lastDog)

  const pageNumber = [];
  
  for (let i = 1; i <= Math.ceil(dogs.length / dogsForPage); i++) {
    pageNumber.push(i);
  }
  
  const paginado = (page) => {
    setPaginaActual(page)
  }
  
  useEffect(() => {
    dispatch(getTemperaments())
    dispatch(getAllDogs(setisLoading))
  }, [])
  
  
  const handleOrder = (event) => {
    dispatch(orderDogs(event.target.value))
    setPaginaActual(1)
  }
  const handlePrev = () => {
    if (paginaActual === 1) {
      setPaginaActual(1)
    } else{
      setPaginaActual(paginaActual - 1)
    }
  }
  const handleNext = () => {
    if (paginaActual === pageNumber.length) {
      setPaginaActual(paginaActual + 0)
    } else{

      setPaginaActual(paginaActual + 1)
    }
  }

  const handleByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value))
    setPaginaActual(1)
  }

  const handleByTemperament = (event) => {
    dispatch(filterByTemps(event.target.value))
    setPaginaActual(1)
  }

  const handleReset = () => {
    dispatch(reset())
    setPaginaActual(1)
    //window.location.reload()
  }

    return (
        <div className={HomeStyle.content}>
          
          
          <div className={HomeStyle.homeNav}>
            
              <button className={HomeStyle.navButton}>
                <Link to={`http://localhost:3000/`}><img className={HomeStyle.exitImg} src={icon} alt="" /></Link>
              </button>
              <button className={HomeStyle.navButton}>
                <Link to={'http://localhost:3000/create'}><img className={HomeStyle.create} src={create}/></Link>
              </button>
              <SearchBar setPaginaActual={setPaginaActual}/> 
          </div>
            <div className={HomeStyle.allFilters}>
              <div>
              <select className={HomeStyle.temps} multiple='multiple' onClick={handleByTemperament}>
                <option className={HomeStyle.filtersTitle} disabled='disabled'>Filter By</option>
                <option className={HomeStyle.tempsOps} value='AllTemps'>All Temperaments</option>
                {temps.map((temp, index) => <option className={HomeStyle.tempsOps} key={index} value={temp.name}>{temp.name}</option>)}
              </select>
              </div>
            <div className={HomeStyle.actualPage}>{paginaActual}</div>
              <div className={HomeStyle.orderTable}>


              <select className={HomeStyle.Order} multiple='multiple' onClick={handleOrder}>
                <option className={HomeStyle.filtersTitle} disabled='disabled'>Order</option>
                <option className={HomeStyle.tempsOps} value="ascendente">A-Z</option>
                <option className={HomeStyle.tempsOps} value="descendente">Z-A</option>
                <option className={HomeStyle.tempsOps} value="Weight max">Weight Max</option>
                <option className={HomeStyle.tempsOps} value="Weight min">Weight Min</option>
              </select>

              <select className={HomeStyle.Order} multiple='multiple' onClick={handleByOrigin}>
                <option className={HomeStyle.filtersTitle} disabled='disabled'>Origin</option>
                <option className={HomeStyle.tempsOps} value="AllDogs">AllDogs</option>
                <option className={HomeStyle.tempsOps} value="Api">App's Dogs</option>
                <option className={HomeStyle.tempsOps} value="Data">My Puppies</option>
              </select>
              </div>
              <button className={HomeStyle.reset}  onClick={handleReset}>Reset</button>
            </div>
            <button onClick={handlePrev} className={HomeStyle.prev}>--Prev--</button>
            <nav className={HomeStyle.page}>
                {pageNumber.map((number, key) => <div key={key} className={HomeStyle.pageNumbers} onClick={() => paginado(number)}><p >{number}</p></div>)}
            </nav>
            <button onClick={handleNext} className={HomeStyle.next}>--Next--</button>
            
            {!isLoading ? <img className={HomeStyle.loading} src={loading}/> : <Cards dogs={currentDogs}/>}
        </div>
    )
}