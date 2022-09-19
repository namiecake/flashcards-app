import React, { Component } from 'react';
import './App.css';
import Card from './Card/Card';
import Drawcard from './Drawcard/Drawcard';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

import { MYDB_CONFIG } from './Config/firebase/db_config';

class App extends Component {
  constructor(props) {
    super(props);

    this.app = firebase.initializeApp(MYDB_CONFIG);
    this.database = this.app.database().ref().child('cards');
    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [],
      currentCard: {}
    }
  }

  componentWillMount() {
    const currentCards = this.state.cards;
    
    this.database.on('child_added', snap => {
      currentCards.push({
        id: snap.key,
        term: snap.val().term,
        def: snap.val().def,
      })

      this.setState({
        cards: currentCards, 
        currentCard: this.getRandomCard(currentCards)
      })
    })
  }

  getRandomCard(currentCards){
    var card = currentCards[Math.floor(Math.random() * currentCards.length)];
    return card;
  }

  updateCard(){
    const currentCards = this.state.cards;
    this.setState({
      currentCard: this.getRandomCard(currentCards)
    })
  }

  render() {
    return (
      <div className="App">
        <div className="cardRow">
          <Card term={this.state.currentCard.term}
            def={this.state.currentCard.def}
          /> 
        </div>

        <div className="buttonRow">
          <Drawcard drawcard={this.updateCard} />
        </div>
      </div>
    );
  }
}

export default App;
