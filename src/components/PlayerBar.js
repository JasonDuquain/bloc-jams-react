import React, { Component } from 'react';
 
class PlayerBar extends Component {
    
   render() {
     return (
       <section className="player-bar">
            <section id="buttons">
               <button id="previous" onClick={this.props.handlePrevClick}>
                 <span className="ion-skip-backward"></span>
               </button>
               <button id="play-pause" onClick={this.props.handleSongClick} >
                 <span className={this.props.isPlaying ? 'ion-md-pause' : 'ion-md-play'}></span>
               </button>
               <button id="next" onClick={this.props.handleNextClick}>
                 <span className="ion-skip-forward"></span>
               </button>
             </section>
             <section id="time-control">
               <div className="current-time">{this.props.currentTime}</div>
               <input 
                 type="range" 
                 className="seek-bar" 
                 defaultValue={(this.props.currentTime / this.props.duration) || 0} 
                 max="1" 
                 min="0" 
                 step="0.01"
                 onChange={this.props.handleTimeChange}
               />   
           <div className="total-time">{this.props.formatTime(this.props.duration)}</div> 
             </section>
             <section id="volume-control">
               <div className="icon ion-md-volume-low" style={{display: 'inline-block', margin: '0 1em'}}></div>
               <input type="range" 
                      className="seek-bar" 
                      defaultValue="0" 
                      max="1" 
                      min="0" 
                      step=".10"
                      onChange={this.props.handleVolumeChange}
                />
               <div className="icon ion-md-volume-high" style={{display: 'inline-block', margin: '0 1em'}}></div>
                <div className="total-volume">{(this.props.volume * 10)}</div> 
             </section>
           </section>
     );
   }
}

/* 20180831 - in the <input type="range" class="seek-bar"> element "value" was updated to "defaultValue" to fix issue of frozen slider (https://stackoverflow.com/questions/36122034/jsx-react-html5-input-slider-doesnt-work)
*/

/* 20180831 - next checkpoint TODO: added inline styles to align the volume icons..remove these in the next checkpoint and add to external styles instead */

export default PlayerBar;

