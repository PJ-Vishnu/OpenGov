import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat/dist/leaflet-heat.js';

function Dashboard() {
    useEffect(() => {
        const map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const heatData = [
            [51.5, -0.09, 500],
            [51.5, -0.095, 50],
            [51.51, -0.1, 0.5],
            [51.49, -0.1, 0.2]
            // Add more data points as needed
        ];

        // Add markers for each data point
        heatData.forEach(point => {
            L.marker([point[0], point[1]]).addTo(map);
        });

        L.heatLayer(heatData, { radius: 20 }).addTo(map);

        return () => {
            map.remove();
        };
    }, []);

    return (
        <div>
            <div className="flex flex-col w-full h-screen">
                <div className="dashboard border-3 border-blue-900 rounded-3xl flex flex-col">
                    <b className="text-blue-900 text-3xl ml-3">Dashboard</b>
                    <div className="content flex flex-wrap justify-evenly p-6">
                        <div id="map" className="w-full h-96"></div>
                        <div className="card w-72 h-72 p-3 bg-white border-2 border-blue-900 rounded-3xl m-3">total Project count</div>
                        <div className="card w-72 h-72 p-3 bg-white border-2 border-blue-900 rounded-3xl m-3">all Projects, total, active, completed</div>
                        <div className="card w-72 h-72 p-3 bg-white border-2 border-blue-900 rounded-3xl m-3">projects tendering and contracted</div>
                        <div className="card w-72 h-72 p-3 bg-white border-2 border-blue-900 rounded-3xl m-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, ad facere. Voluptatibus id at a voluptatum, voluptates alias cum neque deserunt accusantium dignissimos quibusdam provident. Ducimus pariatur quo facilis quas.</div>
                    </div>
                </div>
                <div className="border-2 border-blue-900 rounded-3xl m-3">
                    <b className="text-blue-900 text-3xl ml-3">Project Need Heat map</b>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
