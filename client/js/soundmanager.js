Phaser.SoundManager = {
        
    add: function (key, volume, loop, connect) {
        
        if (typeof volume === 'undefined') {
            
            volume = 1;
        
        }
        if (typeof loop === 'undefined') { 
            
            loop = false; 
        
        }
        if (typeof connect === 'undefined') { 
            
            connect = this.connectToMaster; 
        
        }
        
        var sound = new Phaser.Sound(this.game, key, volume, loop, connect);
        
        this._sounds.push(sound);
        
        return sound;
        
},

    play: function (key, volume, loop) {
    
        if (this.noAudio){

                return;
            }
    
        var sound = this.add(key, volume, loop);
    
        sound.play();
    
        return sound;
    
    },

}