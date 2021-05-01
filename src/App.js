import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";

import './styles/base/normalize.css'
import './styles/base/colors.css'
import './styles/general/body.css'
import './styles/general/box-sizing.css'
import './styles/general/images.css'
import './styles/general/links.css'
import './styles/components/nav.css'
import './styles/components/buttons.css'
import './styles/components/home/header.css'
import './styles/components/home/items-list.css'
import './styles/components/home/detail-modal.css'

function App() {
  return (
    <Router>

      <Nav />
      <Switch>
        <Route path="/"><Home /></Route>
      </Switch>

    </Router>
  );
}
export default App;
