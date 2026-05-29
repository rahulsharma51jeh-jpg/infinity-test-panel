import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Generator from "./pages/Generator";
import TestRunner from "./pages/TestRunner";
import Results from "./pages/Results";
import Pyq from "./pages/Pyq";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";
import About from "./pages/About";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/generate" element={<Generator />} />
        <Route path="/test/:id" element={<TestRunner />} />
        <Route path="/results" element={<Results />} />
        <Route path="/pyq" element={<Pyq />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}
