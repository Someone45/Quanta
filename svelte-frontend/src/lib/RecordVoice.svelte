<script lang="ts">
  let recorder: MediaRecorder | undefined = undefined;

  function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const chunks = [];
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = (e) => playRecording(chunks, recorder.mimeType);
    });
  }

  function playRecording(chunks, mimeType: string) {
    const blob = new Blob(chunks, { type: mimeType });
    const audioURL = window.URL.createObjectURL(blob);
    new Audio(audioURL).play();
  }

  function stopRecording() {
    recorder.stop();
    recorder = undefined;
  }
</script>

{#if recorder}
  <button on:click={stopRecording}>Stop</button>
{:else}
  <button on:click={startRecording}>Start</button>
{/if}
