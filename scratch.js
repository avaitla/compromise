var nlp = require('./src/index');
// nlp.verbose('tagger');

// var doc = nlp('in north africa, eastern asia, guatemala, europe, north america, and japan');
// doc.places().debug();

let doc = nlp('i went to the pool. I went to the party.');
// console.log(doc.text());
console.log(doc);
// console.log(doc.nouns());
