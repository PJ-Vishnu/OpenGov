import React, { useEffect, useState } from 'react';
import L, { HeatLayer } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat/dist/leaflet-heat.js';
import axios from 'axios';

function Dashboard() {
    const [heatData, setHeatData] = useState([]);
    const [markerLayer, setMarkerLayer] = useState(null);
    const [counts, setCounts] = useState({
        totalProjects: 0,
        contractedProjects: 0,
        tenderingProjects: 0,
        requestedProjects: 0
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:4000/projects/count');
                setCounts(response.data);
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function getReports() {
            try {
                const response = await axios.get('http://localhost:4000/reqProject/showRequests');
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

        const heatLayer = L.heatLayer(heatData.map(data => [data.location[0], data.location[1]]), { radius: 60 }).addTo(map); // Increase radius to 40 for larger heatmap points

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
            <div className="flex flex-col w-full h-screen">
                <div className="dashboard border-3 border-blue-900 rounded-3xl flex flex-col">
                    <b className="text-blue-900 text-3xl ml-3">Dashboard</b>
                    <div className="content flex flex-wrap justify-evenly p-6">
                        <div className="card w-64 h-64 p-3 bg-white border-2 border-blue-900 rounded-3xl m-3 flex justify-around"><b>Total Projects: <br /> <div className='text-center text-9xl text-cyan-800'>{counts.totalProjects}</div></b></div>
                        <div className="card w-64 h-64 p-3 bg-white border-2 border-blue-900 rounded-3xl m-3 flex justify-around"><b>Contracted Projects: <div className='text-center text-9xl text-lime-950'> {counts.contractedProjects}</div></b></div>
                        <div className="card w-64 h-64 p-3 bg-white border-2 border-blue-900 rounded-3xl m-3 flex justify-around"><b>Projects Tendering:<div className='text-center text-9xl text-yellow-600'> {counts.tenderingProjects}</div></b></div>
                        <div className="card w-64 h-64 p-3 bg-white border-2 border-blue-900 rounded-3xl m-3 flex justify-around"><b>Requested Projects:<div className='text-center text-9xl text-emerald-500'> {counts.requestedProjects}</div></b></div>
                    </div>
                </div>
                <div className="border-2 flex h-full flex-col border-blue-900 rounded-3xl m-3 p-3">
                    <b className="text-blue-900 text-3xl ml-3">Project Need Heatmap</b>
                    <div className="w-full h-[600px] rounded-2xl" id="heatmap-container"></div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
