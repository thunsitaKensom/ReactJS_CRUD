import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

    constructor(props) {
        super(props);
        this.state = {
            book: {},
            key: ''
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('books').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    book: doc.data(),
                    key: doc.id,
                    isLoading: false
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    delete(id) {
        firebase.firestore().collection('books').doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
            this.props.history.push("/")
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4><Link to="/">Book List</Link></h4>
                        <h3 class="panel-title">
                            {this.state.book.name}
                        </h3>
                    </div>
                    <div class="panel-body">
                        <dl>
                            <dt>Detail:</dt>
                            <dd>{this.state.book.detail}</dd>
                            <dt>Author:</dt>
                            <dd>{this.state.book.author}</dd>
                        </dl>
                        <Link to={`/edit/${this.state.key}`}><button class="btn btn-success" disabled={!(this.state.book.detail && this.state.book.author)}>Edit</button></Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} disabled={!(this.state.book.detail && this.state.book.author)} class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Show;