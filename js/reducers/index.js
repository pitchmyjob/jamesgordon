import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import experiences from './experiences';
import educations from './educations';
import skills from './skills';
import interests from './interests';
import languages from './languages';

export default combineReducers({
  drawer,
  cardNavigation,
  experiences,
  educations,
  skills,
  interests,
  languages,
});
