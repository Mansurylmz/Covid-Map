import axios from "axios";

export const totalApi= axios.create({
    baseURL:'https://covid-19-statistics.p.rapidapi.com/reports',
    headers: {
        'x-rapidapi-key': 'c7e841179dmsh60ecd1c6b81154cp1aa3e5jsn11c26c90c500',
        'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com'
      }

})

export const detailApi= axios.create({
    baseURL:'https://covid-193.p.rapidapi.com',
    headers: {
        'x-rapidapi-key': 'c7e841179dmsh60ecd1c6b81154cp1aa3e5jsn11c26c90c500',
        'x-rapidapi-host': 'covid-193.p.rapidapi.com'
      }

})