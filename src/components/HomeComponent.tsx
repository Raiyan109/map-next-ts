'use client'
import { AdvancedMarker, APIProvider, Map, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { useState } from 'react';

const HomeComponent = () => {
    const [open, setOpen] = useState(false)
    const position = {
        lat: 53.54,
        lng: 10
        // ⤵️ down lat lng is Dhaka
        // lat: 23.8041,
        // lng: 90.4152
    }
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