let url="https://api.wheretheiss.at/v1/satellites/25544"

let issLat = document.querySelector("#iss-lat")
let issLon = document.querySelector("#iss-lon")
let issMarker
var isscon = L.icon({
	iconUrl: "issIcon.png",
	iconSize: [50,50],
	iconAnchor: [25,25]
})

let map=L.map("iss-map").setView([0,0],1)
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',id:'mapbox.streets',accessToken: 'pk.eyJ1IjoiYXpoZHJha2UiLCJhIjoiY2sweThta2ZzMGRlYzNjbWl6a3NtOWZiOSJ9.3Uf0fpWgUzCmSZxHaVIu2w'}).addTo(map)



findISS()
setInterval(findISS,10000)
	
function findISS(){
	fetch(url)
		.then( (res) => res.json() )
		.then( (issData) => {
				console.log(issData)
				let lat = issData.latitude
				let lon = issData.longitude
				issLat.innerHTML = lat
				issLon.innerHTML = lon
				
				if (!issMarker){
					issMarker = L.marker([lat, lon], {icon: isscon}).addTo(map)
				} else {
					issMarker.setLatLng([lat, lon])
				}
		})
		.catch( err=> {
			console.log(err)
		}).finally( () =>{
			setTimeout(findISS, update, attempts)
		})
}