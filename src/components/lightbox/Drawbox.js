import React, { Component, Fragment } from "react";
import ReactImgEditor from "react-img-editor";
import Export from "./draw-plugin/Export"
import Close from "./draw-plugin/Close"
import { getWindowSize } from './ui'
import "react-img-editor/assets/index.css"

//import './Drawbox.css'

const style ={
  display: 'flex',
  justifyContent: 'center',
  zIndex: 1015
}

export default class Drawbox extends Component {
  setStage = stage => {

  };
  render() {
    const { width , height } = getWindowSize()
    const { src, onCloseClick ,visible ,onSaveClick } = this.props
    const url = src
    return (
      <div style={style} className='react-img-editor-mask'>
        <Fragment>
          <ReactImgEditor
            src={url}
            getStage={this.setStage}
            plugins={[new Export({ onSaveClick: onSaveClick }),new Close({ onCloseClick:onCloseClick })]}
            width={width/2}
            height={height -40}
            toolbar={{
              items: ["pen", "text", "|", "repeal", "export" ,'close']
            }}
          />
        </Fragment>
      </div>
    );
  }
}