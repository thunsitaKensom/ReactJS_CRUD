import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('books');
    this.unsubscribe = null;
    this.state = {
      books: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const books = [];
    querySnapshot.forEach((doc) => {
      const { name, detail, author } = doc.data();
      books.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        detail,
        author,
      });
    });
    this.setState({
      books
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BOARD LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create">Add Board</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Detail</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map(board =>
                  <tr>
                    <td><Link to={`/show/${board.key}`}>{board.name}</Link></td>
                    <td>{board.detail}</td>
                    <td>{board.author}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;