'use client'
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

type Place = {
    name: string;
    vicinity: string;
    location: google.maps.LatLng;
};


const HomeComponent2 = () => {
    const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
    const [places, setPlaces] = useState<Place[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

    const mapContainerStyle = {
        width: "100vw",
        height: "100vh",
    };

    const fetchNearbyPlaces = (map: google.maps.Map, service: google.maps.places.PlacesService) => {
        const request: google.maps.places.PlaceSearchRequest = {
            location: currentLocation,
            radius: 1500,
            type: ["restaurant"],
        };

        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                const mappedPlaces = results.map((result) => ({
                    name: result.name || "Unknown",
                    vicinity: result.vicinity || "Unknown",
                    location: result.geometry?.location as google.maps.LatLng,
                }));
                setPlaces(mappedPlaces);
            }
        });
    };

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

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string} libraries={["places"]}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={currentLocation}
                zoom={14}
                onLoad={(map) => {
                    const service = new google.maps.places.PlacesService(map);
                    fetchNearbyPlaces(map, service);
                }}
            >
                <Marker position={currentLocation} title="You are here" />
                {places.map((place, index) => (
                    <Marker
                        key={index}
                        position={{ lat: place.location.lat(), lng: place.location.lng() }}
                        onClick={() => setSelectedPlace(place)}
                    />
                ))}
                {selectedPlace && (
                    <InfoWindow
                        position={{
                            lat: selectedPlace.location.lat(),
                            lng: selectedPlace.location.lng(),
                        }}
                        onCloseClick={() => setSelectedPlace(null)}
                    >
                        <div className="p-4">
                            <h3 className="text-lg font-bold">{selectedPlace.name}</h3>
                            <p className="text-sm">{selectedPlace.vicinity}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    )
}

export default HomeComponent2