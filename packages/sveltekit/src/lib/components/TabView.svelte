<script lang="ts">
  export let tabs: { id: string; label: string }[]
  export let activeTab: string = tabs[0]?.id

  function setActiveTab(tabId: string) {
    activeTab = tabId
  }
</script>

<div class="tab-view">
  <div class="tab-header">
    <div class="tab-scroll">
      {#each tabs as tab}
        <button
          class="tab-button"
          class:active={activeTab === tab.id}
          on:click={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      {/each}
    </div>
  </div>
  <div class="tab-content-wrapper">
    <div class="tab-content">
      <slot {activeTab} />
    </div>
  </div>
</div>

<style lang="scss">
  .tab-view {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: var(--tab-active-bg);
  }

  .tab-header {
    background: var(--tab-bg);
    border-bottom: 1px solid var(--tab-border);
    padding: 0 4px;
    height: 32px;
    display: flex;
    align-items: flex-end;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .tab-scroll {
    display: flex;
    gap: 2px;
    height: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .tab-button {
    height: 28px;
    padding: 0 16px;
    background: var(--tab-inactive-bg);
    border: 1px solid var(--tab-border);
    border-bottom: none;
    cursor: pointer;
    font-family: var(--font-stack-serif);
    font-size: var(--font-size-small);
    color: var(--tab-text);
    position: relative;
    white-space: nowrap;
    display: flex;
    align-items: center;
    border-radius: 4px 4px 0 0;
    margin: 0 2px;

    &:hover {
      background: var(--tab-hover-bg);
    }

    &.active {
      background: var(--tab-active-bg);
      border-color: var(--tab-border);
      border-bottom-color: var(--tab-active-bg);
      margin-bottom: -1px;
      height: 29px;
      box-shadow: 0 -1px 0 0 var(--tab-active-bg);
    }
  }

  .tab-content-wrapper {
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  .tab-content {
    width: 100%;
    height: 100%;
    overflow: auto;
    background: var(--tab-active-bg);
    border: 1px solid var(--tab-border);
    border-top: none;
  }
</style>
