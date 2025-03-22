import logo from './logo.svg';
import './App.css';
import { PersonaService } from './service/PersonaService';

export default class App extends Component{
  constructor(){
    super();
    this.setState({
      personas: []
    }); 
    this.personaService = new PersonaService();

  }
  componentDidMount(){
    this.personaService.getAll().then(data => {
      console.log(data);
    })
  }
  render(){
    return (
      <h1>Hola mundo</h1>
    );
  }
}

