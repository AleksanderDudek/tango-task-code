import Enzyme, { shallow, mount } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import HouseCard from "./components/HouseCard";
import House from "./models/House";

Enzyme.configure({ adapter: new Adapter() });


let container;

describe('House component ', () => {

  it('displays \'No words\' when houses lacks words', () => {
    const mockedHouse: House = {
      url: 'https://mehmme.url',
      name: 'string4',
      region: 'string3',
      coatOfArms: 'string2',
      words: '',
      titles: ['sir ser'],
      seats: ['doge', 'shiba'],
      currentLord: 'mana',
      heir: 'coins',
      overlord: 'rule',
      founded: 'some year',
      founder: 'some guy',
      diedOut: 'perhaps 123 Y',
      ancestralWeapons: [''],
      cadetBranches: ['jake', 'philip'],
      swornMembers: ['moon', 'cake', 'final', 'space'],
    }

    const container = shallow(<HouseCard currentHouse={mockedHouse} />);

    const words = container.find('#words').html();

    expect(words).toContain('No words');
  });

  it('displays \'No\' when a house is still alive', () => {
    const mockedHouse: House = {
      url: 'https://mehmme.url',
      name: 'string4',
      region: 'string3',
      coatOfArms: 'string2',
      words: 'asdasdasdasdasd',
      titles: ['sir ser'],
      seats: ['doge', 'shiba'],
      currentLord: 'mana',
      heir: 'coins',
      overlord: 'shiba',
      founded: 'some year',
      founder: 'some guy',
      diedOut: '',
      ancestralWeapons: [''],
      cadetBranches: ['jake', 'philip'],
      swornMembers: ['moon', 'cake', 'final', 'space'],
    }

    const container = shallow(<HouseCard currentHouse={mockedHouse} />);

    const diedOut = container.find('#diedOut').html();

    expect(diedOut).toContain('No');
  });

  it('displays \'No\' when houses lacks overlord', () => {
    const mockedHouse: House = {
      url: 'https://mehmme.url',
      name: 'string4',
      region: 'string3',
      coatOfArms: 'string2',
      words: 'Some words are appreciated',
      titles: ['sir ser'],
      seats: ['doge', 'shiba'],
      currentLord: 'mana',
      heir: 'coins',
      overlord: '',
      founded: 'some year',
      founder: 'some guy',
      diedOut: 'perhaps 123 Y',
      ancestralWeapons: [''],
      cadetBranches: ['jake', 'philip'],
      swornMembers: ['moon', 'cake', 'final', 'space'],
    }

    const container = shallow(<HouseCard currentHouse={mockedHouse} />);

    const overlord = container.find('#overlord').html();

    expect(overlord).toContain('No');
  });
});
