import '../sass/style.scss';

import { $, $$ } from './modules/bling'; //looks like jquery but it's not

import autocomplete from './modules/autocomplete';

autocomplete( $('#address'), $('#lat'), $('#lng'));