
import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
   constructor(props) {
     super(props);
       const album = albumData.find( (album) => {
        return album.slug === this.props.match.params.slug
       });
 
     this.state = {
            album: album,
            currentSong: album.songs[0],
            currentTime: 0,
            duration: album.songs[0].duration, 
            isPlaying: false,
            hoveredSong: '',
            volume: 0
        };
       
       this.audioElement = document.createElement('audio');
       this.audioElement.src = album.songs[0].audioSrc;
   } 
    
    play() {
       this.audioElement.play();
       this.setState({ isPlaying: true });
   }
    
   pause() {
       this.audioElement.pause();
       this.setState({ isPlaying: false });
   } 
    
    componentDidMount() {
      this.eventListeners = {
       timeupdate: e => {
         this.setState({ currentTime: this.audioElement.currentTime });
       },
       durationchange: e => {
         this.setState({ duration: this.audioElement.duration });
       },
       volumechange: e => {
         this.setState({ volume: this.audioElement.volume });
       }   
     };
       this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
       this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
       this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
    }
    
    componentWillUnmount() {
      this.audioElement.src = null;
      this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
      this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
   }
    
    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
   }
    
    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
            if (!isSameSong) { this.setSong(song); }
            this.play();
        }
    }

    handleHoverSong(song) {
        this.setState({ hoveredSong: song }); 
    }

    handleBlurSong(song) {
        this.setState({ hoveredSong: song });
    }

    switchIconOrNum(song, index) {
        if (!this.state.isPlaying && song === this.state.hoveredSong) {
            return <span className="ion-md-play"></span>
        } else if (this.state.isPlaying && song === this.state.currentSong) {
            return <span className="ion-md-pause"></span>
        } else {
            return <span>{index + 1}</span>
        }
    }
    
    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex((song) => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }
    
    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex((song) => this.state.currentSong === song);
        let newIndex = Math.max(0, currentIndex + 1);
        if (newIndex === this.state.album.songs.length) {
            newIndex = 0;
        }
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }
    
    handleTimeChange(e) {
     const newTime = this.audioElement.duration * e.target.value;
     this.audioElement.currentTime = newTime;
     this.setState({ currentTime: newTime });
   }
    
    formatTime(time) {
        if (typeof time !== 'number') {
            return "-:--";
        }
        let M = Math.floor(time / 60);
        let SS = (time - M * 60).toFixed(0);
        if (SS > 0 && SS < 10) {
            return String(`${M}:0${SS}`);
        }
        return String(`${M}:${SS}`);
    }
    
    handleVolumeChange(e) {
        const newVolume = e.target.value; 
        this.audioElement.volume = newVolume;
        this.setState({ volume: newVolume });
   }
    
   render() {
        return (
            <section className="album">
                <section id="album-info">
                    <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
                    <div className="album-details">
                     <h1 id="album-title">{this.state.album.title}</h1>
                     <h2 className="artist">{this.state.album.artist}</h2>
                     <div id="release-info">{this.state.album.releaseInfo}</div>
                   </div>
                </section>
                <table id="song-list">
                    <colgroup>
                         <col id="song-number-column" />
                         <col id="song-title-column" />
                         <col id="song-duration-column" />
                    </colgroup>
                    <tbody>
                        {this.state.album.songs.map( (song, index) => 
                            <tr key={index} onClick={ () => this.handleSongClick(song)} 
                                            onMouseEnter={ () => this.handleHoverSong(song) } 
                                            onMouseLeave={ () => this.handleBlurSong(song)} >
                                <td>{this.switchIconOrNum(song, index)}</td>
                                <td>{song.title}</td>
                                <td>{this.formatTime(Number(song.duration))}</td>
                            </tr>
                        )}       
                    </tbody>
                </table>
                <PlayerBar isPlaying={this.state.isPlaying} currentSong={this.state.currentSong} currentTime={this.formatTime(this.state.currentTime)} duration={this.state.duration}
                    volume={this.state.volume}
                    handleSongClick={() => this.handleSongClick(this.state.currentSong)} 
                    handlePrevClick={() => this.handlePrevClick()} handleNextClick={() => this.handleNextClick()}
                    handleTimeChange={(e) => this.handleTimeChange(e)}
                    formatTime={(e) => this.formatTime(e)}
                    handleVolumeChange={(e) => this.handleVolumeChange(e)}
                    />
            </section>
        );
    }
 }

 /* 20180831 - in the last table cell (<td>)) the song.duration was cast into a number (Number(song.duration)) in order to not default to "-:--". 
*/
 
export default Album;




