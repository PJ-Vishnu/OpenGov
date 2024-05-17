function Dashboard() {
    return (
        <div>
            {/* Content Side */}
            <div className="flex flex-col w-full h-[100vh] ">
            <div className="dashboard m-3 border-[3px] border-[#213361] rounded-[20px] flex flex-col">
      <b className="text-[#213361] text-[28px] ml-3">Dashboard</b>
      <div className="content m-3 flex flex-wrap justify-evenly">
        <div className="card overflow-hidden margin-[10px] p-3 bg-white border-[2px] border-[#213361] h-72 w-72 m-3 rounded-[20px]">total Project count</div>
        <div className="card overflow-hidden margin-[10px] p-3 bg-white border-[2px] border-[#213361] h-72 w-72 m-3 rounded-[20px]">all Projects, total, actove, completed</div>
        <div className="card overflow-hidden margin-[10px] p-3 bg-white border-[2px] border-[#213361] h-72 w-72 m-3 rounded-[20px]">projects tendering and contracted</div>
        <div className="card overflow-hidden margin-[10px] p-3 bg-white border-[2px] border-[#213361] h-72 w-72 m-3 rounded-[20px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, ad facere. Voluptatibus id at a voluptatum, voluptates alias cum neque deserunt accusantium dignissimos quibusdam provident. Ducimus pariatur quo facilis quas.</div>
      </div>
    </div>
                <div className="m-3 flex flex-col h-[87vh] border-[2px] border-[#213361] rounded-[20px]">
                    <b className="text-[#213361] text-[28px] ml-3">Analytics</b>
                </div>
            </div>
            {/* --------------- */}
        </div>
    )
}
export default Dashboard