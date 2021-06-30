import React, { Component, Fragment } from "react";
import ReactImgEditor from "react-img-editor";
import Export from "./Export"
import Close from "./Close"
import { getWindowSize } from './ui'
import "react-img-editor/assets/index.css"

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
    return (
      <div style={style} className='react-img-editor-mask'>
        <Fragment>
          <ReactImgEditor
            src={src}
            getStage={this.setStage}
            plugins={[new Export({ onSaveClick: onSaveClick }),new Close({ onCloseClick:onCloseClick })]}
            width={width/2}
            height={height -40}
            toolbar={{
              items: ["pen", "text", "|", "repeal", "export" ,'close']
            }}
            crossOrigin={'anonymous'}
          />
          
        </Fragment>
      </div>
    );
  }
}