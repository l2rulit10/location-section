import React from 'react'
import Info from './Info'
import Form from './Form'
import Weather from './Weather'
import Popup from './popup'
const API_KEY = '5e36bdccb627cfff7bed2aef6b78954b'

class App extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {}
  }
  state = {
    temp:  undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    center: {
      lat: undefined,
      lng: undefined
    },
    lat: undefined,
    lon: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault()
    const city = e.target.elements.city.value
   if(city) {
    const api_url = await 
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    const data = await api_url.json()

    let sunset = data.sys.sunset
    let date = new Date()
    date.setTime(sunset)
    let sunsetDate = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    let temp = data.main.temp
    let round = Math.round(temp-273.15)
    
    this.setState({
      temp: round,
      city: data.name,
      country: data.sys.country,
      pressure: data.main.pressure,
      sunset: sunsetDate,
      center: {
              lat:  data.coord.lat,
              lng: data.coord.lon
            },
      lat: data.coord.lat,
      lon: data.coord.lon,
      error: undefined
    })
   } else {
      this.setState ({
        temp:  undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        center: {
                  lat: undefined,
                  lng: undefined
                },
        lat: undefined,
        lon: undefined,
        error: "Введите название города"
    })
   }
  }
  
  render () {
    return (
     <div>
      <Tabs
        selectedTab={this.state.selectedTab}
        onChangeTab={selectedTab => this.setState({ selectedTab })}
      >
        <Tab name='first' title='First tab'>
        <Popup />
        <div className="wrapper">
        <div className="main">
          <div className="conatiner">
	          <div className="row">
              <div className="col-sm-5">
                <div className="mapped">
                <Info 
                center={{ lat: this.state.lat, lng: this.state.lon }} />
                </div>
              </div>
		          <div className="col-sm-7 form">
              <Form weatherMethod={this.gettingWeather} />
              <Weather
                temp={this.state.temp}
                city={this.state.city}
                country={this.state.country}
                pressure={this.state.pressure}
                sunset={this.state.sunset}
                lat={this.state.lat}
                lon={this.state.lon}
                error={this.state.error}
                />
              </div>
	          </div>
          </div>
          </div>
      </div>
        </Tab>
        <Tab name='second' title='Second tab'>
          <p>Second content</p>
        </Tab>
        <Tab name='third' title='Third tab'>
          <p>Third content</p>
        </Tab>
      </Tabs>
     </div>
    )
  }
}
export default App
function Tabs ({ children, selectedTab, onChangeTab }) {
  let tabProps = []
  const content = React.Children.map(children, (child) => {
    if (child.type === Tab) {
      const { title, name } = child.props
      tabProps.push({ title, name })
      // By default show first tab if there is none selected
      if (selectedTab ? (selectedTab !== child.props.name) : (tabProps.length !== 1)) {
        return null
      }
    }
    return child
  })

  const finalSelectedTab = selectedTab ||
        (tabProps.length > 0 && tabProps[0].name)

  return (
    <div className='tabs'>
      <Tablist
        selectedTab={finalSelectedTab}
        onChangeTab={onChangeTab}
        tabs={tabProps}
      />
      <div className='tabs__content'>
        {content}
      </div>
    </div>
  )
}

function Tablist ({ tabs, selectedTab, onChangeTab }) {
  const linkClass = selected => {
    const c = 'tabs__tablist__link'
    return selected ? `${c} ${c}--selected` : c
  }

  return (
    <menu className='tabs__tablist'>
      <ul>
        {tabs.map(({ name, title }) =>
          <li aria-selected={name === selectedTab} role='tab' key={name}>
            <a
              className={linkClass(name === selectedTab)}
              onClick={() => onChangeTab(name)}
            >
              {title}
            </a>
          </li>
        )}
      </ul>
    </menu>
  )
}

function Tab ({ name, children }) {
  return (
    <div id={`tab-${name}`} className='tabs__tab'>
      {children}
    </div>
  )
}