import React, { PureComponent } from 'react'
import './ConfigurePage.css'

import {
  ContentWrapper,
  Button,
} from 'toolkit'

const DEFAULT_STATE = {
  apiBaseUrl: undefined, // empty when saved
}

export default class ConfigurePage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { ...DEFAULT_STATE }
  }
  handleApiBaseUrlUpdate = (event) => {
    this.setState({
      apiBaseUrl: event.target.value,
    })
  }
  handleApiBaseUrlReset = (event) => {
    this.setState({
      apiBaseUrl: this.props.apiBaseUrlDefault,
    })
  }
  handleSave = () => {
    this.props.onSave({
      apiBaseUrl: this.state.apiBaseUrl,
    })
    this.setState({ ...DEFAULT_STATE })
  }
  render() {
    console.log('CONFIGURE PAGE RENDER')

    const apiBaseUrl = (
      this.state.apiBaseUrl === undefined
      ? this.props.apiBaseUrl
      : this.state.apiBaseUrl
    )

    const readyToSave = (
      this.state.apiBaseUrl !== undefined
    )

    return (
      <div className='ConfigurePage'>
        <ContentWrapper>
          <h1 className='ConfigurePage-title'>Configure</h1>
        </ContentWrapper>
        <ContentWrapper background bordered>
          <div className='ConfigurePage-api'>
            <div
              className='ConfigurePage-field'
            >
              <label htmlFor='ConfigurePage-api-field'>
                API Base URL
              </label>
              <div>
                <div>
                  <input
                    id='ConfigurePage-api-field'
                    type='url'
                    value={apiBaseUrl}
                    placeholder='http://example.com/api/v2'
                    onChange={this.handleApiBaseUrlUpdate}
                  />
                </div>
                <div>
                  <Button
                    onClick={this.handleApiBaseUrlReset}
                    label='Default API Base URL'
                  />
                </div>
              </div>
            </div>
            <div
              className='ConfigurePage-field'
            >
              <label htmlFor='ConfigurePage-api-field'>
              </label>
              <div>
                <Button
                  label='Save'
                  type='positive'
                  disabled={!readyToSave}
                  onClick={this.handleSave}
                />
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    )
  }
}
