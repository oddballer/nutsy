<template>
  <div id="comms">
    <div class="dropdown">
      <button class="dropbtn" v-on:click="setAudioInputs">Audio Input</button>
      <select class="dropdown-content">
        <option value={{input.label}} v-for="input in audioInputs" v-bind:key="input.label"></option>
      </select>
    </div>
    <img id="micImg" src="/voice.png" alt="mic" width="32" height="32" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      audioInputs: [],
    }
  },

  methods: {
    getConnectedDevices(type, callback) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const filtered = devices.filter((device) => device.kind === type)
        callback(filtered)
        this.audioInputs = filtered
        
      })
    },

    setAudioInputs() {
      return this.getConnectedDevices('audioinput', (microphones) =>
        console.log('Microphones found', microphones)
      )
    }
  },

  computed: {
    
  },

  created() {
    const constraints = {
      video: false,
      audio: true
    }
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        console.log('Got MediaStream:', stream)
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error)
      })

    this.getConnectedDevices('audioinput', (microphones) =>
      console.log('Microphones found', microphones)
    )
  }
}
</script>

<style>
#micImg {
  margin-left: 4px;
}

#comms {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropbtn {
  background-color: hsl(348, 72%, 55%);
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content label {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content label:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}
</style>