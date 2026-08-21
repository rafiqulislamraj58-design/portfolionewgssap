
import { createBrowserRouter , RouterProvider } from "react-router";
import MainLayout from '../Layout/MainLayout';
import Home from '../components/Home';
import About from '../components/About';
import Skill from '../components/Skill';
import Contract from '../components/Contract';




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
        ]
    }
])

const Approute = () => {
  return (
     <RouterProvider router={router} />
  )
}

export default Approute