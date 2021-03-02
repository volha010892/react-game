import React,  {useState, useEffect} from 'react'

export function Sample(){
  // useState React hook
  const [data, setData] = useState({})
  const [moreData, setMoreData] = useState([])
  const [volume, setVolume] = useState(1);
  // useState React hook
  useEffect(() => { 
    setData({test: "sample", user: "some person"})
    setMoreData(["test", "string"])
  }, [])

  return data, moreData
}

export const AppContext = React.createContext()
export const AppProvider = props => (
  <AppContext.Provider value={{ ...Sample() }}>
    {props.children}
  </AppContext.Provider>
)