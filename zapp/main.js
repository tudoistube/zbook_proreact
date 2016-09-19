/*...바벨 사용 전, 주석 처리함.
var greeter = require('./zgreeter.js');
document.getElementById('root').appendChild(greeter());
*/

//...405p. 바벨 사용.
import React from 'react';
import {render} from 'react-dom';
import Zgreeter from './greeter';

render(<Zgreeter />, document.getElementById('root'));
