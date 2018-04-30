import React from 'react';

const _capitalize = text => `${text[0].toUpperCase()}${text.substr(1)}`

export const Input = ({name, state, fn, type, label, icon}) => {
    label = label?label:name
    label = _capitalize(label)
    type = type?type:"text"

    // Add icon if icon parameter is passed
    let spanIcon,
        classes = "control "
    if (icon){
        classes+="has-icons-left"
        spanIcon = (
            <span className="icon is-small is-left">
                  <i className={`fas fa-${icon}`}></i>
            </span>
        )
    }
    else
        spanIcon = ""

    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className={classes}>
                <input 
                    className="input"
                    type={type}
                    name={name}
                    value={state[name]}
                    placeholder={name}
                    onChange={fn} />
                {spanIcon}
            </div>
        </div>
    )
}

export const Dropdown = ({name, fn, label, options}) => {
    label = label?label:name
    label = _capitalize(label)
    return (
        <div className="field">
          <label className="label">{label}</label>
          <div className="control">
            <div className="select">
              <select name={name} onChange={fn}>
                {
                    options.map((option, i) => (
                        <option value={option} key={i}>{option}</option>
                    ))
                }
              </select>
            </div>
          </div>
        </div>
    )
}

export const Button = ({value, color, fn}) => {
    value = _capitalize(value)
    return (
        <div className="field is-grouped is-grouped-centered">
          <p className="control">
            <a className={"button is-"+color} onClick={fn}>
              {value}
            </a>
          </p>
        </div>
    )
}
