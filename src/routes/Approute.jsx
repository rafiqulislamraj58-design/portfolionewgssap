
import { createBrowserRouter , RouterProvider } from "react-router";
import MainLayout from '../Layout/MainLayout';
import Home from '../components/Home';
import About from '../components/About';
import Skill from '../components/Skill';
import Contract from '../components/Contract';
import Project from "../components/Project";
import Resume from "../components/Resume";




const router =createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
              {
                path:"",
                element:<Home/>,
              },{
                path:"/about",
                element:<About/>,
              },{
                path:"/skill",
                element:<Skill/>,
              },{
                path:"/contact",
                element:<Contract/>
              }
              ,{
                path:"/project",
                element:<Project/>
              }
              ,{
                path:"/resume",
                element:<Resume/>
              }
        ]
    }
])

const Approute = () => {
  return (
     <RouterProvider router={router} />
  )
}

export default Approute