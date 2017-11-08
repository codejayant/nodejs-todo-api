const fs = require('fs');

// simple object creation
const simpleDataCreation = {
  name: 'jayant',
  age: 29,
  city: 'sf'
};

// object creation and then adding property value
const alternateSimpleDataCreation = {};
alternateSimpleDataCreation.name = 'jay';
alternateSimpleDataCreation.age = 29;
alternateSimpleDataCreation.country = 'us';

// constructor example
function Data(name, age) {
  this.name = name;
  this.age = age;
}
const data1 = new Data('old man', 100);
const data2 = new Data('turtle', 300);

// adding multiple objects in an array
const moreData = [];
moreData.push(simpleDataCreation);
moreData.push(alternateSimpleDataCreation);
moreData.push(data1);
moreData.push(data2);

fs.writeFile('test.txt', JSON.stringify(moreData, undefined, 2), (err) => {
  if (err) throw err;

  console.log('file saved');
});

// To append data in a file
// fs.appendFile('test.txt', JSON.stringify(simpleDataCreation, undefined, 2), (err) => {
//   if (err) throw err;
//
//   console.log('file appended');
// });
