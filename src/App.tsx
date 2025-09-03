import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NCCFlowsPage } from './pages/mediations/NCCFlowsPage'
import { ConvergentFlowsPage } from './pages/mediations/ConvergentFlowsPage'
import { ChargingGatewayFlowsPage } from './pages/mediations/ChargingGatewayFlowsPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<NCCFlowsPage />} />
          <Route path="/ncc-flows" element={<NCCFlowsPage />} />
          <Route path="/convergent-flows" element={<ConvergentFlowsPage />} />
          <Route path="/charging-gateway-flows" element={<ChargingGatewayFlowsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App