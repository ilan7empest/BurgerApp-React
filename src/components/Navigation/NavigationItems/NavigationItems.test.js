import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import { NavLink } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('<NavigationItems Test />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two <NavigationItems /> elements if NOT auth', () => {
    expect(wrapper.find(NavLink)).toHaveLength(2);
  });
  it('should render three <NavigationItems /> elements if auth', () => {
    //wrapper = shallow(<NavigationItems isAuth />);
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavLink)).toHaveLength(3);
  });
  it('should render Logout <NavigationItems /> element if auth', () => {
    wrapper.setProps({ isAuth: true });
    expect(
      wrapper.contains(
        <NavLink to='/logout' className='nav-link'>
          Logout
        </NavLink>
      )
    ).toEqual(true);
  });
});
