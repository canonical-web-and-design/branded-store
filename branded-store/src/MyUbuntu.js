import React, { Component } from 'react'
import './MyUbuntu.css'

import classes from 'toolkit/classes'
import Button from 'toolkit/Button/Button'
import Header from 'toolkit/Header/Header'
import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'

const pub = process.env.PUBLIC_URL

export default class MyUbuntu extends Component {
  onPurchase = () => {
    this.props.onPurchase(this.props.snapId)
  }
  render() {
    const content = {
      title: 'Purchasing Cassandra',
      listTitle: 'Buying cassandra is easy, all you need to do is:',
      listItems: [
        'Log in using Ubuntu Single Sign On',
        'Provide us your payment details',
      ],
      par1: 'Once you authorize the payment you’ll be returned to the store.',
      welcome: 'Welcome, Lola Chang',
      youAreSignedIn: 'You are signed in with the email address lola.chang@canonical.com. ',
      notYou: 'Not Lola? ',
      manage: 'Manage your SSO account',
    }

    const { onCancel } = this.props
    const onPurchase = this.onPurchase
    return (
      <div>
        <Header
          menuitems={[]}
          onMenuItemClick={() => {}}
        />
        <main className='App-content'>
          <div className='App-payment'>
            <ContentWrapper background>
              <div className='MyUbuntu-content'>
                <Block>
                  <h1>{content.title}</h1>
                  <div className='MyUbuntuBlock-list'>
                    <h2>{content.listTitle}</h2>
                    <ul>
                      {content.listItems.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <p>{content.par1}</p>
                </Block>
                <Block leftspace>
                  <div className='MyUbuntuBlock-title-check'>
                    {content.welcome}
                  </div>
                  <p style={{
                    marginBottom: '10px',
                  }}>
                    <span>{content.youAreSignedIn}</span>
                  </p>
                  <p>
                    <strong>{content.notYou}</strong>
                    <a className='external'>{content.manage}</a>
                  </p>
                </Block>
                <Block>
                  <div style={{
                    marginLeft: '33px'
                  }}>
                    <div className='MyUbuntuBlock-title-check'>
                      {'Payment Details'}
                      <img
                        style={{ marginLeft: '11px' }}
                        src={`${pub}/128bits.png`}
                        width={442/2}
                        height={34/2}
                        alt=''
                      />
                    </div>
                  </div>
                  <img
                    src={`${pub}/payment-details.png`}
                    width={1834/2}
                    height={410/2}
                    alt=''
                  />
                </Block>

                <Block>
                  <PurchaseSummary
                    items={[]}
                    onPurchase={onPurchase}
                    onCancel={onCancel}
                  />
                </Block>
              </div>
            </ContentWrapper>
          </div>
        </main>
      </div>
    )
  }
}

class PurchaseSummary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: ''
    }
  }
  passwordUpdate = (event) => {
    this.setState({
      password: event.currentTarget.value
    })
  }
  render() {
    const { items } = this.props
    const { onCancel, onPurchase } = this.props
    return (
      <div className='PurchaseSummary'>
        <div className='MyUbuntuBlock-title'>Purchase summary</div>
        <img
          alt=''
          width={1822/2}
          height={172/2}
          src={`${pub}/purchase-summary.png`}
          style={{
            marginBottom: '36px',
          }}
        />
        <div className='MyUbuntuBlock-authorize' style={{
          display: 'flex',
          alignItems: 'flex-end',
        }}>
          <div style={{
            width: '50%',
          }}>
            <form autoComplete='off'>
              <label htmlFor='password'>Payments password</label>
              <input
                type='password'
                id='password'
                onChange={this.passwordUpdate}
                value={this.state.password}
              />
            </form>
          </div>
          <div className='SnapPageLogin-validateGroup'
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '50%',
              marginLeft: '10px',
            }}
          >
            <a
              role='button'
              className='SnapPageLogin-validateGroup-cancel'
              style={{
                color: '#333',
              }}
              onClick={onCancel}
            >
              Cancel
            </a>
            <Button
              label={'Purchase'}
              type='positive'
              disabled={this.state.password === ''}
              onClick={onPurchase}
            />
          </div>
        </div>
      </div>
    )
  }
    // <table>
    //   <tr>
    //     <th>Name</th>
    //     <th>Publisher</th>
    //     <th>Ratings</th>
    //     <th></th>
    //   </tr>
    // {items.map(item => (
    //   <
    // ))}
    // </table>
}

function Block({ leftspace, children }) {
  return (
    <div className={classes({
      'MyUbuntuBlock': true,
      'MyUbuntuBlock-leftspace': leftspace,
    })}>
      {children}
    </div>
  )
}

