import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({ adapater: new Adapter() });

//How to use enzyme to test react https://www.robinwieruch.de/react-testing-tutorial/#react-enzyme-test-setup