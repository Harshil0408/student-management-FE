import { Route, Routes, useLocation } from "react-router-dom"
import { ROUTER } from "./utils/routes"
import Login from "./pages/Login"
import { Toaster } from 'sonner'
import AuthWrapper from "./components-main/AuthWrapper"
import Students from "./pages/Students"
import Sidebar from "./components-main/Sidebar"
import { TooltipProvider } from "./components/ui/tooltip"
import StudentDetails from "./pages/StudentDetails"

function App() {

  const location = useLocation()
  const pathname = location.pathname.slice(1)

  return (
    <div>
      <Toaster position="top-center" />
      <TooltipProvider>
        {
          pathname !== 'login' &&
          <Sidebar />
        }
        <Routes>
          <Route path={ROUTER.login} element={<Login />} />
          <Route element={<AuthWrapper />}>
            <Route path={ROUTER.students} element={<Students />} />
            <Route path={ROUTER.studentDetails} element={<StudentDetails />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </div>
  )
}

export default App
