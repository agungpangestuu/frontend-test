import axios from 'axios'


var locationInBanten = [
    {
      id: 1,
      distance: "5 km",
      text: "Serpong Utara",
      lat: -6.258454,
      long: 106.6586052
    },
    {
      id: 2,
      distance: "5 km",
      text: "Cibodas",
      lat: -6.198982799999999,
      long: 106.5996595
    },
    {
      id: 3,
      distance: "5 km",
      lat: -6.3088649,
      long: 106.682188,
      text: "Serpong"
    },
    {
      id: 4,
      distance: "5 km",
      text: "Pondok Aren",
      lat: -6.2845749,
      long: 106.6974924
    },
    {
      id: 5,
      distance: "10 km",
      text: "Bintaro",
      lat: -8.5607671,
      long: 116.0731571
    },
    {
      id: 6,
      distance: "5 km",
      text: "Cipondoh",
      lat: -6.186115999999999,
      long: 106.682188
    },
    {
      id: 7,
      distance: "10 km",
      text: "Serang",
      lat: -6.110366099999998,
      long: 106.1639749
    },
    {
      id: 8,
      distance: "10 km",
      text: "Cilegon",
      lat: -6.0025343,
      long: 106.0111203
    },
    {
      id: 9,
      distance: "10 km",
      text: "Perumnas",
      lat: -6.0308573,
      long: 106.0601768
    },
    {
      id: 10,
      distance: "10 km",
      text: "Balaraja",
      lat: -6.203862900000001,
      long: 106.4464766
    },
    {
      id: 11,
      distance: "10 km",
      text: "Ciputat",
      lat: -6.307705700000001,
      long: 106.7175669
    },
    {
      id: 12,
      distance: "10 km",
      text: "Cikokol",
      lat: -6.2107244,
      long: 106.6320777
    },
    {
      id: 13,
      distance: "10 km",
      text: "Pamulang",
      lat: -6.3478915,
      long: 106.7411559
    },
    {
      id: 14,
      distance: "10 km",
      text: "Ciledug",
      lat: -6.236466699999999,
      long: 106.7057733
    },
    {
      id: 15,
      distance: "10 km",
      text: "Cinere",
      lat: -6.7461172, 
      long: 106.157379
    },
  ]

export function data(position) {
    var count = 0
    locationInBanten.forEach( (item, index) => {
        count+= 1
        let origin = {
            lat: position.coords.latitude,
            long: position.coords.longitude
          }
          let dest = {
            lat: item.lat,
            long: item.long
          }
          axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.long}&destinations=${dest.lat},${dest.long}&key=AIzaSyAjWOHPrXscmVtlGBYIsi6ZrvF8ZYydteI`)
          .then(({data}) => {
            item.locat = data.rows[0].elements[0].distance.text
          })
          .catch(err => console.log(err))
        // if (count === locationInBanten.length) return locationInBanten
    })
    return locationInBanten
}
 

