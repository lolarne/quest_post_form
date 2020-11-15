import React, { Component } from 'react';
import './MovieForm.css';

class MovieForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            poster: "",
            comment: "",
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitForm = (e) => {
        e.preventDefault();
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        };
        const url = "https://post-a-form.herokuapp.com/api/movies";
        fetch(url, config)
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    alert(res.error);
                } else {
                    alert(`Your message has been successfully added!`);
                }
            })
            .catch((e) => {
                console.error(e);
                alert("there was an error when adding your message");
            });
    };

    render() {
        return (
            <div className="MovieForm">
                <h1>Share your favorite movie !</h1>

                <form onSubmit={this.submitForm}>
                    <fieldset>
                        <div className="form-data">
                            <label htmlFor="title">Movie Name</label>
                            <input type="text" id="title" name="title" onChange={this.onChange} value={this.state.title} />
                        </div>
                        <div className="form-data">
                            <label htmlFor="poster">Movie URL</label>
                            <input type="text" id="poster" name="poster" onChange={this.onChange} value={this.state.poster} />
                        </div>
                        <div className="form-data">
                            <label htmlFor="comment">Your comment</label>
                            <input type="textarea" id="comment" name="comment" onChange={this.onChange} value={this.state.comment} />
                        </div>
                        <div className="form-data">
                            <input type="submit" value="Send"/>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default MovieForm;