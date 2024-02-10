<script lang="ts">
  import Counter from "./lib/Counter.svelte";
  import { onMount } from "svelte";
  import GuildDropdown from "./lib/GuildSelector.svelte";
  import ChannelSelector from "./lib/ChannelSelector.svelte";
  import ChannelHistory from "./lib/ChannelHistory.svelte";
  let eel = window.eel;

  type Guild = {
    id: string;
    name: string;
    imgUrl: string;
    channels: Channel[];
  };

  type Channel = {
    id: string;
    name: string;
  };

  let guilds: Guild[] = [
    {
      id: "1193732805000175776",
      name: "SBUHacks",
      imgUrl:
        "https://cdn.discordapp.com/icons/1193732805000175776/973fe65e3ec72cb53669702248aa3f07.webp?size=128",
      channels: [
        { name: "find-teammates", id: "find" },
        {
          name: "general",
          id: "gen",
        },
      ],
    },
    {
      id: "583777618529091585",
      name: "QCCS",
      imgUrl:
        "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      channels: [
        { id: "comcen", name: "complain-central" },
        { name: "general", id: "gen" },
      ],
    },
    {
      id: "32583777618529091585",
      name: "QCCS",
      imgUrl:
        "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      channels: [],
    },
    {
      id: "583777618529091543585",
      name: "QCCS",
      imgUrl:
        "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      channels: [],
    },
    {
      id: "5837776158529091585",
      name: "QCCS",
      imgUrl:
        "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      channels: [],
    },
    {
      id: "5837776185294091585",
      name: "QCCS",
      imgUrl:
        "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      channels: [],
    },
    {
      id: "583777618234529091585",
      name: "QCCS",
      imgUrl:
        "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      channels: [],
    },
    {
      id: "5837776185290912523585",
      name: "QCCS",
      imgUrl:
        "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      channels: [],
    },
    {
      id: "583777653218529091585",
      name: "QCCS",
      imgUrl:
        "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      channels: [],
    },
    {
      id: "583777618529532091585",
      name: "QCCS",
      imgUrl:
        "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      channels: [],
    },
    {
      id: "583777618529054391585",
      name: "QCCS",
      imgUrl:
        "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      channels: [],
    },
    {
      id: "58377765318529091585",
      name: "QCCS",
      imgUrl:
        "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      channels: [],
    },
    {
      id: "5837776185290915853155",
      name: "QCCS",
      imgUrl:
        "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      channels: [],
    },
    {
      id: "58377761852543549091585",
      name: "QCCS",
      imgUrl:
        "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      channels: [],
    },
    {
      id: "5837776123528529091585",
      name: "QCCS",
      imgUrl:
        "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      channels: [],
    },
    {
      id: "583777674718529091585",
      name: "QCCS",
      imgUrl:
        "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      channels: [],
    },
  ];
  let selectedGuild: Guild | undefined = undefined;
  let selectedChannel: Channel | undefined = undefined;

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
  <GuildDropdown {guilds} bind:selectedGuild></GuildDropdown>
  {#if selectedGuild}
    <ChannelSelector channels={selectedGuild.channels} bind:selectedChannel
    ></ChannelSelector>
  {/if}

  <p>Selected guild: {selectedGuild?.name ?? "none"}</p>
  <p>Selected channel: {selectedChannel?.name ?? "none"}</p>

  <ChannelHistory
    messages={[
      {
        id: "aa",
        text: "aa",
        username: "aa",
        profilePicUrl:
          "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      },
      {
        id: "bb",
        text: `Bee Movie
By Jerry Seinfeld

NARRATOR: (Black screen with text; The sound of buzzing bees can be heard) According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care
what humans think is impossible.
BARRY BENSON:
(Barry is picking out a shirt)
Yellow, black. Yellow, black.
Yellow, black. Yellow, black.
 :
Ooh, black and yellow!
Let's shake it up a little.
JANET BENSON:
Barry! Breakfast is ready!
BARRY:
Coming!
 :
Hang on a second.
(Barry uses his antenna like a phone)
 :
Hello?
ADAM FLAYMAN:

(Through phone)
- Barry?
BARRY:
`,
        username: "bb",
        profilePicUrl:
          "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      },
      {
        id: "cc",
        text: "cc",
        username: "cc",
        profilePicUrl:
          "https://cdn.discordapp.com/icons/583777618529091585/a_84a92ca940881047d412ed19dbff2f19.webp?size=128",
      },
    ]}
  ></ChannelHistory>

  <!-- <div class="card">
    <Counter />
  </div>

  <button on:click={handleClick}>Run Python code</button> -->
</main>

<style>
  main {
    display: flex;
    flex-direction: row;
  }
</style>
