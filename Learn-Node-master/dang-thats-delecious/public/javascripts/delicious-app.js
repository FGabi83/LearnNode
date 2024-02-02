import '../sass/style.scss';

import { $, $$ } from './modules/bling'; //looks like jquery but it's not

import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead';

autocomplete( $('#address'), $('#lat'), $('#lng'));

typeAhead( $('.search') );