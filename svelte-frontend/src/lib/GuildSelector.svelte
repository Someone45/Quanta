<script lang="ts">
  type Guild = {
    id: string;
    name: string;
    imgUrl: string;
  };

  export let guilds: Guild[];
  export let selectedGuild: Guild | undefined;
</script>

<div>
  {#each guilds as guild (guild.id)}
    <label>
      <input type="radio" bind:group={selectedGuild} value={guild} />
      <img
        src={guild.imgUrl}
        width="96"
        height="96"
        alt=" "
        aria-hidden="true"
      />
    </label>
  {/each}
</div>

<style>
  input {
    display: none;
  }

  img {
    width: 96;
    height: 96;
    border-radius: 96px;
    transition: all 0.15s ease-out;
    /* transition: all 0.3s cubic-bezier(0.07, 0.95, 0, 1); */
    /* transition: all 0.15s cubic-bezier(0.07, 0.95, 0, 1); */
  }

  img:hover {
    border-radius: 32px;
  }

  label {
    width: 96;
    height: 96;
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
