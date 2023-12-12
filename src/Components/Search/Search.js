import { AsyncPaginate } from "react-select-async-paginate"
import { useState } from "react"
import { GEO_API_URL, geoApiOptions } from "../../Api"

const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null)
    

    const loadOptions = (search) =>{
        return fetch(
            `${GEO_API_URL}?minPopulation=10000&namePrefix=${search}`,
            geoApiOptions
        )
            .then((response)=>response.json())
            .then((response)=>{
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
        .catch((err)=> console.error(err));
        }

    const handleOnChange = (searchData) => {
        setSearch(searchData)
        onSearchChange(searchData)
    }

    return(
        <AsyncPaginate
            placeholder ="Search for City"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}
export default Search