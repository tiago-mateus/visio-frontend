import { Route, Routes } from "react-router-dom";
import { Presentation } from "./pages/Presentation";
import { Control } from "./pages/Control";
import { Canticos } from "./pages/Canticos";

export function Router(){
    return (
        <Routes>
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/control" element={<Control />} />
            <Route path="/canticos" element={<Canticos />} />
        </Routes>
    )
}