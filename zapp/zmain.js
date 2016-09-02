/*...바벨 사용 전, 주석 처리함.
var greeter = require('./zgreeter.js');
document.getElementById('root').appendChild(greeter());
*/

//...405p. 바벨 사용.
import React from 'react';
import {render} from 'react-dom';
import Zgreeter from './zgreeter';
//...409p. 스타일 시트 로더 사용.
import './zstyle.css';

render(<Zgreeter />, document.getElementById('root'));
