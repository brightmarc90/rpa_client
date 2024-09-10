/* eslint-disable react/prop-types */
import { useState } from "react"
import UseFetchSchools from "../../hooks/UseFetchSchools"
import UseFetchSubjects from "../../hooks/UseFetchSubjects"
import UseFetchTrainers from "../../hooks/UseFetchTrainers"

function InvoiceFilters({applyFilters}) {
    const {schools} = UseFetchSchools()
    const {trainers} = UseFetchTrainers()
    const {subjects} = UseFetchSubjects()
    const [searchBy, setSearchBy] = useState(false) // par défaut c'est l'année
    const [filters, setFilters] = useState({
        school: "",
        trainer: "",
        subject: "",
        year: "",
        start_date: "",
        end_date: ""
    })

    const handleSearchBy = (event) => {
        if(event.target.value == "year") {
            setFilters({...filters, start_date: ""})
            setFilters({...filters, end_date: ""})
            setSearchBy(false)
        }else{
            setFilters({...filters, year: ""})
            setSearchBy(true)
        }
    }

    const handleChange = (event) => {
        setFilters({...filters, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        applyFilters(filters)
    }

    return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="school">Ecoles</label>
                <select name="school" id="school" onChange={handleChange} value={filters.school}>
                    <option value="">&nbsp;</option>
                    {
                        schools && schools.map((school, index) => (
                            <option key={index} value={school.id}>{school.name}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <label htmlFor="trainer">Formateurs</label>
                <select name="trainer" id="trainer" onChange={handleChange} value={filters.trainer}>
                    <option value="">&nbsp;</option>
                    {
                        trainers && trainers.map((trainer, index) => (
                            <option key={index} value={trainer.id}>{trainer.name}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <label htmlFor="subject">Matières</label>
                <select name="subject" id="subject" onChange={handleChange} value={filters.subject}>
                    <option value="">&nbsp;</option>
                    {
                        subjects && subjects.map((subject, index) => (
                            <option key={index} value={subject.id}>{subject.name}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <input type="radio" value="year" name="search_by" id="search_by_year" onChange={handleSearchBy}/> <label htmlFor="search_by_year">Année</label>
                <input type="radio" value="range" name="search_by" id="search_by_range" onChange={handleSearchBy}/> <label htmlFor="search_by_range">Période</label> 
            </div>
            {
                !searchBy && 
                <div>
                    <label htmlFor="year">Année</label>
                    <input type="number" name="year" id="year" min="1990" step="1" onChange={handleChange} value={filters.year}/>
                </div>
            }
            {
                searchBy && 
                <div>
                    <div>
                        <label htmlFor="start_date">Date début</label>
                        <input type="date" name="start_date" id="start_date" onChange={handleChange} value={filters.start_date}/>
                    </div>
                    <div>
                        <label htmlFor="end_date">Date fin</label>
                        <input type="date" name="end_date" id="end_date" onChange={handleChange} value={filters.end_date} />
                    </div>
                </div>
            }
            <input type="submit" value="Appliquer"/>
        </form>
    </div>
  )
}

export default InvoiceFilters