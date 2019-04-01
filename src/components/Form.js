import React from 'react'
// import Autocomplete from 'react-google-autocomplete'
const Form = props => (
  <div>
    <form onSubmit={props.weatherMethod}>
      <input type='text' name='city' placeholder='Город' />
      <button>Полуить погоду</button>
    </form>
  </div>
)

export default Form
