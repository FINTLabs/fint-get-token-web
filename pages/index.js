import { Component } from "react";
import getToken from "fint-get-token";
import { Layout, Field, Input, Button, TextArea } from "../components/index";
import {CopyToClipboard} from 'react-copy-to-clipboard';


export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ secrets: e.target.value });
  }
  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true, token: false, error: false });
    const creds = JSON.parse(this.state.secrets);
    console.log(creds.openIdSecret)
    const options = {
      url: creds.idpUri || 'https://idp.felleskomponent.no/nidp/oauth/nam/token',
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
    try {
      const { access_token: token } = await getToken(options);
      this.setState({ token: `Bearer ${token}`, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  render() {
    return (
      <div>
        <Layout>
          <div className="main">
            <form onSubmit={this.handleSubmit}>
              <div className="content">
                <img
                  className="logo"
                  src="/static/fintlabs.svg"
                  width="200px"
                />
                <h1>Get Token</h1>
                <p>
                  Paste the credidentials from the <em>Kunde</em> portal into the textarea
                  and hit <em>Get token</em>.
                </p>

                <TextArea name="secrets" onChange={this.onChange}/>
                <div>
                  {this.state.token && <TextArea name="secrets" value={this.state.token} readOnly></TextArea>}
                  {this.state.loading && <div>Ok, I'll get your fr** token ...</div>}
                  {this.state.error && <pre className="error">{this.state.error}</pre>}
                </div>
                <div className="buttons">
                <CopyToClipboard text={this.state.token}>
                  <Button type="button" value="Copy to clipboard" disabled={!this.state.token} />
                </CopyToClipboard>
                  <Button type="submit" value="Get token" />
                </div>
              </div>
            </form>
          </div>
        </Layout>
        <style jsx>
          {`
            .main {
              grid-column-start: 2;
            }
            .content {
              display: flex;
              flex-direction: column;
              border: 1px solid #eee;
              padding: 25px;
              border-radius: 4px;
              /*box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);*/
            }
            .buttons {
              display: flex;
              justify-content: flex-end;
            }
            @media screen and (max-width: 768px) {
              .buttons {
                justify-content: center;
              }
            }
            pre {
              background-color: #ebf1f5;
              font-family: monospace;
              border: 1px solid #bbccdd;
              word-wrap: break-word;
              white-space: pre-wrap;
            }
            .error {
              background-color: #ffe7e7;
              border: 1px solid #ddbbbb;
              padding: 8px;
              border-radius: 4px;
            }
          `}
        </style>
      </div>
    );
  }
}
