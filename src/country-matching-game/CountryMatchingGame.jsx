import { useEffect, useState } from 'react'
import { countriesAndCapitals } from './DATA/countriesAndCapitals'
import '../App.css'

const getShuffledCountriesAndCapitalsList = ({ countriesAndCapitals = {} }) => {
  const countriesAndCapitalsList = Object.entries(countriesAndCapitals).flat()
  for (let i = 0; i < countriesAndCapitalsList.length; i++) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [countriesAndCapitalsList[i], countriesAndCapitalsList[randomIndex]] = [countriesAndCapitalsList[randomIndex], countriesAndCapitalsList[i]]
  }
  return countriesAndCapitalsList
}

const DELAY = 1000

function CountryMatchingGame() {
  const [countriesAndCapitalsList, setCountriesAndCapitalsList] = useState(getShuffledCountriesAndCapitalsList({ countriesAndCapitals }))
  const [selectedPlaces, setSelectedPlaces] = useState([])
  const [correctPlaces, setCorrectPlaces] = useState([]);
  // const [incorrectPlaces, setIncorrectPlaces] = useState([]);
  // useEffect(() => {
  //   if (selectedPlaces.length === 2) {
  //     const [place1, place2] = selectedPlaces.map(place => place.value)
  //     if (countriesAndCapitals[place1] === place2 || countriesAndCapitals[place2] === place1) {
  //       selectedPlaces.forEach(place => {
  //         place.style.borderColor = '#66cc99';
  //         // place.style.visibility = 'hidden';
  //         place.style.opacity = 0;
  //       })

  //       setTimeout(() => setCountriesAndCapitalsList(countriesAndCapitalsList => countriesAndCapitalsList.filter(place => ![place1, place2].includes(place))), 4000)

  //       setSelectedPlaces([])
  //     }
  //     else {
  //       selectedPlaces.forEach(place => place.style.borderColor = 'red')
  //       setSelectedPlaces([])
  //     }
  //   }
  // }, [selectedPlaces])


  const handlePlace = (e) => {
    const selectedPlace = e.target.getAttribute('data-value');
    // clicked other than country/capital
    if (!selectedPlace) return;
    if ((selectedPlaces[0] && selectedPlaces[0] === selectedPlace)) return alert('Don\'t select same place again!!')
    setSelectedPlaces((selectedPlaces) => ([...selectedPlaces, selectedPlace]));
    // if (selectedPlaces.length === 2) {
    //   if (countriesAndCapitals[selectedPlaces[0]] === selectedPlaces[1] || countriesAndCapitals[selectedPlaces[1]] === selectedPlaces[0]) {
    //     setCorrectPlaces(selectedPlaces)
    //   }
    // }
  }

  useEffect(() => {
    if (selectedPlaces.length === 2) {
      const [place1, place2] = selectedPlaces;
      if (countriesAndCapitals[place1] === place2 || countriesAndCapitals[place2] === place1) {
        setCorrectPlaces(selectedPlaces)
        setTimeout(() => {
          setCountriesAndCapitalsList(countriesAndCapitalsList => countriesAndCapitalsList.filter(place => ![place1, place2].includes(place)))
          setCorrectPlaces([])
          setSelectedPlaces([])
        }, 1000)
      }
      else {
        setTimeout(() => setSelectedPlaces([]), 1000)
      }
    }
  }, [selectedPlaces])

  return (
    <main onClick={handlePlace}>
      <section>
        {
          countriesAndCapitalsList.map(place => {
            const isSelected = selectedPlaces.includes(place)
            const [place1, place2] = selectedPlaces
            const isCorrect = selectedPlaces.length === 2 && [place1, place2].includes(place) && correctPlaces.includes(place)
            const isInCorrect = selectedPlaces.length === 2 && [place1, place2].includes(place) && !correctPlaces.includes(place)
            return (<button key={place} data-value={place} className={`button ${isSelected ? `selected` : ``} ${isCorrect ? `correct` : ``} ${isInCorrect ? `incorrect` : ``} })}`}>{place}</button>)
          })
        }
      </section>
      {
        countriesAndCapitalsList.length === 0 && <h1> Congratulations !! You won</h1>
      }


    </main>
  )
}

export default CountryMatchingGame
