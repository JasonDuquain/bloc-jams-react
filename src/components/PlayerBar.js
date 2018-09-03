import React, { Component } from 'react';
 
class PlayerBar extends Component {
    
    show() {
        console.log(this.props.currentTime, this.props.duration)
    }
    
   render() {
     return (
         
       <section className="player-bar">
            <section id="buttons">
               <button id="previous" onClick={this.props.handlePrevClick}>
                 <span className="ion-md-skip-backward"></span>
               </button>
               <button id="play-pause" onClick={this.props.handleSongClick} >
                 <span className={this.props.isPlaying ? 'ion-md-pause' : 'ion-md-play'}></span>
               </button>
               <button id="next" onClick={this.props.handleNextClick}>
                 <span className="ion-md-skip-forward"></span>
               </button>
             </section>
             <section id="time-control">
               <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
               <input 
                 type="range" 
                 className="seek-bar" 
                 value={(this.props.currentTime / this.props.duration) || 0} 
                 max="1" 
                 min="0" 
                 step="0.01"
                 onChange={this.props.handleTimeChange}
               />   
           <div className="total-time">{this.props.formatTime(this.props.duration)}</div> 
             </section>
             <section id="volume-control">
               <div className="icon ion-md-volume-low"></div>
               <input type="range" 
                      className="seek-bar" 
                      value={(this.props.volume)}
                      max="1" 
                      min="0" 
                      step=".10"
                      onChange={this.props.handleVolumeChange}
                />
               <div className="icon ion-md-volume-high"></div>
                <div className="total-volume">{(this.props.volume * 10)}</div> 
             </section>
           </section>
     );
   }
}

/* 20180831 - in the <input type="range" class="seek-bar"> element "value" was updated to "defaultValue" to fix issue of frozen slider (https://stackoverflow.com/questions/36122034/jsx-react-html5-input-slider-doesnt-work)
*/

/*20180903 - to fix seek bar not updating, the issue was formatTime() was being called in the currentTime prop value of <PlayerBar>. This was casting it to a string and thus NaN was being returned for the seek bar value. formatTime was removed and updated to wrap this.props.currentTime in the actual <div> it is displayed in*/

/*20180903 - to fix volume showing a 0 value but starting with actual sound this.props.volume was updated to be the value of the range input */


export default PlayerBar;

