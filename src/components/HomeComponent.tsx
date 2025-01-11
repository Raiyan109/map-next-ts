'use client'
import { AdvancedMarker, APIProvider, Map, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

type Place = {
    name: string;
    vicinity: string;
    location: google.maps.LatLng;
};

const HomeComponent = () => {
    const [open, setOpen] = useState(false)
    const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
    const [places, setPlaces] = useState<Place[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const position = {
        lat: 53.54,
        lng: 10
        // ⤵️ below lat lng is Dhaka
        // lat: 23.8041,
        // lng: 90.4152
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                console.error("Error fetching location", error);
            }
        );
    }, []);

    console.log(currentLocation);
    return (
        <div style={{ height: '100vh', width: '100%' }} className='p-10'>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
                <Map zoom={9} center={position} onClick={() => setOpen(true)}>
                    {/* <AdvancedMarker position={position}></AdvancedMarker> */}
                    {/* Show Map Pin */}
                    {/* <AdvancedMarker>
                        <Pin background={'grey'} borderColor={'green'} glyphColor={'purple'} />
                    </AdvancedMarker> */}
                </Map>
                {/* <Map zoom={9} center={position} mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}></Map> */}
                {open && <InfoWindow position={position} onCloseClick={() => setOpen(false)}><p>I am a Info Window</p></InfoWindow>}
            </APIProvider>
        </div>
    )
}

export default HomeComponent