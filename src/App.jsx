/* eslint-disable no-unused-vars */
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import CreateQuiz from './faculty/CreateQuiz';
import AddQuestions from './faculty/AddQuestions';
import Syllabus from './admin/curriculum/Syllabus';
import StudentsUpload from './admin/students/StudentsUpload';
import CheckAnswers from './faculty/CheckAnswers';
import RequireAuth from './components/RequireAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './layout/Layout';
import Dashboard from './layout/Dashboard';


function App() {

  const queryClient = new QueryClient()

  const Roles = {
    "Admin": 1,
    "Faculty": 2
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Layout />}> 
            <Route index element={<Dashboard />} />
            <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
              <Route path='upload-students' element={<StudentsUpload />} />
              <Route path='syllabus' element={<Syllabus />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[Roles.Faculty]} />}>
              <Route path='create-quiz' element={<CreateQuiz />} />
              <Route path='add-questions' element={<AddQuestions />} />
              <Route path='answers' element={<CheckAnswers />} />
            </Route>

          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
