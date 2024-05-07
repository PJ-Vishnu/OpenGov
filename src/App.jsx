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
import Govt_Dashboard from "./Govt/content/Govt_Dashboard"
import Govt_CompanyList from "./Govt/content/Govt_CompanyList"
import GovtTenderingProjectList from "./Govt/content/GovtTenderingProjectList"
import GovtProjectTenders from "./Govt/content/GovtProjectTenders"
import ViewTenderDetails from "./Govt/content/ViewTenderDetails"
import CompanyLayout from "./Company/CompanyLayout"
import CompanyViewProjectList from "./Company/Content/CompanyViewProjectList"
import CompanyTenderingProjectList from "./Company/Content/CompanyTenderingProjectList"
import CreateTender from "./Company/Content/CreateTender"
import CompanyOurProject from "./Company/Content/CompanyOurProject"
import ViewOurProjectDetails from "./Company/Content/ViewOurProjectDetails"
import RequestMoreFunds from "./Company/Content/RequestMoreFunds"
import ProjectListAdminGov from "./Components/ProjectListAdminGov"
import CreateProjectGov from "./Components/CreateProjectGov"
import CreateCompanyAdminP1 from "./Components/CreateCompanyAdminP1"
import CreateUserP1 from "./Components/CreateUserP1"
import UpdateProjectData from "./Company/Content/UpdateProjectData"
import CompanyNotifications from "./Company/Content/CompanyNotifications"
import GovtNotifications from "./Govt/content/GovtNotifications"

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
          <Route path="projects" element={<ProjectListAdminGov />} />
          <Route path="projects/newproject" element={<CreateProjectGov />} />
          <Route path="projects/viewproject/:id" element={<ViewProjectDetails />} />
          <Route path="projects/editproject/:id" element={<EditProjectDetailGov />} />
          <Route path="companies" element={<CompanyList />} />
          <Route path="companies/newcompany" element={<CreateCompanyAdminP1 />} />
          <Route path="companies/viewcompany" element={<ViewCompany />} />
          <Route path="companies/editcompany/:id" element={<EditCompanyP1 />} />
          <Route path="viewusers" element={<ViewUserList />} />
          <Route path="viewusers/newcitizen" element={<CreateUserP1 />} />
          <Route path="viewusers/editcitizen/:id" element={<EditCitizenP1 />} />
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
          <Route path="editprofile" element={<EditCitizenP1 />} />
          <Route path="/citizen/projects" element={<CitizenViewProjectList />} />
          <Route path="projects/viewproject/:id" element={<ViewProjectDetails />} />
          <Route path="projects/reportproject" element={<CitizenReportProject />} />
          <Route path="/citizen/interactions" element={<Citizen_Interactions />} />
          <Route path="/citizen/message" element={<Citizen_QueryReply />} />
        </Route>

        <Route path="/govt" element={<Govt_Layout />}>
          <Route path="" element={<Govt_Dashboard />} />
          <Route path="notification" element={<GovtNotifications />} />
          <Route path="projects" element={<ProjectListAdminGov />} />
          <Route path="projects/newproject" element={<CreateProjectGov />} />
          <Route path="projects/viewproject/:id" element={<ViewProjectDetails />} />
          <Route path="projects/editproject/:id" element={<EditProjectDetailGov />} />

          <Route path="tendering" element={<GovtTenderingProjectList />} />
          <Route path="tendering/project/:id" element={<GovtProjectTenders />} />
          <Route path="tendering/project/tenderdetails/:id" element={<ViewTenderDetails />} />


          <Route path="companies" element={<Govt_CompanyList />} />
          <Route path="companies/viewcompany/:id" element={<ViewCompany />} />

          <Route path="interactions" element={<InteractionList />} />
          <Route path="interactions/replycitizen" element={<ReplyCitizen />} />
        </Route>

        <Route path="/company" element={<CompanyLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="editprofile" element={<EditCompanyP1 />} />
          <Route path="notification" element={<CompanyNotifications />} />
          <Route path="Projects" element={<CompanyViewProjectList />} />
          <Route path="projects/viewproject/:id" element={<ViewProjectDetails />} />
          <Route path="tenderingprojects" element={<CompanyTenderingProjectList />} />
          <Route path="tenderingprojects/viewproject/:id" element={<ViewProjectDetails />} />

          <Route path="tenderingprojects/newtender/:id" element={<CreateTender />} />
          <Route path="ourproject/" element={<CompanyOurProject />} />
          <Route path="ourproject/viewproject" element={<ViewOurProjectDetails />} />
          <Route path="ourproject/viewproject/requestfunds" element={<RequestMoreFunds />} />
          <Route path="ourproject/viewproject/updateproject" element={<UpdateProjectData />} />

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