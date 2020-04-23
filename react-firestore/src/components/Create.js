import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

    constructor() {
        super();
        this.ref = firebase.firestore().collection('books');
        this.state = {
            name: '',
            detail: '',
            author: ''
        };
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, detail, author } = this.state;

        this.ref.add({
            name,
            detail,
            author
        }).then((docRef) => {
            this.setState({
                tinametle: '',
                detail: '',
                author: ''
            });
            this.props.history.push("/")
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        const { name, detail, author } = this.state;
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            ADD BOARD
            </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to="/" class="btn btn-primary">Book List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="name">Name:</label>
                                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
                            </div>
                            <div class="form-group">
                                <label for="detail">Detail:</label>
                                <textArea class="form-control" name="detail" onChange={this.onChange} placeholder="Detail" cols="80" rows="3">{detail}</textArea>
                            </div>
                            <div class="form-group">
                                <label for="author">Author:</label>
                                <input type="text" class="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
                            </div>
                            <button type="submit" class="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Create;