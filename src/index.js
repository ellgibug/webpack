import * as $ from 'jquery'

import Post from '@models/Post';
import json from './assets/json'
import image from './assets/image.jpg'
// import xml from './assets/data.xml'
// import csv from './assets/data.csv'
import './styles/styles.css'
import './styles/badscript.css'

const post = new Post('This is first post title', image);

console.log('Post to String', post.toString());
console.log('JSON', json);
// console.log('XML', xml);
// console.log('CSV', csv);

$('pre').addClass('code').html(post.toString());