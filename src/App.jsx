import "./One.css"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./admin/Layout"
import Content from "./admin/content/Content"
import LandingPageCitizen from "./LandingPage/content/LandingPageCitizen"
import ProjectList from "./Components/ProjectList"
import LandingLayout from "./LandingPage/LandingLayout"
import LandingPageGovt from "./LandingPage/content/LandingPageGovt"
import LandingPageCompany from "./LandingPage/content/LandingPageCompany"
import SignInPage from "./LandingPage/content/SignInPage"
import SignUpPage1 from "./LandingPage/content/SignUpPage1"
import SignUpPage2Citizen from "./LandingPage/content/SignUpPage2Citizen"
import CompanyList from "./Components/CompanyList"
import ViewProjectDetails from "./Components/ViewProjectDetails"
import EditProjectDetailGov from "./Components/EditProjectDetailGov"
import { Toaster } from "react-hot-toast"
import ViewUserList from "./Components/ViewCitizenList"
import ViewCompany from "./Components/ViewCompany"
import EditCompanyP1 from "./Components/EditCompanyP1"
import EditCitizenP1 from "./Components/EditCitizenP1"
import InteractionList from "./Components/InteractionList"
import ReplyCitizen from "./Components/ReplyCitizen"
import CitizenLayout from "./Citizen/CitizenLayout"
import Dashboard from "./Components/Dashboard"
import CitizenViewProjectList from "./Citizen/Content/CitizenViewProjectList"
import CitizenReportProject from "./Citizen/Content/CitizenReportProject"
import Citizen_Interactions from "./Citizen/Content/Citizen_Interactions"
import Citizen_QueryReply from "./Citizen/Content/Citizen_QueryReply"
import Govt_Layout from "./Govt/Govt_Layout"

// import Home from "./pages/Home"
// import Blogs from "./pages/Blogs"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="" element={<Content />} />
          {/* <Route path="companies" element={<Contact />} /> */}
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/viewproject" element={<ViewProjectDetails />} />
          <Route path="projects/editproject" element={<EditProjectDetailGov />} />
          <Route path="companies" element={<CompanyList />} />
          <Route path="companies/viewcompany" element={<ViewCompany />} />
          <Route path="companies/editcompany" element={<EditCompanyP1 />} />
          <Route path="viewusers" element={<ViewUserList />} />
          <Route path="viewusers/editcitizen" element={<EditCitizenP1 />} />
          <Route path="interactions" element={<InteractionList />} />
          <Route path="interactions/replycitizen" element={<ReplyCitizen />} />



        </Route>
        <Route path="/" element={<LandingLayout />}>
          <Route path="" element={<LandingPageCitizen />} />
          <Route path="govtlanding" element={<LandingPageGovt />} />
          <Route path="companylanding" element={<LandingPageCompany />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage1 />} />
          <Route path="/signupcitizen" element={<SignUpPage2Citizen />} />
        </Route>

        <Route path="/citizen" element={<CitizenLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="/citizen/projects" element={<CitizenViewProjectList />} />
          <Route path="projects/viewproject" element={<ViewProjectDetails />} />
          <Route path="projects/reportproject" element={<CitizenReportProject />} />
          <Route path="/citizen/interactions" element={<Citizen_Interactions />} />
          <Route path="/citizen/message" element={<Citizen_QueryReply />} />
        </Route>

        <Route path="/govt" element={<Govt_Layout />}>
          <Route path="" element={<Dashboard />} />
          
        </Route>


      </Routes>


      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </BrowserRouter>
  )
}
export default App