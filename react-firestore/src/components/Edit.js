import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: '',
            name: '',
            detail: '',
            author: ''
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('books').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const book = doc.data();
                this.setState({
                    key: doc.id,
                    name: book.name,
                    detail: book.detail,
                    author: book.author
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({ book: state });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, detail, author } = this.state;

        const updateRef = firebase.firestore().collection('books').doc(this.state.key);
        updateRef.set({
            name,
            detail,
            author
        }).then((docRef) => {
            this.setState({
                key: '',
                name: '',
                detail: '',
                author: ''
            });
            this.props.history.push("/show/" + this.props.match.params.id)
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            EDIT BOOK
            </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Book List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="name">Name:</label>
                                <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name" />
                            </div>
                            <div class="form-group">
                                <label for="detail">Detail:</label>
                                <input type="text" class="form-control" name="detail" value={this.state.detail} onChange={this.onChange} placeholder="Detail" />
                            </div>
                            <div class="form-group">
                                <label for="author">Author:</label>
                                <input type="text" class="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author" />
                            </div>
                            <button type="submit" class="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;