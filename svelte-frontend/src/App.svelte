<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import { onMount } from "svelte";
  let eel = window.eel;

  function handleClick() {
    console.log("test");
    eel.say_hello_py("Running Python from JS");
  }

  function play_audio(base64Data: string) {
    console.log(typeof base64Data);
    console.log(base64Data);
    // return;
    const blob = base64toBlob(base64Data, "audio/wav");
    console.log("A");
    playBlob(blob);
  }

  function base64toBlob(base64Data: string, contentType: string): Blob {
    try {
      contentType = contentType || "";
      var sliceSize = 1024;
      var byteCharacters = atob(base64Data);
      var bytesLength = byteCharacters.length;
      var slicesCount = Math.ceil(bytesLength / sliceSize);
      var byteArrays = new Array(slicesCount);

      for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
      }
      return new Blob(byteArrays, { type: contentType });
    } catch (e) {
      console.log(e);
    }
  }

  function playBlob(blob: Blob) {
    console.log(blob.slice(0, 10));
    new Audio(URL.createObjectURL(blob)).play();
    console.log("should be playing");
  }

  onMount(() => {
    eel.expose(my_javascript_function, "my_javascript_function");
    eel.expose(play_audio, "play_audio");
  });

  function my_javascript_function(a: string): string {
    console.log(a);
    return `${a} from js`;
  }
</script>

<main>
  <div class="card">
    <Counter />
  </div>

  <button on:click={handleClick}>Run Python code</button>

  <p>
    Check out <a
      href="https://github.com/sveltejs/kit#readme"
      target="_blank"
      rel="noreferrer">SvelteKit</a
    >, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
