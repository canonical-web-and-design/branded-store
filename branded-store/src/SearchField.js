import React, { Component } from 'react'
import './SearchField.css'

import stars from 'toolkit/Card/rating-stars.png'

class SearchField extends Component {
  constructor(props) {
    super(props)
    this.onSearchChange = this.onSearchChange.bind(this)
  }
  onSearchChange(event) {
    this.props.onChange(event.target.value)
  }
  render() {
    const { value, results, wait } = this.props
    const active = value !== ''
    const { groups, tags } = results

    return (
      <section className={'SearchField ' + (active? 'SearchField-filled' : '')}>
        <div className='SearchField-in'>
          <div className='SearchField-in2'>

            <h1
              className='SearchField-title'
              hidden={!value}
            >
              Search the Store:
            </h1>

            <input
              type='text'
              value={value}
              onChange={this.onSearchChange}
              placeholder='Search'
              autoFocus
            />

              <div className='SearchField-results'>

                <p className={'SearchField-loader ' + (wait? 'visible' : '')}>
                  Loading suggestions…
                </p>

                {active? (
                  <div>
                    <div className='SearchField-groups'>
                      {groups.map((group, i) => (
                        <div className='SearchField-group' key={i}>
                          <div className='SearchField-group-title'>
                            {group.groupName}
                          </div>
                          <ul>
                            {group.items.map((item, i) => (
                              <li className='SearchField-item' key={i}>
                                <div className='icon'>
                                  <img
                                    width='41'
                                    height='41'
                                    src={item.icon}
                                    alt=''
                                  />
                                </div>
                                <div className='name'>{item.name}</div>
                                {!item.author? null : (
                                  <div className='author'>By {item.author}</div>
                                )}
                                {!item.rating? null : (
                                  <div className='rating'>
                                    <img
                                      src={stars}
                                      alt=''
                                      width='104'
                                      height='18'
                                    />
                                  </div>
                                )}
                                {!item.price? null : (
                                  <div className='price'>{item.price}</div>
                                )}
                                <div className='action'><a>View</a></div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className='SearchField-tags'>
                      {tags.map((tag, i) => (
                        <span key={i}>
                          <a>{tag.name}</a>{' '}
                          ({tag.count}){i === results.tags.length-1? '' : ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

          </div>
        </div>
      </section>
    )
  }
}

export default SearchField
