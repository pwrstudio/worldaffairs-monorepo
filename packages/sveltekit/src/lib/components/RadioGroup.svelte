<script lang="ts">
    const {
        options,
        value,
        name,
        onchange,
        color = 'currentColor',
        size = 12,
        shape = 'circle',
    } = $props<{
        options: { value: string; label: string }[];
        value: string;
        name: string;
        onchange: (value: string) => void;
        color?: string;
        size?: number;
        shape?: 'circle' | 'square';
    }>();
</script>

<div role="radiogroup" class="radio-group">
    {#each options as option (option.value)}
        <label class="radio-option">
            <input
                type="radio"
                {name}
                value={option.value}
                checked={value === option.value}
                onchange={() => onchange(option.value)}
                class="radio-input"
            />
            <span
                class="radio-indicator"
                class:radio-indicator--active={value === option.value}
                style="width: {size}px; height: {size}px; border-radius: {shape === 'circle' ? '50%' : '2px'}; {value === option.value ? `background-color: ${color};` : ''}"
            ></span>
            <span class="radio-label">{option.label}</span>
        </label>
    {/each}
</div>

<style lang="scss">
    .radio-group {
        display: flex;
        gap: 10px;
    }

    .radio-option {
        display: flex;
        align-items: center;
        gap: 0.25em;
        cursor: pointer;
    }

    .radio-input {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
        padding: 0;
        margin: 0;
    }

    .radio-indicator {
        display: inline-block;
        border: 1px solid var(--foreground, var(--archive-border-color));
        flex-shrink: 0;
    }

    .radio-label {
        user-select: none;
    }
</style>
