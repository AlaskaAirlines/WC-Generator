// Used for bundling for legacy browsers

// this needs to be imported before WC polyfills to prevent "Out of stack space" errors in IE
import 'core-js/es/symbol';
import 'whatwg-fetch';

import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import './[namespace]-[name]';
