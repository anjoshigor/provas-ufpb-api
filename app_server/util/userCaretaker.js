class UserCaretaker {
  constructor(initialState) {
    this._states = initialState;
  }

  addUserMemento(memento) {
    this._states.push(memento);
  }

  getLastSavedState() {
    // preservando o estado inicial do banco
    if(this._states.length==1)
      return this._states[0];
    else
      return this._states.pop();
  }
}
module.exports = UserCaretaker;