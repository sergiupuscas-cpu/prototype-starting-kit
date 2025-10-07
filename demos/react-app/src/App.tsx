import { Routes, Route } from 'react-router-dom';
import DemoLayout from './DemoLayout';
import ComponentsShowcase from './ComponentsShowcase';
import VehicleDetailsDemo from './demos/VehicleDetailsDemo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DemoLayout />}>
        <Route index element={<ComponentsShowcase />} />
        <Route path="vehicle-details/:id" element={<VehicleDetailsDemo />} />
        <Route path="vehicle-details" element={<VehicleDetailsDemo />} />
      </Route>
    </Routes>
  );
}

export default App;
