import React from 'react'
import getToken from '../lib/get-token'
import { Layout, Field, Input, Button } from '../components/index'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit (e) {
    e.preventDefault()
    this.setState({ loading: true })
    const options = {
      url: 'https://namidp01.rogfk.no/nidp/oauth/nam/token',
      credentials: {
        client: {
          client_id: e.target.clientId.value,
          client_secret: e.target.clientSecret.value
        },
        auth: {
          username: e.target.username.value,
          password: e.target.password.value,
          grant_type: 'password'
        }
      }
    }
    try {
      const { access_token: token } = await getToken(options)
      this.setState({ token, error: false, loading: false })
    } catch (e) {
      this.setState({ token: false, error: e.message, loading: false })
    }
  }

  render () {
    return (
      <Layout>
        <div className='main'>
          <form onSubmit={this.handleSubmit}>
            <div>
              <img src='/static/logo.png' width='300px' />
              <Field name='client id'><Input name='clientId' type='text' autoFocus='true' />
              </Field>
              <Field name='client secret'>
                <Input name='clientSecret' type='text' />
              </Field>
              <Field name='username'>
                <Input name='username' type='text' />
              </Field>
              <Field name='password'>
                <Input name='password' type='text' />
              </Field>
              <Button type='submit' value='Get token' />
            </div>
          </form>
          { this.state.token &&
            <pre>{this.state.token}</pre>
          }
          { this.state.loading &&
            <div>Laster ...</div>
          }
          { this.state.error &&
            <pre className='error'>{this.state.error}</pre>
          }
        </div>
        <style jsx>
          {`
            .main {
              grid-column-start: 2;
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
            }
        `}
        </style>
      </Layout>
    )
  }
}
