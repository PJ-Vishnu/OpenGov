import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { GrNext,GrPrevious  } from "react-icons/gr";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/legacy/build/pdf.worker.min.js',
    import.meta.url,
).toString();

function ViewTenderDetails() {
    const { id } = useParams(); // Extracting the 'id' parameter from the URL
    const [tenderData, setTenderData] = useState();
    const [pdfUrl, setPdfUrl] = useState();
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/tenders/tenderDetails/${id}`);
                setTenderData(response.data.data);
                setPdfUrl(response.data.data.estimateFile); // Assuming the backend response includes the PDF file path
            } catch (error) {
                console.error('Error fetching tender data:', error);
            }
        };

        fetchData();
    }, [id]); // Add 'id' as a dependency to re-fetch data when 'id' changes

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    return (
        <div>
            {tenderData ? (
                <div>
                    <div className="flex flex-row">
                        <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-3/4 h-[50vh] text-2xl">
                            <b className="pl-3">Project ID:</b> {tenderData.projectId}<br /><br />
                            <b className="pl-3">Project Name:</b> {tenderData.projectName}<br /><br />
                            <b className="pl-3">Tender ID:</b> {tenderData._id}<br /><br />
                            <b className="pl-3">Company ID:</b> {tenderData.companyId}<br /><br />
                            <b className="pl-3">Company Name:</b> {tenderData.companyName}<br /><br />
                            <b className="pl-3">Total Budget:</b> &#8377; {tenderData.proposedBudget}<br /><br />
                            <b className="pl-3">Declared Budget:</b> &#8377; {tenderData.budget}<br /><br />
                            <br /><br />

                        </div>
                        <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-1/4 h-[50vh]">
                            {/* Placeholder content */}
                            <p className="text-center text-gray-600 mt-10">Additional Information</p>
                        </div>
                    </div>
                    <div className="border-[2px] border-[#213361] rounded-[20px] m-5  h-[100vh] p-3 text-xl h-fit flex flex-col">
                        <div className='text-xl'>
                            <b>Request Letter: </b>
                            <hr className='border border-[#213361] rounded-[20px]' /><br />
                            <p>{tenderData.requestLetter}</p><br />
                        </div>


                        {/* Placeholder content */}
                        <b className="">Tender Estimate:</b><hr className='border border-[#213361] rounded-[20px]' /><br />
                        <table className='border-2 border-[#213361] flex-1 flex-col w-max'>
                            <tbody>
                                <tr>
                                    <th className='border-2 border-[#213361] p-3'>Resource</th>
                                    <th className='border-2 border-[#213361] p-3'>Amount Required</th>
                                </tr>
                                {tenderData.tenderEstimate.map((estimate, index) => (
                                    <tr key={index}>
                                        <td className='border-2 border-[#213361] p-3'><b>{estimate.name}</b></td>
                                        <td className='border-2 border-[#213361] p-3 text-right'>&#8377; {estimate.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                        <b className='text-xl'>Estimate Document:</b>
                        <hr className='border border-[#213361] rounded-[20px]'/>
                        <br />
                        {pdfUrl && (
                            <div className='border-2 border-black w-fit flex justify-center flex-col text-center self-center'>
                                <Document
                                    file={`http://localhost:4000/${pdfUrl}`}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    <Page pageNumber={pageNumber} />
                                </Document>
                                <p>
                                    Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                                </p>
                                <div className='flex justify-center'>

                                    <button
                                        className='p-3 mr-3'
                                        type="button"
                                        disabled={pageNumber <= 1}
                                        onClick={previousPage}
                                    >
                                        <GrPrevious />
                                    </button>
                                    <button
                                        className='p-3 ml-3'
                                        type="button"
                                        disabled={pageNumber >= numPages}
                                        onClick={nextPage}
                                    >
                                        <GrNext />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ViewTenderDetails;
