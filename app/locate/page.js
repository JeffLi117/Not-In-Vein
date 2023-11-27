"use client"
import MapComponent from "../components/Map";
import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { setDefaults, geocode, RequestType }  from "react-geocode";
import 'dotenv/config';

setDefaults({
  key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY_1,
  language: "en", // Default language for responses.
  region: "es", // Default region for responses.
})
const mapContainerStyle = {
  height: "80%",
  width: "100%",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const MyMap = () => {
  const [libraries] = useState(['places']);
  const [zipCode, setZipCode] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false); 
  const [markers, setMarkers] = useState([]); // Track markers on the map
  const [selectedMarker, setSelectedMarker] = useState(null); // Track selected marker for info window
  const [toggleSelection, setToggleSelection] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 30.2666, lng: -97.7333 });

  useEffect(() => {
    console.log("selectedMarker is now ", selectedMarker);
  }, [selectedMarker])

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const updateMapCenter = (center) => {
    setMapCenter(center);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY_2,
    libraries,
    onLoad: () => setMapLoaded(true),
  });

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Inside the handleSearchBloodCenters function
const handleSearchBloodCenters = async (e) => {
    e.preventDefault();
  
    if (mapRef.current && zipCode.trim() !== "") {
      const zipCodePattern = /^[0-9]{5}$/;
      if (!zipCodePattern.test(zipCode)) {
        console.error("Invalid zip code. Please enter a valid US zip code.");
        return;
      }
  
      try {
        const response = await geocode(RequestType.ADDRESS, zipCode);
        if (response.results && response.results.length > 0) {
          setMarkers([]);
  
          const { lat, lng } = response.results[0].geometry.location;
          updateMapCenter({ lat, lng });
          // Set the center directly in the GoogleMap component
          mapRef.current.setZoom(12);
          getBloodDonationCenters({ lat, lng });
        } else {
          console.error("Geocode API did not return valid results:", response);
        }
      } catch (error) {
        console.error("Error converting zip code to coordinates:", error);
      }
    }
  };

  const getBloodDonationCenters = ({ lat, lng }) => {
    const request = {
      location: { lat, lng },
      radius: 40000, // 40km radius, ~25 mi
      keyword: "blood donation",
    };

    const service = new google.maps.places.PlacesService(mapRef.current);

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Process the results, e.g., display markers on the map
        for (let i = 0; i < results.length; i++) {
          const place = results[i];
        //   console.log("place/results[i] is ", place);
          const newMarker = new google.maps.Marker({
            position: place.geometry.location,
            map: mapRef.current,
            title: place.name,
            address: place?.vicinity,
          });
          // Add onClick functionality to each marker
          newMarker.addListener("click", () => {
            console.log(newMarker.title);
            setSelectedMarker(newMarker);
          });

          setMarkers((prevMarkers) => [...prevMarkers, newMarker])
        }
      } else {
        console.error("Error fetching blood donation centers:", status);
      }
    });
  };

  const windowFeatures = "noreferrer, noopener";

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return isLoaded ? (
    <form onSubmit={handleSearchBloodCenters} className="bg-red-200 h-screen flex flex-col justify-start items-center gap-2 p-2">
        <div className="flex justify-center items-center gap-2">
            <input
                type="text"
                placeholder="Enter Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                pattern="[0-9]{5}"
                title="Enter a valid 5 digit zip code"
                className="rounded-md p-2"
            />
            <button type="submit" className="w-fit p-2 rounded-md bg-red-500 font-semibold hover:text-white border border-transparent">Search Blood Donation Centers</button>
        </div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={mapCenter}
        options={options}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
            <div key={marker.position.toJSON().lat} onClick={() => handleMarkerClick(marker)}>
                {marker.title}
            </div>
        ))}
        {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.position.toJSON().lat,
                lng: selectedMarker.position.toJSON().lng,
              }}
              onCloseClick={() => {
                setSelectedMarker(null);
              }}
            >
                <div className="text-black orange-300 flex flex-col justify-center items-start gap-1">
                    <p className="font-medium">{selectedMarker.title}</p>
                    <p>{selectedMarker.address}</p>
                    <button className="transition text-white ease-in-out border border-2 border-black bg-black p-1 m-1 rounded-md hover:border-gray-700 hover:bg-gray-700"
                    onClick={() => window.open(`http://maps.google.com/?q=${selectedMarker.title}_${selectedMarker.address}`, '_blank', windowFeatures)}
                    >
                        Get Directions
                    </button>
                </div>
            </InfoWindow>
        )}
      </GoogleMap>
    </form>
  ) : (
    <div className="bg-red-200 h-screen">Loading...</div>
  );
};

export default MyMap;

// const LocatePage = () => {
//     const [userZip, setUserZip] = useState();
//     const [userLat, setUserLat] = useState();
//     const [userLong, setUserLong] = useState();
//     // const [nudgeShowing, setNudgeShowing] = useState(true);

//     const handleZipChange = (e) => {
//         setUserZip(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // You can add any additional logic here before submitting, if needed
//         console.log("Submitting userZip:", userZip);
//     };

//     // if (navigator.geolocation) {
//     //     console.log('Geolocation is supported!');
//     // } else {
//     //     console.log('Geolocation is not supported for this Browser/OS.');
//     // }

//     // const toggleNudge = () => {
//     //     setNudgeShowing(!nudgeShowing)
//     // }

//     const handleGPS = () => {
//         const options = {
//             enableHighAccuracy: true,
//             timeout: 5000,
//             maximumAge: 0,
//         };
        
//         function success(pos) {
//             const crd = pos.coords;
            
//             console.log("Your current position is:");
//             console.log(`Latitude : ${crd.latitude}`);
//             console.log(`Longitude: ${crd.longitude}`);
//             // console.log(`More or less ${crd.accuracy} meters.`);
//             setUserLat(crd.latitude);
//             setUserLong(crd.longitude);
//         }
        
//         function error(err) {
//             console.warn(`ERROR(${err.code}): ${err.message}`);
//         }
        
//         navigator.geolocation.getCurrentPosition(success, error, options);
//     }

//     return (
//         <div className="flex flex-col bg-red-200 h-screen p-4 justify-center items-center relative min-h-screen">
//             <div className="flex justify-center items-center gap-2">
//                 <button 
//                     className="text-xl py-1 px-2 rounded-md font-semibold bg-red-500 text-white"
//                     onClick={handleGPS}
//                 >
//                     Find near me
//                 </button>
//                 <div className="text-sm"> or </div>
//                 <form onSubmit={handleSubmit} className="flex justify-center items-center gap-2">
//                     <label htmlFor="zipcode" className="text-xl py-1 px-2 rounded-md font-semibold bg-red-500 text-white">Zip code</label>
//                     <input 
//                         type="text" 
//                         name="zipcode" 
//                         placeholder="Ex: 12345" 
//                         pattern="[0-9]{5}" 
//                         title="Five digit zip code" 
//                         onChange={handleZipChange} 
//                         className="rounded-md p-2"
//                     />
//                 </form>
//             </div>
//             <div className="p-4">
//                 <MapComponent 
//                     userLat={userLat}
//                     userLong={userLong}
//                 />
//             </div>
//         </div>
//     );
// }

// export default LocatePage