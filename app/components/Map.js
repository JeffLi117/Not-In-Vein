"use client"
import 'dotenv/config';
import Map from 'react-map-gl';

const MapComponent = () => {
    return <Map
                mapLib={import('mapbox-gl')}
                initialViewState={{
                longitude: -100,
                latitude: 40,
                zoom: 3.5
                }}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                style={{width: 400, height: 400}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            />;
}

export default MapComponent