import React, { Component } from 'react'
import './ThemeChanger.css'

export default class ThemeChanger extends Component {
  constructor(props) {
    super(props)
    this.onBrandSelectChange = this.onBrandSelectChange.bind(this)
  }

  onBrandSelectChange(event) {
    const brandId = Number(event.currentTarget.value)
    this.props.onChangeBrand(brandId)
  }

  render() {
    const {
      brands=[],
      reloadBrands,
    } = this.props

    return (
      <span className='ThemeChanger'>
        <select
          disabled={!brands.length}
          onChange={this.onBrandSelectChange}
          value={'select'}
        >
          <option value='select'>Select a brand</option>
          <option value='-1'>Ubuntu</option>
          {brands.map((brand, i) => (
            <option
              key={i}
              value={i}
            >{brand.brand}</option>
          ))}
        </select>
        {' '}
        <a
          role='button'
          onClick={reloadBrands}
        >
          reload
        </a>
      </span>
    )
  }
}
