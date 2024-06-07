import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios"; // Import Axios
import "mapbox-gl/dist/mapbox-gl.css"; // Ensure Mapbox GL CSS is imported

function RequestProject() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    zoom: 10
  });
  const [markers, setMarkers] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [shortDescription, setShortDescription] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchText) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            searchText
          )}.json?access_token=pk.eyJ1IjoidmlzaG51Njg5IiwiYSI6ImNsd3JvNXlpYjAyNmsya3Nkcjl4amYxaGYifQ.biSDr-AcwtOU8kSzQU-3PA`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data.features) {
          setSuggestions(data.features.map((feature) => feature.place_name));
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const handleSearch = async () => {
    if (!searchText) return;
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchText
        )}.json?access_token=pk.eyJ1IjoidmlzaG51Njg5IiwiYSI6ImNsd3JvNXlpYjAyNmsya3Nkcjl4amYxaGYifQ.biSDr-AcwtOU8kSzQU-3PA`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        setViewport({
          ...viewport,
          latitude,
          longitude,
          zoom: 15
        });
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClickMap = (event) => {
    const newMarker = event.lngLat;
    setMarkers([newMarker]);
  };

  const handleMarkerClick = (marker) => {
    setPopupInfo(marker);
  };

  const handleClosePopup = () => {
    setPopupInfo(null);
  };

  const handleViewportChange = (newViewport) => {
    setViewport(newViewport);
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = e.target.files;
    setFiles([...files, ...uploadedFiles]);
  };

  const handleSubmit = async () => {
    try {
      console.log(markers[0].lng);
      const formData = new FormData();
      formData.append("shortDescription", shortDescription);
      formData.append("detailedDescription", detailedDescription);
      formData.append("files", files);
      formData.append("longitude", markers[0].lng,);
      formData.append("latitude", markers[0].lat);
      console.log(formData.latitude+"--------"+formData.longitude);
      await axios.post("http://localhost:4000/reqProject/requestProject", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="h-full w-full flex-1 m-3">
      <div className="h-9 w-fit m-5 rounded-full flex border-2 gap-3">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for a location"
          className="rounded-full p-3"
        />
        <button className="place-self-end" onClick={handleSearch}>Search</button>
      </div>
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => setSearchText(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <div className="h-3/4 w-full">
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={'pk.eyJ1IjoidmlzaG51Njg5IiwiYSI6ImNsd3JvNXlpYjAyNmsya3Nkcjl4amYxaGYifQ.biSDr-AcwtOU8kSzQU-3PA'}
          onViewportChange={handleViewportChange}
          onClick={handleClickMap}
          dragPan={true}
          scrollZoom={true}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              longitude={marker.lng}
              latitude={marker.lat}
              offsetLeft={-20}
              offsetTop={-10}
            ></Marker>
          ))}

          {popupInfo && (
            <Popup
              latitude={popupInfo.lat}
              longitude={popupInfo.lng}
              onClose={handleClosePopup}
              closeButton
              closeOnClick={false}
              anchor="top"
            >
              <div>
                This is the popup for marker at {popupInfo.lat}, {popupInfo.lng}
              </div>
            </Popup>
          )}
        </ReactMapGL>
      </div>
      <div className="h-fit flex flex-col m-3">
      <b>Short Description</b>
        <input
          type="text"
          placeholder="Short Description"
          className="border-2 rounded-full h-9 pl-3"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />
        <br />
        <b>Detailed Description</b>
        <textarea
          placeholder="Detailed Description"
          className="border-2 rounded-full h-9 pl-3"
          value={detailedDescription}
          onChange={(e) => setDetailedDescription(e.target.value)}
        ></textarea>
        <br />
        <b>Files</b>
        <input
          type="file"
          className="border-2 rounded-full h-9 pl-3"
          multiple
          onChange={handleFileUpload}
        />
        <br />
        <button className="self-center rounded-2xl text-white w-fit p-3 bg-[#213361]" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default RequestProject;
