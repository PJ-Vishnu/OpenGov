import React, { useEffect, useState } from 'react';
import L, { HeatLayer } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat/dist/leaflet-heat.js';
import axios from 'axios';

function Content() {
    const [heatData, setHeatData] = useState([]);
    const [markerLayer, setMarkerLayer] = useState(null);

    useEffect(() => {
        async function getReports() {
            try {
                const response = await axios.get('https://opengov-server.onrender.com/reqProject/showRequests');
                const locationData = response.data.result.map(report => ({
                    location: report.location,
                    shortDescription: report.shortDescription,
                    detailedDescription: report.detailedDescription
                }));
                setHeatData(locationData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        getReports();
    }, []);

    useEffect(() => {
        const map = L.map('heatmap-container').setView([10.1632, 76.6413], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const heatLayer = L.heatLayer(heatData.map(data => [data.location[0], data.location[1]]), { radius: 40 }).addTo(map); // Increase radius to 40 for larger heatmap points

        // Add markers with popups
        console.log(heatData);
        const markers = heatData.map(data => {
            const marker = L.marker([data.location[0], data.location[1]]);
            marker.bindPopup(`<b>${data.shortDescription}</b><br>${data.detailedDescription}`);
            return marker;
        });

        const markerGroup = L.layerGroup(markers).addTo(map);
        setMarkerLayer(markerGroup);

        return () => {
            map.remove();
        };
    }, [heatData]);
    return (
        <div>
            {/* Content Side */}
            <div className="flex flex-col w-full h-[100vh] ">
                <div className="dashboard m-3 border-[3px] border-[#213361] rounded-[20px] flex flex-col">
                    <b className="text-[#213361] text-[28px] ml-3">Dashboard</b>
                    <div className="content m-3 flex flex-wrap justify-evenly">
                        <div className="card overflow-hidden margin-[10px] p-3 bg-white border-[2px] border-[#213361] h-72 w-72 m-3 rounded-[20px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium rem ab commodi odio illum, magni nisi officia vel, tempora eligendi accusamus quas possimus minima maiores voluptatem dolore, id laboriosam cum.  </div>
                        <div className="card overflow-hidden margin-[10px] p-3 bg-white border-[2px] border-[#213361] h-72 w-72 m-3 rounded-[20px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime facilis delectus consectetur dicta sapiente officia modi obcaecati officiis quibusdam, ipsam sint dignissimos praesentium numquam nam eos animi quisquam minus! Autem.</div>
                        <div className="card overflow-hidden margin-[10px] p-3 bg-white border-[2px] border-[#213361] h-72 w-72 m-3 rounded-[20px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas tempora beatae corporis, ratione quos exercitationem voluptatum, illum repellat similique expedita sequi accusamus ipsam minus ea odio inventore alias consectetur temporibus!</div>
                        <div className="card overflow-hidden margin-[10px] p-3 bg-white border-[2px] border-[#213361] h-72 w-72 m-3 rounded-[20px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, ad facere. Voluptatibus id at a voluptatum, voluptates alias cum neque deserunt accusantium dignissimos quibusdam provident. Ducimus pariatur quo facilis quas.</div>
                    </div>
                </div>
                <div className="border-2 flex flex-col border-blue-900 rounded-3xl m-3 p-3">
                    <b className="text-blue-900 text-3xl ml-3">Project Need Heatmap</b>
                    <div className="w-full h-96 rounded-2xl" id="heatmap-container"></div>
                </div>
            </div>
            {/* --------------- */}
        </div>
    )
}
export default Content