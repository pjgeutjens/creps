<script>
    export let onClick;
    export let gameActive;
</script>

<style>
    .overlay {
        position: fixed;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.60); /* Slightly lighter black overlay */
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text-color); /* Text color variable */
        font-size: 1em;
        cursor: pointer;
        backdrop-filter: blur(6px);
    }
    svg {
        margin-right: 1em;
    }
    </style>

{#if !gameActive}
<button class="overlay" on:click={onClick}>
    
<svg fill="#d1d0c5" width="18" height="18" version="1.1" id="lni_lni-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
	 y="0px" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve">
<g>
	<path d="M33.2,62.3c-1.6,0-3.1-0.9-3.9-2.4L2.3,8.2C1.4,6.5,1.7,4.4,3.1,3.1c1.4-1.4,3.4-1.7,5.2-0.8l51.7,27.1
		c1.6,0.8,2.5,2.4,2.4,4.2c-0.1,1.7-1.2,3.2-2.8,3.9l-15.9,6.2l-6.2,15.9c-0.6,1.6-2.1,2.7-3.9,2.8C33.4,62.2,33.3,62.3,33.2,62.3z
		 M6.4,6.4l26.8,51.2L39.7,41c0.2-0.6,0.7-1.1,1.3-1.3l16.7-6.5L6.4,6.4z"/>
</g>
</svg>

    Click here to focus and start typing
</button>
{/if}
