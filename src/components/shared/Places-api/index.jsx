import React, { useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];

const GooglePlacesAutocomplete = ({ onPlaceSelect }) => {
  const containerRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const el = document.createElement("gmp-place-autocomplete");
    el.setAttribute("placeholder", "Type a city");
    el.setAttribute(
      "style",
      "width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px"
    );

    el.addEventListener("gmp-placeautocomplete-placechange", (event) => {
      const place = event.detail;
      const components = place.addressComponents;

      const getComp = (type) =>
        components?.find((c) => c.types.includes(type))?.longText || "";

      const city =
        getComp("locality") || getComp("administrative_area_level_2");
      const state = getComp("administrative_area_level_1");
      const country = getComp("country");
      const zip = getComp("postal_code");

      onPlaceSelect({ city, state, country, zip });
    });

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(el);
  }, [isLoaded, onPlaceSelect]);

  return <div ref={containerRef}></div>;
};

export default GooglePlacesAutocomplete;
