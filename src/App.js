import React, { Component } from "react";
import { stringify } from "querystring";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creds: "",
      token: "",
      loading: false
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getToken = options => {
    this.setState({ loading: true });

    const url = options.url + "?" + stringify(options.credentials.client);
    const payload = stringify(options.credentials.auth);

    const request = new Request(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload
    });

    return fetch(request).then(response =>
      Promise.all([response, response.json()])
    );
  };

  getOptions = () => {
    const creds = JSON.parse(this.state.creds);
    return {
      url:
        creds.idpUri || "https://idp.felleskomponent.no/nidp/oauth/nam/token",
      credentials: {
        client: {
          client_id: creds.clientId,
          client_secret: creds.openIdSecret
        },
        auth: {
          username: creds.username,
          password: creds.password,
          grant_type: "password"
        }
      }
    };
  };

  onGetToken = () => {
    this.getToken(this.getOptions())
      .then(([response, json]) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            token: `Bearer ${json.access_token}`,
            loading: false,
            error: ""
          });
        } else {
          this.setState({ error: json.error_description, loading: false });
        }
      })
      .catch(() => {
        this.setState({
          error:
            "Oh no, this didn't go well. Check your credidentils and try again ;)",
          loading: false
        });
      });
  };
  render() {
    return (
      <div className="container">
        <div className="main">
          <header>
            <img src="fintlabs.svg" alt="logo" className="logo" />
            <h1>Get FINT Token Web</h1>
          </header>
          <div className="content">
            <div className="message">
              Paste the client credentials from the <i>Customer Portal</i> and
              hit <i>Get Token</i>
            </div>
            {this.state.error && (
              <div className="error">{this.state.error}</div>
            )}
            <textarea onChange={this.onChange} name="creds" />
            <textarea name="token" readOnly value={this.state.token} />
            {this.state.loading && (
              <img
                src="packman-loading.svg"
                alt="loading"
                className="loading"
              />
            )}
            <button onClick={this.onGetToken} disabled={!this.state.creds}>
              Get token
            </button>
            <CopyToClipboard text={this.state.token}>
              <button onClick={this.onGetToken} disabled={!this.state.token}>
                Copy token
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
