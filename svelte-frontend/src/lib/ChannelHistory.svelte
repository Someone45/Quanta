<script lang="ts">
  type Message = {
    username: string;
    text: string;
    id: string;
    profilePicUrl: string;
  };
  export let messages: Message[];
</script>

<div class="container">
  {#each messages as message (message.id)}
    <div class="msg">
      <img
        src={message.profilePicUrl}
        alt={message.username}
        width="48"
        height="48"
      />
      <div>
        <p class="username">{message.username}</p>
        <p class="contents">{message.text}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column-reverse;
    overflow-y: scroll;
    height: 90vh;
    
    /* bottom: 0px; */
    /* Scuffed "bottom: 0px" */
    margin-top: 10vh;
  }

  .msg {
    display: flex;
    flex-direction: row;
    white-space: pre-line;
  }

  .username {
    font-weight: bold;
  }

  .contents {
    background-color: black;
    width: 40vw;
  }

  img {
    width: 48;
    height: 48;
    border-radius: 100%;
    margin: 0.2em;
  }
</style>
