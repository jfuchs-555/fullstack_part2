import React from 'react'

const Filter = ({searchCriterion, handleSearchCriterion}) => {

    return (
    <form> 
      <div>
        filter <input value={searchCriterion} onChange={handleSearchCriterion}/>
      </div>
    </form>)
  }

  export default Filter;