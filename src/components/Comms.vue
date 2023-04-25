<template>
  <div>
    <div class="dropdown">
      <button class="dropbtn" v-on:click="setAudioInputs">Audio Input</button>
      <div class="dropdown-content">
        <label v-for="input in audioInputs" v-bind:key="input.label"></label>
      </div>
    </div>
    <img src="/voice.png" alt="mic" width="32" height="32" />
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
        
      })
    },

    setAudioInputs() {
      this.audioInputs = this.getConnectedDevices('audioinput', (microphones) =>
        console.log('Microphones found', microphones)
      )
      for (let input in this.audioInputs) {
        console.log(input.label)
      }
      console.log('Devices Set')
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