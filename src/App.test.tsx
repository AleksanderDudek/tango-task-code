import ReactDOM from "react-dom";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });


import App from './App';

let container;

// //setup
// beforeEach(() => {
//   container = document.createElement('div');
//   document.body.appendChild(container);
// });

// //cleanup
// afterEach(() => {
//   document.body.removeChild(container);
//   container = null;
// });



it("renders withour crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);});

it("renders progress when characters and houses", () => {
  const wrapper = mount(<App />);

  const progress = wrapper.find('#progressSpinne');
  
  expect(progress).toBeTruthy();
});

// it("renders table when characters and houses are loaded", () => {
//   const { container } = render(<App />);
//   const charactersTable = getByTestId(container, "charactersTable");
//   expect(container).toBeTruthy();
// });