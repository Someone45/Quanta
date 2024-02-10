<script lang="ts">
  type Channel = {
    id: string;
    name: string;
  };

  export let channels: Channel[];
  export let selectedChannel: Channel | undefined;

  // Set channel selection to first channel initially/when we change guilds
  $: if (channels.indexOf(selectedChannel) === -1)
    selectedChannel = channels.length ? channels[0] : undefined;
</script>

<div>
  {#each channels as channel (channel.id)}
    <label>
      <input type="radio" bind:group={selectedChannel} value={channel} />
      <p class:selected={channel === selectedChannel}>{channel.name}</p>
    </label>
  {/each}
</div>

<style>
  input {
    display: none;
  }

  .selected {
    font-weight: bold;
  }

  label {
    width: 48;
    height: 48;
    margin: 4px;
  }

  div {
    display: flex;
    flex-direction: column;
    background-color: #1e1f22;
    height: 100vh;
    overflow-y: scroll;
  }
</style>
