const methods = require('./methods')

const addMethod = function(Doc) {
  /**  */
  class Nouns extends Doc {}
  // add-in our methods
  Object.assign(Nouns.prototype, methods)

  Doc.prototype.nouns = function(n) {
    // don't split 'paris, france'
    let keep = this.match('(#City && @hasComma) (#Region|#Country)')
    // but split the other commas
    let m = this.not(keep).splitAfter('@hasComma')
    // combine them back together
    m = m.concat(keep)

    m = m.match('#Noun+ (of|by)? the? #Noun+?')
    //nouns that we don't want in these results, for weird reasons
    m = m.not('#Pronoun')
    m = m.not('(there|these)')
    m = m.not('(#Month|#WeekDay)') //allow Durations, Holidays
    // //allow possessives like "spencer's", but not generic ones like,
    m = m.not('(my|our|your|their|her|his)')
    m = m.not('(of|for|by|the)$')

    if (typeof n === 'number') {
      m = m.get(n)
    }
    return new Nouns(m.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
