import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Entries = ({countries,showDetails}) => {
  if (Object.keys(countries).length > 10) {
  console.log('got to here')
    return (
      <div>Please Specify Further</div>
    )
  }

  else return (
    <div>
    <ul>
        {countries.map((country,i) => 
        <li key={i}> {country.name} 
          <button onClick={()=> {showDetails(country) }} > {country.name} </button> 
        </li>)}
    </ul>
    </div>

  )
 
}


const Details = ({detailsDisplay,button,setButton}) => {
  console.log('xxxxxxrRR', Object.keys(detailsDisplay).length)
  console.log('buh',detailsDisplay)
  console.log('p',button)
  if (Object.keys(detailsDisplay).length !== 1 || button==='false') {
    return( <div>nothing selected</div>)
  }
  if (Object.keys(detailsDisplay).length > 0 && button==='true'){  
    
  console.log('languages input',detailsDisplay[0]['languages'])
  var languages = detailsDisplay[0]['languages']
  console.log('languages input',languages)
    return (
      <div>
      <ul>
        <li>Capital: {detailsDisplay[0].name} </li>
        <li>Alpha2Code: {detailsDisplay[0].alpha2Code} </li>
        <li>Region: {detailsDisplay[0].region} </li>
        <li> Languages
            <ul>
            {languages.map((key,item) => <li> {key.name} </li>  )}
            </ul>


        </li>
        {/* <li>Languages:
          <ul>
          .map ( {Object.keys({detailsDisplay[0]['languages']}}  <li>  </li>)}
          </ul> */}
          
        </ul> 
    
    </div> 
    )
   
  }
  if (Object.keys(detailsDisplay).length > 0 ) 
  { return( <div> exception </div>)}
}


const App = () => {
  const [ searchCriterion, setSearchCriterion ] = useState('')
  const [ countries, setCountries ] =useState([])
  const [ details, setDetails ] = useState('')
  const [button, setButton] = useState('')

  const handleSearchCriterion = (event) => {
    console.log(event.target.value)
    setSearchCriterion(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
        console.log('promise fulfilled')
        if (searchCriterion !=="") {
          var searchResult = response.data.filter(country => country.name.toLowerCase().includes(searchCriterion.toLowerCase()));
        setCountries(searchResult);
       
        console.log(countries)
        console.log('xxxx',Object.keys(countries).length)
        
      }} )
  }, [searchCriterion])

  

  const showDetails = (event) => {
    console.log('clicked name', event.name)
    setDetails(event.name)
    const buttonvalue = "true"
    setButton(buttonvalue)
    console.log('I have passed here', button)
    detailsDisplay = detailsDisplay[0]
    console.log('DetailsDisplay', detailsDisplay)

  };

  var detailsDisplay = countries.filter((p) => ( p.name === details));
  

  return (
    <div>
    <div className="App">
      find countries <input value={searchCriterion} onChange={handleSearchCriterion} />
    </div>
    <Entries countries={countries} showDetails = {showDetails}/>
    <div>
      <h1> Details </h1>
      <Details detailsDisplay ={detailsDisplay} button={button} setButton={setButton} />
    </div>
    </div>
  );
}

export default App;
