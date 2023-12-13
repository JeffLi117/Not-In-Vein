"use client"
import 'dotenv/config';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

const MapComponent = ({ userLat, userLong }) => {
    
    return <div>
            {userLat && userLong ? 
                <Map
                    mapLib={import('mapbox-gl')}
                    initialViewState={{
                        longitude: userLong,
                        latitude: userLat,
                        zoom: 1
                    }}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                    style={{width: 400, height: 400}}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                /> : 
                <Map
                    mapLib={import('mapbox-gl')}
                    initialViewState={{
                        longitude: -100,
                        latitude: 40,
                        zoom: 3.5
                    }}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                    style={{width: 400, height: 400}}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                />
            }
            </div> 
    
}

export default MapComponent