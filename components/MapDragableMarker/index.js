import React, { useState, useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import { MapContainer, MapMenu, MapWrapper } from './style';

export default function DraggableMarkerMap() {
  const mapContainerRef = useRef(null);
  const [marker, setMarker] = useState({
    latitude: 53.5511,
    longitude: 9.9937,
  });
  const [style, setStyle] = useState("mapbox://styles/mapbox/outdoors-v12");

  useEffect(() => {
    mapContainerRef.current.innerHTML = '';

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_GL;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: style,
      center: [marker.longitude, marker.latitude],
      zoom: 5,
    });

    const mapMarker = new mapboxgl.Marker({
      draggable: true
    })
    .setLngLat([marker.longitude, marker.latitude])
    .addTo(map);

    mapMarker.on('dragend', function() {
      const lngLat = mapMarker.getLngLat();
      setMarker({
        longitude: lngLat.lng,
        latitude: lngLat.lat
      });
    });

    return () => map.remove();
  }, [style]);

  const handleStyleChange = (event) => {
    setStyle("mapbox://styles/mapbox/" + event.target.value);
  };

  return (
    <MapWrapper>
      <MapContainer ref={mapContainerRef} aria-label="Map" />
      <MapMenu id="menu" aria-label="Map Style Selector">
      <label>
          <input type="radio" name="mapStyle" value="outdoors-v12" checked={style === "mapbox://styles/mapbox/outdoors-v12"} onChange={handleStyleChange} aria-label="Outdoors Style" />
          Outdoors
        </label>
        <label>
          <input type="radio" name="mapStyle" value="satellite-streets-v12" checked={style === "mapbox://styles/mapbox/satellite-streets-v12"} onChange={handleStyleChange} aria-label="Satellite Streets Style" />
          Satellite Streets
        </label>
      </MapMenu>
    </MapWrapper>
  );
}
